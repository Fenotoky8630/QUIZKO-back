import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import { generateUniqueColor } from "@/Utils/generateUniqueColor";
import { formatDate } from "@/Utils/formatDate";
export default function Index({ auth, interviews, subjects, posts }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [selectedClass, setSelectedClass] = useState("");
    const [search, setSearch] = useState(""); 

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({
        name: "",
        start_date: "",
        end_date: "",
        time: "",
        subject_id: "",
        post_id: "",
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
    });

    useEffect(() => {
        // if (hasErrors) {
        //     reset("end_date", "post_id", "subject_id", "time");
        // }

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

    const handleCreationSubmit = (e) => {
        e.preventDefault();
        post(route("tests.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("tests.update", selectedData.id));
        console.log(data)
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("tests.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };

    const filteredRows = useMemo(() => {
        return interviews.filter((row) => {
            const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase());
            const matchesClass = selectedClass ? row.post.name === selectedClass : true;
            return matchesSearch && matchesClass;
        });
    }, [interviews, search, selectedClass]);    

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tests" />
            {/* <Breadcrumb pageName="Tests" /> */}
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-between items-center space-x-4">
                    <div className="flex text-black items-center space-x-4">
                        <label className="font-semibold">Rechercher :</label>
                        <input
                            type="text"
                            placeholder="test..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                          <div className="flex space-x-2">
                    <div 
                         className={`text-md text-purple-950 px-2 py-1 rounded-md cursor-pointer ${selectedClass === "" ? 'border-2 border-white bg-purple-950 text-white' : 'border-2 border-transparent'} hover:border-purple-500`}
                            onClick={() => setSelectedClass("")}
                        >
                            Tous
                        </div>
                    {posts.length > 0 && posts.map((post) => (
                        <div 
                            key={post.id}
                            className={`text-md text-purple-950 px-2 py-1 rounded-md cursor-pointer ${selectedClass === post.name ? 'border-2 border-white bg-purple-950 text-white' : 'border-2 border-transparent'} hover:border-purple-500`}
                            onClick={() => setSelectedClass(post.name)}
                        >
                            {post.name}
                        </div>
                    ))}
                    </div>
                    </div>
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={filteredRows} 
                        canCreate={true}
                        onCreate={() => setShowCreationModal(true)}
                    />
                </div>
            </div>

            {/* Modals and Forms */}
            {/* Creation Modal */}
            <Modal
                show={showCreationModal}
                title="Ajouter un test"
                onClose={() => setShowCreationModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode={showEditionModal ? "editon" : "creation"}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={
                        showEditionModal
                            ? handleEditionSubmit
                            : handleCreationSubmit
                    }
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                    onReset={() => reset("name")}
                />
            </Modal>

            {/* Edition Modal */}
            <Modal
                show={showEditionModal}
                title="Modifier un test"
                onClose={() => setShowEditionModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode="edition"
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleEditionSubmit}
                    onCancel={() => {
                        cancel();
                        setShowEditionModal(false);
                    }}
                    onReset={() => reset()}
                />
            </Modal>

            {/* Deletion Modal */}
            <Modal
                show={showDeletionModal}
                title="Supprimer un test"
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={selectedData?.name}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                cell: (info) => (
                    <div className="bg-gray p-1 rounded-md text-black">{info.getValue()}</div>
                ),
                header: () => "Nom du test",
            },
            {
                accessorKey: "start_date",
                cell: (info) => `${formatDate(info.getValue())}`,
                header: () => "Début",
            },
            {
                accessorKey: "end_date",
                cell: (info) => `${formatDate(info.getValue())}`,
                header: () => "Fin",
            },
            {
                accessorKey: "time",
                cell: (info) => (
                    <span className="bg-red-800 p-1 rounded-md text-white">
                        {info.getValue()}
                    </span>
                ),
                header: () => "Durée",
            },
            {
                accessorKey: "post.name",
                cell: (info) => {
                    const color = generateUniqueColor(info.getValue());
                    return (
                        <div
                            className={`text-white text-center  rounded-md text-xs p-1`}
                            style={{ backgroundColor: color }}
                        >
                            {info.getValue()}
                        </div>
                    );
                },
                header: () => "Classe",
            },
            {
                accessorKey: "subject.subject",
                cell: (info) => `${info.getValue()}`,
                header: () => "Sujet",
            },
            {
                accessorKey: "is_expired",
                cell: (info) => (
                    <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-md ${
                            info.getValue() ? "text-red-800" : "text-green-400"
                        }`}
                    >
                        {info.getValue() ? "Expiré" : "Non expiré"}
                    </span>
                ),
                header: () => "Status",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-1">
                        <Link
                            href={route("tests.current",info.getValue())}
                            className="p-1 border border-transparent rounded-md"
                        >
                             <EyeIcon className="w-6 h-4 text-gray-500 border-3 border-white" />
                        </Link>
                        <button
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() => props.onEdit(info.getValue())}
                        >
                            <PencilIcon className="w-6 h-4 text-purple-900 border-3 border-white" />
                        </button>
                        <button
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() => props.onDelete(info.getValue())}
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
