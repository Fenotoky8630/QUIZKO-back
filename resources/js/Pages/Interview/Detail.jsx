import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EyeIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { CSVLink } from 'react-csv';
import Chip from "@/Components/Chip";

export default function Detail({ auth, candidate_answers, interview }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { data, setData, put, reset, hasErrors, recentlySuccessful } = useForm({
        note: null,
    });

    const sortedCandidates = useMemo(() => {
        const filteredCandidates = candidate_answers.filter(candidate => 
            candidate.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())|| candidate.candidate.matricule.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredCandidates.sort((a, b) => a.candidate.matricule.localeCompare(b.candidate.matricule));
    }, [candidate_answers, searchTerm]);

    const excelResult = sortedCandidates.map(result => ({
        Matricule: result.candidate.matricule,
        Nom: result.candidate.name,
        Classe: interview[0]?.post?.name || '', 
        Note: result.note.note !== null ? result.note.note : result.note.interim_note,
    }));

    const filename = "Résultat_" + (interview[0]?.name || 'Interview') + ".xlsx";

    useEffect(() => {
        if (hasErrors) {
            reset("note");
        }
        if (recentlySuccessful) {
            reset();
            if (showModal) {
                setShowModal(false);
            }
        }
    }, [hasErrors, recentlySuccessful]);

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("student_note.update", selectedCandidate.note));
        setShowModal(false);
    };

    const handleViewCandidateDetails = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const columns = useColumns({
        onView: (data) => {
            handleViewCandidateDetails(data);
        },
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-center text-gray-600 light:text-gray-200 leading-tight">
                    Réponses du test : "{interview[0]?.name}" , classe : "{interview[0]?.post?.name}"
                </h2>
            }
        >
            <Head title="Résultats" />
            {/* <Breadcrumb pageName={"Résultat du text "+interview[0]?.name+"/classe : "+interview[0]?.post?.name}/> */}
                     <Link
                         href={`/results`}
                         className="inline-flex items-center justify-center rounded-md bg-purple-950 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"          
                    >
                        Retour
                    </Link>
                    <div className="flex items-center justify-center text-center font-bold my-2 text-purple-950 text-2xl leading-tight">
                        Résultat du test : {interview[0]?.name}-{interview[0]?.post?.name}
                    </div>

            <div className="text-end">
                <CSVLink
                    data={excelResult}
                    filename={filename}
                    className="inline-flex items-center justify-center rounded-md bg-green-800 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                    Exporter en Excel
                </CSVLink>
            </div>
            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Nom ou matricule ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 text-sm"
                        />
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={sortedCandidates}
                        canCreate={false}
                    />
                </div>
            </div>

            {selectedCandidate &&
                <Modal
                    show={showModal}
                    title={"Réponses de l'étudiant " + selectedCandidate.candidate.name + " :"}
                    onClose={() => setShowModal(false)}
                >
                    <div className="space-y-2 text-black overflow-y-auto max-h-80">
                        {selectedCandidate.answers.length > 0 ? (
                            selectedCandidate.answers.map(answer => (
                                <div key={answer.id} className="border-b  border-gray-200 pb-4">
                                     <div key={answer.id} className="bg-black rounded-md  text-white">
                                         <h1 className="text-lg font-semibold">{answer.question} ({answer.question_point} point(s))</h1>
                                    </div>   
                                    {answer.answer_of_candidate === null ? (
                                        <>
                                            <p className="text-sm text-gray-600">
                                                Réponse de l'étudiant : {answer.answer} {answer.is_correct ?
                                                    <CheckIcon className="w-4 h-4 text-green-500 inline-block align-middle" /> :
                                                    <XMarkIcon className="w-4 h-4 text-red-500 inline-block align-middle" />
                                                }
                                            </p>
                                            <p className="text-sm">Point : {answer.answer_point}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm">
                                                Réponse de l'étudiant : {answer.answer_of_candidate}
                                            </p>
                                            <p className="text-sm">Point : {answer.answer_point}</p>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-red-500">Aucune réponse..</div>
                        )}
                    </div>
                    <form onSubmit={handleEditionSubmit} className="shadow-lg p-2">
                        <div className="flex justify-between items-center m-4">
                            <div className="text-black"> Note provisoire : {selectedCandidate.note.interim_note}</div>
                            <div className="text-black"> Note : {selectedCandidate.note.note === null ? (<span className="text-red-400">En attente</span>) : selectedCandidate.note.note}</div>
                            <div className="flex items-center">
                                <input
                                    value={data.note}
                                    onChange={(e) => { setData('note', e.target.value) }}
                                    type="number"
                                    placeholder={(selectedCandidate.note.note === null) ? selectedCandidate.note.interim_note : "Modifier la note"}
                                    className="w-50 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <SecondaryButton
                                className="ms-4 text-sm"
                                onClick={() => setShowModal(false)}
                            >
                                Annuler
                            </SecondaryButton>
                            <PrimaryButton
                                className="ms-4 text-sm"
                                type="submit"
                            >
                                Valider
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            }
        </AuthenticatedLayout>
    );
}

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "candidate.matricule",
                cell: (info) =>
                (<span className="bg-purple-950 p-2 rounded-md text-white">{info.getValue()}</span>),  
                header: () => "Matricule",
            },
            {
                accessorKey: "candidate.name",
                cell: (info) =>
                    `${info.getValue()}`,
                header: () => "Nom",
            },
             {
                accessorKey: "note",
                cell: (info) => (
                    <span className={`px-2 py-1 rounded-md bg-black text-md text-white `}>
                        {
                            `${info.getValue()?.interim_note}`
                        }
                    </span>
                ),
                header: () => "Note provisoire",
            },
            {
                accessorKey: "note",
                cell: (info) => (
                    <Chip type={info.getValue()?.note === null  ? "success" : "error"}>
                       {info.getValue()?.note === null ? 
                            `En attente` : 
                            `${info.getValue()?.note}`
                        }
                    </Chip>
                ),
                header: () => "Note",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <Link
                        href={route("student_answers.studentTestAnswers",[info.getValue().candidate.id,info.getValue().note.interview_id])}
                        className=" bg-orange-800 inline-flex items-center justify-center rounded-md py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                        >
                           <EyeIcon className="w-3 h-3" />
                        </Link>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};

