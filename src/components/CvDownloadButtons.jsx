"use client";
import { useLazyDownloadCvDocxQuery, useLazyDownloadCvPdfQuery } from "@/redux/slices/cv/cvApi";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function CvDownloadButtons({ cvId, fileName }) {
    const [downloadPdf] = useLazyDownloadCvPdfQuery();
    const [downloadDocx] = useLazyDownloadCvDocxQuery();
    const [loading, setLoading] = useState(null);

    const handleDownload = async (type) => {
        try {
            setLoading(type);
            const fn = type === "pdf" ? downloadPdf : downloadDocx;
            const blob = await fn(cvId).unwrap();

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            let safeFileName = fileName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
            link.download = `${safeFileName}.${type}`;
            link.click();
            URL.revokeObjectURL(link.href);
            toast.success(`${type.toUpperCase()} downloaded`);
        } catch (err) {
            console.error("Download failed", err);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-col">
            <button
                onClick={() => handleDownload("pdf")}
                disabled={loading === "pdf"}
                className="cursor-pointer flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 text-left disabled:opacity-50"
            >
                {loading === "pdf" ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                ) : null}
                {loading === "pdf" ? "Downloading..." : "Download PDF"}
            </button>
            <button
                onClick={() => handleDownload("docx")}
                disabled={loading === "docx"}
                className="cursor-pointer flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 text-left disabled:opacity-50"
            >
                {loading === "docx" ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                ) : null}
                {loading === "docx" ? "Downloading..." : "Download Word"}
            </button>
        </div>
    );
}
