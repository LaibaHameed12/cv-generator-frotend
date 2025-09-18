import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Edit3, Trash2, FileText } from 'lucide-react';
import CvDownloadButtons from '../CvDownloadButtons';

const CvCard = ({ cv, router, setRenaming, handleDeleteClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // close dropdown when clicking outside; use 'click' so option handlers run first
    useEffect(() => {
        const onDocClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    const onEdit = (e) => {
        e.stopPropagation();
        setIsOpen(false);
        router.push(`/cv/edit/${cv._id}`);
    };

    const onRename = (e) => {
        e.stopPropagation();
        setIsOpen(false);
        setRenaming(cv);
    };

    const onDelete = (e) => {
        e.stopPropagation();
        setIsOpen(false);
        handleDeleteClick(cv); // instead of calling handleDelete directly
    };

    return (
        <div className="bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors relative">
            <div className="p-4">
                <div className="bg-white rounded-lg p-4 mb-4 h-60 overflow-hidden">
                    <div className="text-black text-xs space-y-2">
                        <h4 className="font-bold text-sm">{cv.fullName || 'Untitled Resume'}</h4>
                        {cv.headline && <p className="text-xs text-gray-600">{cv.headline}</p>}
                        {cv.email && <p className="text-xs text-gray-600">{cv.email}</p>}
                        {cv.phone && <p className="text-xs text-gray-600">{cv.phone}</p>}
                        {cv.summary && (
                            <div className="border-t pt-2">
                                <h5 className="font-semibold text-xs mb-1">Summary</h5>
                                <p className="text-xs text-gray-700 leading-tight line-clamp-3">
                                    {cv.summary}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium">{cv.fileName}</h3>
                        <p className="text-sm text-gray-400">
                            Last updated {new Date(cv.updatedAt).toLocaleString()}
                        </p>
                    </div>

                    {/* local dropdown */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen((v) => !v);
                            }}
                            className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {isOpen && (
                            <div className="absolute z-50 right-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg w-36">
                                <button
                                    onClick={onEdit}
                                    className="cursor-pointer flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 text-left"
                                >
                                    <FileText className="w-4 h-4 mr-2" /> Edit
                                </button>
                                <button
                                    onClick={onRename}
                                    className="cursor-pointer flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 text-left"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" /> Rename
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="cursor-pointer flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 text-left text-red-400"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </button>
                                <CvDownloadButtons cvId={cv._id} fileName={cv.fileName} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CvCard;
