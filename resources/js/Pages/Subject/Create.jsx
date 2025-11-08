import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "react-select"; // Import react-select
import makeAnimated from 'react-select/animated'; // For animations

const animatedComponents = makeAnimated();

export default function Index({ auth, questions, subjectData }) {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [existingQuestions, setExistingQuestions] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
    } = useForm({
        subject: subjectData?.subject || "",
        questions: subjectData?.questions?.map(q => q.id) || [],
    });

    useEffect(() => {
        if (subjectData && subjectData.questions) {
            setExistingQuestions(subjectData.questions);
            setSelectedQuestions(subjectData.questions.map(q => ({ value: q.id, label: q.question })));
        }
    }, [subjectData]);

    const handleQuestionSelect = (selected) => {
        setSelectedQuestions(selected);
        setData("questions", selected.map(option => option.value));

          let points = 0;
        selected.forEach(selectedQuestion => {
            const question = questions.find(q => q.id === selectedQuestion.value);
            if (question) {
                points += question.point; 
            }
        });
        setTotalPoints(points);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (subjectData) {
            put(route("subjects.update", subjectData.id));
        } else {
            post(route("subjects.store"));
        }
    };

    const handleRemoveExistingQuestion = (questionId) => {
        setExistingQuestions(existingQuestions.filter(q => q.id !== questionId));
        setSelectedQuestions(selectedQuestions.filter(q => q.value !== questionId));
        setData('questions', data.questions.filter(id => id !== questionId));

        let points = 0;
        selectedQuestions.forEach(selectedQuestion => {
            const question = questions.find(q => q.id === selectedQuestion.value);
            if (question && question.id !== questionId) { // Exclude removed question from total
                points += question.point;
            }
        });
        setTotalPoints(points);
    };

    const questionOptions = questions.map((question) => ({
        label: `${question.question} (${question.point} pts)`, // Include points in label
        value: question.id,
        point: question.point, 
    }));

    const customStyles = { // Style react-select
        control: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: 'white',
            border: '1px solid #ced4da', // Example border color
            borderRadius: '0.375rem', // Tailwind-like rounded corners
            boxShadow: isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : 'none', // Example shadow
            ':hover': {
                borderColor: '#80bdff', // Example hover color
            },
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? '#007bff' : isFocused ? '#e9ecef' : 'white', // Example colors
            color: isSelected ? 'white' : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',
            padding: '6px 12px',  // Example padding
        }),
        multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: '#f1f3f5', // Example background color
            borderRadius: '0.25rem', // Tailwind-like rounded corners
            padding: '3px 6px', // Example padding
            margin: '2px', // Example margin
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: '#777', // Example color
            ':hover': {
                backgroundColor: '#ddd', // Example hover color
                color: '#333',
                cursor: 'pointer',
            },
        }),
    };


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={subjectData ? "Modifier un sujet" : "Ajouter un sujet"} />
            <Link
                className="inline-flex items-center px-4 py-2 bg-purple-950 border border-purple-950 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:text-purple-950 hover:border-purple-950 hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 mb-6"
                href={route("subjects.index")}
            >
                Retour
            </Link>
            <div className="">
                    <div className="flex justify-center m-2">
                            <h1 className="text-purple-950 text-xl font-bold">Ajouter un sujet avec des questions: </h1>            
                    </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-100 shadow sm:rounded-lg">
                        <form className="p-5" onSubmit={handleSubmit}>
                            <fieldset className="gap-2">
                                <div className="m-2">
                                    <InputLabel htmlFor="subject" value="Sujet"/>
                                    <TextInput
                                        id="subject"
                                        name="subject"
                                        placeholder="Nom du sujet ..."
                                        value={data.subject}
                                        className="text-purple-950 mt-1 block w-full"
                                        autoComplete="subject"
                                        isFocused={true}
                                        onChange={(e) => setData("subject", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </fieldset>
                            <div className="m-2">
                                <h2 className="text-black mb-2">Sélectionnez les questions :</h2>
                                <Select
                                    options={questionOptions}
                                    value={selectedQuestions}
                                    onChange={handleQuestionSelect}
                                    isMulti
                                    placeholder="Sélectionnez les questions..."
                                    styles={customStyles} // Apply custom styles
                                    components={animatedComponents} // Add animations
                                    classNamePrefix="react-select" // Add prefix for easier styling
                                />

                                {/* Existing Questions Display (Improved Styling) */}
                                {existingQuestions.length > 0 && (
                                    <div className="mt-4 border rounded p-2 bg-white"> {/* Card-like styling */}
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Questions existantes:</h3>
                                        <ul className="list-disc pl-5"> {/* Use a list for better structure */}
                                            {existingQuestions.map((question) => (
                                                <li key={question.id} className="mb-1 flex items-center justify-between">
                                                    <span>{question.question}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveExistingQuestion(question.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                               {/* Selected Questions Display with Points */}
                               <div className="mt-4 border font-mono rounded p-2 bg-white max-h-80 overflow-y-auto"> 
                                <h3 className="text-lg font-mono text-gray-900 mb-2">
                                    Questions sélectionnées <span className="text-purple-950">({totalPoints} points)</span>:
                                </h3>
                                <ul className="list-disc pl-5">
                                    {selectedQuestions.map((question, index) => (
                                        <li key={question.value} className="text-purple-500 mb-1 flex items-center justify-between">
                                            <span>{index + 1}) {question.label}</span>
                                            <span>{questions.find(q => q.id === question.value)?.point} pts</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center justify-center my-3 text-purple-950 border-white">
                                    Total des points: {totalPoints}
                                </div>
                            </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route("subjects.index")}
                                    className="inline-flex items-center justify-center rounded-md bg-white py-2 px-5 text-center font-medium border-purple-950 border text-purple-950 hover:bg-opacity-90 lg:px-8 xl:px-10 "
                                >
                                    Annuler
                                </Link>

                                <PrimaryButton
                                    className="ml-4"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {subjectData ? "Modifier les questions de ce sujet" : "Ajouter le sujet avec les questions"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}