import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon, EyeIcon, PencilIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import { Transition } from "@headlessui/react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import PrimaryButton from "@/Components/PrimaryButton";
import Chip from "@/Components/Chip";
import { generateUniqueColor } from "@/Utils/generateUniqueColor";
import Edit from "./Edit";
import ActionButtons from "@/Components/ActionButtons";

export default function Index({ auth, candidates, posts }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [filterName, setFilterName] = useState("");
    const [filterClass, setFilterClass] = useState("");
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
        registration_number: "",
        email: "",
        phone: "",
        address: "",
        gender: "masculine",
        post_id: "",
        role: "candidate",
        password: "",
        password_confirmation: "",
    });
    const filteredCandidates = candidates.filter(candidate => {
        return (
            (candidate.user.name.toLowerCase().includes(filterName.toLowerCase()) || candidate.registration_number.toLowerCase().includes(filterName.toLowerCase())) &&
            (!filterClass || candidate.post.name === filterClass)
        );
    });

    const columns = useColumns({
        onDelete: (data) => {
            setSelectedData(data);
            setShowDeletionModal(true);
        },
        onEdit: (candidate) => {
            setSelectedData(candidate);
             setShowEditionModal(true);
        },
        onShow: (candidate) => {
           setSelectedData(candidate);
            setShowDetailModal(true);
             //onsole.log(selectedData);
        },
    });

    useEffect(() => {
        if (hasErrors) {
            reset("name");
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
        post(route("students.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("students.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("students.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
console.log(candidates);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Étudiant" />
            {/* <Breadcrumb pageName="Étudiant" /> */}
            <div className="bg-white py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-4 flex justify-between items-center space-x-4">
                    <div className="flex items-center space-x-4 text-black">
                    <label className="font-semibold">Filtrer par :</label>
                    <input
                        type="text"
                        placeholder="nom ou matricule"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div className="flex space-x-2">
                    <div 
                         className={`text-md text-purple-950 px-2 py-1 rounded-md cursor-pointer ${filterClass === "" ? 'border-2 border-white bg-purple-950 text-white' : 'border-2 border-transparent'} hover:border-purple-500`}
                            onClick={() => setFilterClass("")}
                        >
                            Tous
                        </div>
                    {posts.length > 0 && posts.map((post) => (
                        <div 
                            key={post.id}
                            className={`text-md text-purple-950 px-2 py-1 rounded-md cursor-pointer ${filterClass === post.name ? 'border-2 border-white bg-purple-950 text-white' : 'border-2 border-transparent'} hover:border-purple-500`}
                            onClick={() => setFilterClass(post.name)}
                        >
                            {post.name}
                        </div>
                    ))}
                    </div>

                    <PrimaryButton onClick={() => setShowCreationModal(true)}>
                    Ajouter un étudiant
                    </PrimaryButton>
                    </div>

                    <Datagrid
                        columns={columns}
                        rows={filteredCandidates}
                        canCreate={false}
                        onCreate={() => setShowCreationModal(true)}
                    />
                </div>
                <Modal
                    show={showCreationModal}
                    title={"Ajouter un étudiant"}
                    onClose={() => {
                        setShowCreationModal(false);
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
                        mode={"creation"}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={
                             handleCreationSubmit
                        }
                        onCancel={() => {
                            cancel();
                                setShowCreationModal(false);
                        }}
                    />
                </Modal>
                 <Modal
                        show={showEditionModal}
                        title="Modifier un étudiant"
                        onClose={() => setShowEditionModal(false)}
                    >
                        <Edit posts={posts}  onCancel={() => setShowEditionModal(false)} candidate={selectedData}/> 
                    </Modal>
                <Modal
                        show={showDeletionModal}
                        title="Supprimer un étudiant"
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
                    <Modal
                        show={showDetailModal}
                        title="Note de l'étudiant"
                        onClose={() => setShowDetailModal(false)}
                    >
                        
                                    <div className="max-h-30 overflow-y-auto">
                                        {selectedData?.candidate_notes.length > 0 ? (
                                            selectedData?.candidate_notes.map((note) => (
                                                <div key={note.id} className="flex items-center bg-white text-black rounded-md shadow-xs my-2 p-2">
                                                <div className="w-1/3 text-lg font-semibold text-gray-500">
                                                    {note.interview.name}
                                                </div>
                                            
                                                <div className="w-1/3 flex justify-center">
                                                    <span
                                                        className={`rounded-full py-2 px-4 text-white font-semibold text-center 
                                                            ${note.note !== null ? 'bg-red-600' : 'bg-green-600'} 
                                                            transition-colors duration-300 ease-in-out`}
                                                    >
                                                      {note.note !== null ? "Note: ":"Note provisoire: "}  {note.note !== null ? note.note : note.interim_note}
                                                    </span>
                                                </div>
                                            
                                                <div className="w-1/3 flex justify-end">
                                                    <Link
                                                        href={route("student_answers.studentTestAnswers", [selectedData?.id, note.interview.id])}
                                                        className="bg-purple-950 py-2 px-5 text-sm font-medium text-white rounded-full hover:bg-purple-850 transition-all"
                                                    >
                                                        Visualiser les résultats
                                                    </Link>
                                                </div>
                                            </div>
                                            ))
                                        ) : (
                                            <div className="bg-red-800 text-white rounded-md my-2 p-3">
                                                Aucune note disponible
                                            </div>
                                        )}
                            </div>
                    </Modal>
            </div>
        </AuthenticatedLayout>
    );
}

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "registration_number",
                cell: (info) =>
                (<span className="bg-gray p-2 rounded-md text-black">{info.getValue()}</span>),  
                header: () => "Matricule",
            },
            {
                accessorFn: (row) => row.user,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, name } = info.getValue();
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
                header: () => "Candidat",
            },
            {
                accessorKey: "gender",
                cell: (info) => (
                   <Chip type={info.getValue()==='feminine' ? "success" : "error"}>
                        {info.getValue()==='feminine' ? "Féminin" : "Masculin"}
                    </Chip>
                  ),
                header: () => "Genre",
            },
            {
                accessorKey: "post.name",
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
                header: () => "Classe",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-1">
                    <button
                      className={
                          "p-1 border border-transparent rounded-md"
                      }
                      onClick={() =>{ 
                          props.onShow(info.getValue());
                       }}
                  >
                    <span className="w-6 h-4 text-purple-700 p-1 rounded-md border-3 border-white"> 
                       Voir les notes
                    </span> 
                  
                  </button>
                  <button
                      className={
                          "p-1 border border-transparent rounded-md"
                      }
                      onClick={() =>{ 
                          props.onEdit(info.getValue());
                       }}
                  >
                    <PencilIcon className="w-6 h-4 text-purple-950 border-3 border-white" /> 
                  
                  </button>
                  <button
                     className={
                      "p-1 border border-transparent rounded-md"
                      }
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
