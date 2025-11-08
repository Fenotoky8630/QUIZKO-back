import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const QUESTIONS_PER_PAGE = 1;

export default function Detail({ auth, questions, note, candidate }) {
    const { put, data, setData, processing, recentlySuccessful } = useForm({
        note: null,
    });

    const [currentPage, setCurrentPage] = useState(0);

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("student_note.update", note.id));
    };

    const handleNextClick = () => {
        if (currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const paginatedQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);
    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Résultat" />
            <Link
                className="inline-flex items-center px-4 py-2 bg-purple-950 text-white border border-gray-300 rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm hover:text-purple-950 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                href={`/students-answers/${note.interview_id}`}
            >
                Retour
            </Link>
            <div className="mt-6 text-black">
                <h2 className="text-xl font-bold mb-4">
                    Résultat de {candidate.user.name}
                    <span className="text-sm text-white rounded-md bg-green-800 p-2 ms-2">
                        {note.note !== null ? "Note: " + note.note : "Note Provisoire :" + note.interim_note}
                    </span>
                </h2>
                {paginatedQuestions.map((questionItem, index) => (
                    <div key={index} className="mb-6 p-2 border rounded-md shadow-sm bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold mb-2">{questionItem.question}</h3>
                            <span className="text-sm text-white rounded-md p-1 bg-red-800">{questionItem.point} points</span>
                        </div>
                        <ul className="space-y-2">
                            {questionItem.answers.map((answer, answerIndex) => (
                                <li
                                    key={answerIndex}
                                    className={`p-2 rounded-md ${
                                        answer.is_candidate_answer ? 'bg-blue-100' : ''
                                    } ${
                                        answer.is_correct
                                            ? 'border-l-4 border-green-500'
                                            : 'border-l-4 border-red-500'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{answer.answer}</span>
                                        {answer.is_candidate_answer && answer.is_correct && (
                                            <span className="ml-2 text-green-600 font-semibold">
                                                {`Points: ${questionItem.point}`}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {questionItem.question_type === "open" && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                <h4 className="font-semibold">Réponse du candidat :</h4>
                                <p>{questionItem.answers[0].candidate_answer}</p>
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevClick}
                        disabled={currentPage === 0}
                        className={`p-2 bg-green-900 text-white rounded-md ${currentPage === 0 ? "cursor-not-allowed" : "hover:bg-gray-300 hover:text-green-900"}`}
                    >
                        <ChevronLeftIcon className="h-4 w-10" />
                    </button>
                    <span className="text-lg font-medium">
                        {currentPage + 1} question sur {totalPages}
                    </span>
                    <button
                        onClick={handleNextClick}
                        disabled={currentPage >= Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1}
                        className={`p-2 bg-green-900 text-white rounded-md ${currentPage >= Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1 ? "cursor-not-allowed" : "hover:bg-gray-300 hover:text-green-900"}`}
                    >
                        <ChevronRightIcon className="h-4 w-10" />
                    </button>
                </div>
                <div className="mt-4 p-4 border rounded-md shadow-sm bg-white">
                    <h3 className="text-lg font-semibold">Note</h3>
                    <p>Note Provisoire: {note.interim_note}</p>
                    {note.note !== null && <p>Note: {note.note}</p>}
                    <div className="mt-2">
                        <label htmlFor="Note" className="block text-sm font-medium text-gray-700">
                        </label>
                        <input
                            type="number"
                            name="note"
                            id="note"
                            placeholder="Modifier la note"
                            value={data.note}
                            onChange={(e) => { setData('note', e.target.value) }}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <PrimaryButton
                            onClick={handleEditionSubmit}
                            className="mt-2"
                        >
                            Sauvegarder la note
                        </PrimaryButton>
                    </div>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-black bg-green-200 text-center p-3 rounded-md my-2">Nouvelle note attribuée</p>
                    </Transition>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
