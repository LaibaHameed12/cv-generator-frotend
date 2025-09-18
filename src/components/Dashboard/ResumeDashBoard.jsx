'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../common/Navbar';
import {
    useGetCvsQuery,
    useDeleteCvMutation,
    useUpdateCvMutation,
} from '@/redux/slices/cv/cvApi';
import { useRouter } from 'next/navigation';
import CvCard from '../common/CvCard';
import FileNameModal from '../FileNameModal';
import toast from 'react-hot-toast';
import ConfirmationModal from '../ConfirmationModal';

const ResumeDashboard = () => {
    const { data: cvs, isLoading } = useGetCvsQuery();
    const [deleteCv] = useDeleteCvMutation();
    const [updateCv] = useUpdateCvMutation();
    const router = useRouter();

    const [renaming, setRenaming] = useState(null); // stores cv being renamed
    const [deleteTarget, setDeleteTarget] = useState(null); // stores the CV to delete


    const handleDeleteClick = (cv) => {
        setDeleteTarget(cv);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteCv(deleteTarget._id).unwrap();
            toast.success('Resume deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete resume');
        } finally {
            setDeleteTarget(null); // close modal
        }
    };

    const handleCancelDelete = () => setDeleteTarget(null);

    const handleRename = async (cv, fileName) => {
        try {
            await updateCv({ id: cv._id, fileName }).unwrap();
            setRenaming(null);
        } catch (err) {
            if (err?.data?.message?.includes('already exists')) {
                toast.error('A resume with this file name already exists.');
            } else {
                toast.error('Failed to rename resume');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="flex">
                <div className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {/* Create New Resume Card */}
                            <Link
                                href={'/cv'}
                                className="bg-gray-800 rounded-lg p-8 border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors cursor-pointer group"
                            >
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                        <Plus
                                            className="w-12 h-12 text-gray-400 group-hover:text-gray-300 transition-colors"
                                            strokeWidth={1}
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Create a new resume</h3>
                                    <p className="text-gray-400 text-sm">Start building from scratch</p>
                                </div>
                            </Link>

                            {/* Real CVs */}
                            {isLoading && <p className="text-gray-400">Loading resumes...</p>}
                            {!isLoading && cvs?.length === 0 && (
                                <p className="text-gray-400">No resumes yet.</p>
                            )}
                            {cvs?.map((cv) => (
                                <CvCard
                                    key={cv._id}
                                    cv={cv}
                                    router={router}
                                    setRenaming={setRenaming}
                                    handleDeleteClick={handleDeleteClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Rename modal */}
            {renaming && (
                <FileNameModal
                    currentName={renaming.fileName}
                    onConfirm={(fileName) => handleRename(renaming, fileName)}
                    onClose={() => setRenaming(null)}
                />
            )}

            {deleteTarget && (
                <ConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onClose={handleCancelDelete}
                    isLoading={deleteCv.isLoading}
                />
            )}

        </div>
    );
};

export default ResumeDashboard;
