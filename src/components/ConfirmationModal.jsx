import { Loader2 } from "lucide-react";

export default function ConfirmationModal({ onConfirm, onClose, isLoading }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Delete Resume</h2>
                <p>Are you sure you want to delete this resume?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
