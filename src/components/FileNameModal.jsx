'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLazyCheckFileNameQuery } from '@/redux/slices/cv/cvApi';

const schema = yup.object({
    fileName: yup.string().trim().required('File name is required'),
});

export default function FileNameModal({ onConfirm, onClose, currentName }) {
    const [checkFileName] = useLazyCheckFileNameQuery();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { fileName: currentName || '' },
    });

    const onSubmit = async ({ fileName }) => {
        const trimmed = fileName.trim();

        // If user didn’t change the name, just close
        if (trimmed === currentName) {
            onClose();
            return;
        }

        try {
            const { exists } = await checkFileName(trimmed).unwrap();
            if (exists) {
                setError('fileName', {
                    message: 'A resume with this name already exists',
                });
                return;
            }
            // Try to confirm, catch backend duplicate error
            try {
                await onConfirm(trimmed);
            } catch (err) {
                if (err?.data?.message?.includes('already exists')) {
                    setError('fileName', {
                        message: 'A resume with this name already exists',
                    });
                } else {
                    setError('fileName', {
                        type: 'manual',
                        message: 'Could not save file name',
                    });
                }
            }
        } catch (err) {
            console.error(err);
            setError('fileName', {
                type: 'manual',
                message: 'Could not validate file name',
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Save Resume As</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Enter file name"
                        {...register('fileName')}
                    />
                    {errors.fileName && (
                        <p className="text-red-400 text-sm mb-2">{errors.fileName.message}</p>
                    )}

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
                        >
                            {isSubmitting ? 'Checking...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
