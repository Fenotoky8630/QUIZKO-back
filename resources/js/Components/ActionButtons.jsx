import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function ActionButtons({ onView, onEdit, onDelete, info }) {
    return (
        <div className="flex space-x-1">
            {onView && (
                <button
                    className="border border-transparent rounded-md"
                    onClick={() => {
                        onView(info.getValue());
                    }}
                >
                    <EyeIcon className="w-6 h-4 text-gray-500" />
                </button>
            )}

            {onEdit && (
                <button
                    className="border border-transparent rounded-md"
                    onClick={() => {
                        onEdit(info.getValue());
                    }}
                >
                    <PencilIcon className="w-6 h-4 text-purple-900 border-3 border-white" />
                </button>
            )}

            {onDelete && (
                <button
                    className="border border-transparent rounded-md"
                    onClick={() => {
                        onDelete(info.getValue());
                    }}
                >
                    <TrashIcon className="w-6 h-4 text-red-600" />
                </button>
            )}
        </div>
    );
}
