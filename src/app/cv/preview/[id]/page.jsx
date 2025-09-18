"use client";
import { useParams } from "next/navigation";
import { useGetCvByIdQuery } from "@/redux/slices/cv/cvApi";
import CvPreview from "@/components/CvPreview";

export default function CvPreviewPage() {
    const { id } = useParams();
    const { data: cv, isLoading, isError } = useGetCvByIdQuery(id, { skip: !id });

    if (isLoading) return <div className="text-center text-gray-400 mt-10">Loading...</div>;
    if (isError || !cv) return <div className="text-center text-red-400 mt-10">CV not found.</div>;

    return (
        <CvPreview cv={cv} />
    );
}
