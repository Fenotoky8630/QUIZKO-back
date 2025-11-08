import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import PrimaryButton from "@/Components/PrimaryButton";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function Index({ auth, subjects, questions }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showQuestionsModal, setShowQuestionsModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);

    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({
        subject: "",
        questions: [],
    });

    const columns = useColumns({
        onEdit: (data) => {
            setSelectedData(data);
            setData(data);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setSelectedData(data);
            setShowDeletionModal(true);
        },
        onShow: (data) => {
            setSelectedData(data);
            setShowQuestionsModal(true);
        },
    });

    useEffect(() => {
        if (hasErrors) {
            reset("subject");
        }

        if (recentlySuccessful) {
            reset();

            if (showCreationModal) {
                setShowCreationModal(false);
            }

            if (showEditionModal) {
                setShowEditionModal(false);
            }
        }
    }, [hasErrors, recentlySuccessful]);

    useEffect(() => {
        setFilteredSubjects(
            subjects.filter((subject) =>
                subject.subject.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, subjects]);

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("subjects.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("subjects.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Sujets" />
            {/* <Breadcrumb pageName="Sujets" /> */}
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-between items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <label className="font-semibold">Rechercher :</label>
                            <input
                                type="text"
                                placeholder="sujet..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <Link
                            href={route("subjects.create")}
                            className="bg-purple-950 hover:bg-purple-800 text-white font-medium py-2 px-5 rounded-lg transition-all transform hover:scale-[1.02]"
                        >
                            Ajouter un sujet
                        </Link>
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={filteredSubjects}
                        canCreate={false}
                    />
                </div>
            </div>

            <Modal
                show={showDeletionModal}
                title="Supprimer un sujet"
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={selectedData?.subject}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                />
            </Modal>

            <Modal
                show={showQuestionsModal}
                title="Questions du sujet"
                onClose={() => setShowQuestionsModal(false)}
            >
                <div className="p-3 m-4 text-black text-sm">
                    {/* Titre du sujet */}
                    <div className="text-purple-900 text-xl rounded-lg p-2">
                        <h1 className="font-bold text-center">
                            Sujet : {selectedData?.subject}{" "}
                            <span className="text-red-400">({selectedData?.total_points} pts)</span>
                        </h1>
                    </div>

                    {/* Nombre de questions */}
                    <h2 className="text-md font-semibold mt-2">
                        Nombre de questions :{" "}
                        <span className="text-gray-700 border-b border-gray-500 px-1">
                            {selectedData?.questions.length}
                        </span>
                    </h2>

                    {/* Liste des questions */}
                    <div className="space-y-2 overflow-y-auto max-h-64 mt-2 p-1">
                        {selectedData?.questions.length > 0 &&
                            selectedData.questions.map((question) => (
                                <div key={question.id} className="border p-2 rounded-lg shadow-sm bg-gray-100">
                                    <p className="font-medium text-gray-800">{question.question}</p>
                                    <p className="text-gray-600 text-xs">Point : <span className="text-red-600">{question.point}</span></p>
                                </div>
                            ))}
                    </div>

                    {/* Bouton Fermer */}
                    <div className="flex items-center border-t pt-3 mt-3 justify-center">
                        <PrimaryButton className="w-full py-1 text-sm" onClick={() => setShowQuestionsModal(false)}>
                            Fermer
                        </PrimaryButton>
                    </div>
                </div>

            </Modal>
        </AuthenticatedLayout>
    );
}

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "subject",
                cell: (info) => (
                    <span className="bg-purple-950 p-2 rounded-md text-white">{info.getValue()}</span>
                ),
                header: () => "Sujet",
            },
            {
                accessorKey: "questions",
                cell: (info) => `${info.getValue().length}`,
                header: () => "Nombre des questions",
            },
            {
                accessorKey: "total_points",
                cell: (info) => (
                    <span className="bg-brown-500 p-1 rounded-md text-white">{info.getValue()}</span>
                ),
                header: () => "Total Points",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-1">
                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={() => {
                                props.onShow(info.getValue());
                            }}
                        >
                            <EyeIcon className="w-6 h-4 text-gray-500 border-3 border-white" />
                        </button>

                        <Link
                            className="p-1 border border-transparent rounded-md"
                            href={route("subjects.edit", info.getValue().id)}
                        
                        >
                            <PencilIcon className="w-6 h-4 text-purple-900 border-3 border-white" />
                        </Link>
                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={() => {
                                props.onDelete(info.getValue());
                            }}
                        >
                            <TrashIcon className="w-6 h-4 text-red-600 border-3 border-white" />
                        </button>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
