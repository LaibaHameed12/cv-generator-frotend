"use client";
import React, { useEffect, use } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCvDraft } from "@/redux/slices/cv/cvSlice";
import CvForm from "@/components/Forms/CvForm";
import CvPreview from "@/components/CvPreview";
import cvSchema from "@/schemas/validationSchema";
import Navbar from "@/components/common/Navbar";
import { useGetCvByIdQuery, useUpdateCvMutation } from "@/redux/slices/cv/cvApi";
import toast from "react-hot-toast";

const clone = (v) => (v ? JSON.parse(JSON.stringify(v)) : undefined);

export default function EditCvPage(props) {
    const params = use(props.params);
    const cvId = params.id;
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: cv, isLoading, isError } = useGetCvByIdQuery(cvId, { skip: !cvId });
    const [updateCv, { isLoading: isUpdating }] = useUpdateCvMutation();

    const methods = useForm({
        resolver: yupResolver(cvSchema),
        defaultValues: cv
            ? clone({
                ...cv,
                projects: cv.projects?.map((p) => ({
                    ...p,
                    technologies: Array.isArray(p.technologies)
                        ? p.technologies.join(", ")
                        : p.technologies || "",
                })),
            })
            : {},
    });

    // When cv loads, reset form with cv data
    useEffect(() => {
        if (cv) {
            methods.reset(
                clone({
                    ...cv,
                    projects: cv.projects?.map((p) => ({
                        ...p,
                        technologies: Array.isArray(p.technologies)
                            ? p.technologies.join(", ")
                            : p.technologies || "",
                    })),
                })
            );
        }
    }, [cv]);

    // Watch form and sync draft
    useEffect(() => {
        const sub = methods.watch((vals) => {
            const normalized = {
                ...vals,
                projects: vals.projects?.map((p) =>
                    p && typeof p.technologies === "string"
                        ? { ...p, technologies: p.technologies.split(",").map((t) => t.trim()).filter(Boolean) }
                        : p
                ),
            };
            dispatch(setCvDraft(clone(normalized)));
        });
        return () => sub.unsubscribe();
        // eslint-disable-next-line
    }, [methods]);

    useEffect(() => {
        return () => {
            // clear draft when leaving edit page
            dispatch(setCvDraft(null));
        };
    }, [dispatch]);


    // Helper to convert string or Date into ISO
    const toISO = (value) => {
        if (!value) return null;
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d.toISOString();
    };

    // Recursive cleanup
    const stripSystemFieldsAndNormalize = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(stripSystemFieldsAndNormalize);
        }
        if (obj && typeof obj === "object") {
            const newObj = {};
            for (let key in obj) {
                if (["_id", "__v", "createdAt", "updatedAt", "user"].includes(key)) continue;

                // Normalize date fields
                if (["startDate", "endDate", "date"].includes(key)) {
                    newObj[key] = toISO(obj[key]);
                } else {
                    newObj[key] = stripSystemFieldsAndNormalize(obj[key]);
                }
            }
            return newObj;
        }
        return obj;
    };

    const sanitizeCvForUpdate = (cvData) => {
        const { _id, user, createdAt, updatedAt, __v, fileName, ...editable } = cvData;

        // Normalize projects.technologies
        editable.projects = editable.projects?.map((p) => {
            if (!p) return p;
            return {
                ...p,
                technologies: typeof p.technologies === "string"
                    ? p.technologies.split(",").map((t) => t.trim()).filter(Boolean)
                    : p.technologies || [],
            };
        });

        return stripSystemFieldsAndNormalize(editable);
    };




    const onSubmit = async (data) => {
        try {
            const payload = sanitizeCvForUpdate(data);
            await updateCv({ id: cvId, ...payload }).unwrap();
            toast.success('CV updated successfully!');
            dispatch(setCvDraft(null));
            // Reset the form
            methods.reset();
            router.push("/");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update CV. Please try again.");
        }
    };


    if (isLoading) return <div className="text-center text-gray-400 mt-10">Loading...</div>;
    if (isError || !cv) return <div className="text-center text-red-400 mt-10">CV not found.</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 gap-8">
                <div className="flex-1">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <CvForm isEdit />
                            <button
                                type="submit"
                                className="cursor-pointer w-full mt-8 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-colors disabled:opacity-60"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update CV"}
                            </button>
                        </form>
                    </FormProvider>
                </div>
                <div className="flex-1 py-8 bg-white min-h-[800px] overflow-auto max-h-screen my-scroll-container">
                    <CvPreview cv={methods.watch()} />
                </div>
            </div>
        </div>
    );
}
