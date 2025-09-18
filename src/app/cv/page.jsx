'use client';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateCvMutation } from '@/redux/slices/cv/cvApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCvDraft, selectCvDraft } from '@/redux/slices/cv/cvSlice';
import CvForm from '@/components/Forms/CvForm';
import CvPreview from '@/components/CvPreview';
import cvSchema from '@/schemas/validationSchema';
import { FileText } from 'lucide-react';
import FileNameModal from '@/components/FileNameModal';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import toast from 'react-hot-toast';

const clone = (v) => (v ? JSON.parse(JSON.stringify(v)) : undefined);

export default function CvCreatePage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const draftFromStore = useSelector(selectCvDraft);
    const [createCv] = useCreateCvMutation();

    const [modalOpen, setModalOpen] = useState(false);
    const [pendingData, setPendingData] = useState(null);

    const methods = useForm({
        resolver: yupResolver(cvSchema),
        defaultValues: clone(draftFromStore) || {
            fullName: '',
            headline: '',
            email: '',
            phone: '',
            website: '',
            location: '',
            summary: '',
            profiles: [],
            experience: [],
            education: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: [],
            references: [],
        },
    });

    // Watch form and sync draft
    useEffect(() => {
        const sub = methods.watch((vals) => {
            const normalized = {
                ...vals,
                projects: vals.projects?.map((p) =>
                    p && typeof p.technologies === 'string'
                        ? { ...p, technologies: p.technologies.split(',').map((t) => t.trim()).filter(Boolean) }
                        : p
                ),
            };
            if (JSON.stringify(draftFromStore || {}) !== JSON.stringify(normalized)) {
                dispatch(setCvDraft(clone(normalized)));
            }
        });
        return () => sub.unsubscribe();
    }, [methods, dispatch, draftFromStore]);

    useEffect(() => {
        if (draftFromStore) methods.reset(clone(draftFromStore));
    }, [draftFromStore, methods]);

    useEffect(() => {
        dispatch(setCvDraft(null));
    }, [dispatch]);

    const handleSubmitForm = (data) => {
        setPendingData(data);
        setModalOpen(true);
    };

    const handleFileNameConfirm = async (fileName) => {
        setModalOpen(false);
        if (!pendingData) return;

        const payload = {
            ...pendingData,
            fileName,
            projects: pendingData.projects?.map((p) => {
                if (!p) return p;
                const techs = Array.isArray(p.technologies)
                    ? p.technologies
                    : typeof p.technologies === 'string'
                        ? p.technologies.split(',').map((s) => s.trim()).filter(Boolean)
                        : [];
                return { ...p, technologies: techs };
            }),
        };

        try {
            await createCv(payload).unwrap();
            toast.success('CV created successfully!');
            dispatch(setCvDraft(null));
            // Reset the form
            methods.reset({
                fullName: '',
                headline: '',
                email: '',
                phone: '',
                website: '',
                location: '',
                summary: '',
                profiles: [],
                experience: [],
                education: [],
                skills: [],
                languages: [],
                certifications: [],
                projects: [],
                references: [],
            });
            router.push('/');
        } catch (err) {
            if (err?.data?.message?.includes('already exists')) {
                toast.error('A resume with this file name already exists.');
            } else {
                toast.error('Failed to create CV');
            }
        } finally {
            setPendingData(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-900">
                <div className="flex-1">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="space-y-4 bg-black text-white">
                            <CvForm />
                            <div className="mt-4">
                                <div className="flex justify-center py-8">
                                    <button
                                        type="submit"
                                        className="cursor-pointer bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                                    >
                                        <FileText className="w-5 h-5" />
                                        <span>Generate Resume</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>

                <div className="w-full lg:w-1/2 bg-white py-8 min-h-[800px] overflow-auto max-h-screen my-scroll-container">
                    <CvPreview cv={methods.getValues()} />
                </div>

                {modalOpen && (
                    <FileNameModal
                        onConfirm={handleFileNameConfirm}
                        onClose={() => setModalOpen(false)}
                        currentName={pendingData?.fileName || ''}
                    />
                )}
            </div>
        </>
    );
}
