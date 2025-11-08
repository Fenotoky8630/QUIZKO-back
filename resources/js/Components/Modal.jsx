import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Modal({
    children,
    show = false,
    title,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex items-center justify-center px-4 py-6 sm:px-0 z-50 transform transition-all"
                onClose={close}
            >
                {/* Fond flou derrière le modal */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75 backdrop-blur-sm" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`relative bg-white rounded-lg shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass} max-h-screen overflow-hidden`}
                    >
                        {/* Header du modal */}
                        {title && (
                            <div className="flex justify-between items-center px-5 py-4 border-b border-gray">
                                <h3 className="text-xl font-bold text-purple-950">{title}</h3>
                                {closeable && (
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full p-1.5"
                                        onClick={close}
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Contenu scrollable */}
                        <div className="p-5 overflow-y-auto max-h-[70vh]">
                            {children}
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
