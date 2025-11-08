import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon,
    EyeIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon, } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import { Transition } from "@headlessui/react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { generateUniqueColor } from "@/Utils/generateUniqueColor";
import ActionButtons from "@/Components/ActionButtons";

export default function Index({ auth, recruiters, departments}) {

    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
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
        // first_name: "",
        // last_name: "",
        email: "",
        phone: "",
        address: "",
        jot_title: "",
        department_id: "",
        role: "recruiter",
        password: "", 
        password_confirmation: "",
    });
    const columns = useColumns({
        onEdit: (data) => {
            setSelectedData(data);
            setData(data);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setSelectedData(data);
            setData(data);
            setShowDeletionModal(true);
        },
    });
    useEffect(() => {
        if (hasErrors) {
            reset("password", "password_confirmation");
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

    const handleCreationSubmit = (e) => {
        e.preventDefault();
        post(route("professors.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("professors.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("professors.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Enseignant" />
            {/* <Breadcrumb pageName="Enseignant" /> */}
            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            canCreate={true}
                            onCreate={() => setShowCreationModal(true)}
                            rows={recruiters}
                        />
                    </div>
                    <Modal
                        show={showCreationModal||showEditionModal}
                        title={showCreationModal?"Ajouter un enseignant":"Modifier un enseignant"}
                        onClose={() =>{
                            setShowCreationModal(false);
                            setShowEditionModal(false);
                        }}
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
                            mode={showEditionModal ? "edition" : ("creation")}
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
                                setShowEditionModal(false);
                            }}
                        />
                    </Modal>
                    <Modal
                        show={showDeletionModal}
                        title="Supprimer un enseignant "
                        onClose={() => setShowDeletionModal(false)}
                    >
                        <DeletionConfirmation
                            name={
                                selectedData?.user.name
                            }
                            onCancel={() => {
                                cancel();
                                setShowDeletionModal(false);
                            }}
                            handleDeleteSubmit={handleDeletionSubmit}
                        /> 
                    </Modal>
            </div>
        </AuthenticatedLayout>
    );
}

const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row.user,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, name } =
                        info.getValue();

                    return (
                        <div className="flex items-center gap-2">
                            <Avatar size="md" src="" alt={name} />
                            <div className="space-y-2">
                                <h2 className="text-md font-semibold">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <EnvelopeIcon className="w-3 h-3" />
                                        {email}
                                    </span>
                                    {phone && (
                                        <span className="flex items-center gap-1 text-xs font-thin italic">
                                            <PhoneIcon className="w-3 h-3" />
                                            {phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Enseignants",
            },
            {
                accessorKey: "job_title",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Fonction",
            },
            {
                accessorKey: "department.name",
                cell: (info) => {
                    const color = generateUniqueColor(info.getValue());
                    return (
                        <span
                            className={`text-white rounded-md text-xs p-2`}
                            style={{ backgroundColor: color }}
                        >
                            {info.getValue()}
                        </span>
                    );
                },
                header: () => "Département",
            },
            {
                accessorKey: "user.address",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Adresse",
            },
    
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                        <ActionButtons onEdit={props.onEdit} onDelete={props.onDelete} info={info}/>        
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
