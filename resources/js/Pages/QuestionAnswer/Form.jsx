import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import React, { useState, useEffect } from "react";

export default function Form({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}) {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (mode === "edition" && data.answers) {
            setAnswers(data.answers);
        } else if (mode === "creation") {
            const initialAnswers = [{ answer: "", is_correct: false }];
            setAnswers(initialAnswers);
            setData((prevData) => ({ ...prevData, answers: initialAnswers }));
        }
    }, [mode]); 


    const handleAddAnswer = () => {
        setAnswers([...answers, { answer: "", is_correct: false }]);
    };

    const handleRemoveAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
        setData((prevData) => ({ ...prevData, answers: newAnswers })); 
    };

    const handleAnswerChange = (index) => (e) => {
        const newAnswers = [...answers];
        newAnswers[index].answer = e.target.value;
        setAnswers(newAnswers);
        setData((prevData) => ({ ...prevData, answers: newAnswers }));
    };

    const handleCheckboxChange = (index) => (e) => {
        const newAnswers = [...answers];
        newAnswers[index].is_correct = e.target.checked;
        setAnswers(newAnswers);
        setData((prevData) => ({ ...prevData, answers: newAnswers })); 
    };

    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            answers: answers,
        };
        onSubmit(formData);
    };

    return (
        <form className="p-5" onSubmit={handleSubmit}>
            <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md"> 
                <fieldset className="gap-2">
                <div>
                    <InputLabel htmlFor="question" value="Question" />

                    <TextInput
                        id="question"
                        name="question"
                        placeholder="Question ..."
                        value={data.question}
                        className="mt-1 block w-full"
                        autoComplete="question"
                        isFocused={true}
                        onChange={(e) => setData("question", e.target.value)}
                        required
                    />

                    <InputError message={errors.question} className="mt-2" />
                </div>
                </fieldset>
                <fieldset className="gap-2">
                <div>
                    <InputLabel htmlFor="point" value="Point" />

                    <TextInput
                        type="number"
                        min={0}
                        id="point"
                        name="point"
                        placeholder="Point ..."
                        value={data.point}
                        className="mt-1 block w-full"
                        autoComplete="question"
                    
                        onChange={(e) => setData("point", e.target.value)}
                        required
                    />

                    <InputError message={errors.point} className="mt-2" />
                </div>
                </fieldset>
                <fieldset className="gap-2">
                <div>
                    <InputLabel htmlFor="questionType" value="Type de question" />  
                    <Select
                        id="questionType"
                        name="questionType"
                        className="mt-1 block w-full"
                        value={data.type}
                        onChange={(e) => setData('type',e.target.value)}
                        options={[
                            { value: "open", label: "Question ouverte" },
                            { value: "qcm", label: "QCM" },
                        ]}
                    />
                </div>
                </fieldset>
                <div className="space-y-2">
                    <span className="text-md text-black">Réponses:</span> 
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={answer.answer}
                                onChange={handleAnswerChange(index)}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                            />
                            {data.type === "qcm" && (
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={answer.is_correct}
                                        onChange={handleCheckboxChange(index)}
                                        className="rounded border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                                    />
                                    <span className="text-lg text-black">Correct</span>
                                </label>
                            )}
                            {index >= 0 && data.type === "qcm" && (
                                <SecondaryButton type="button" onClick={() => handleRemoveAnswer(index)}>
                                    -
                                </SecondaryButton>
                            )}
                        </div>
                    ))}
                    {data.type === "qcm" && (
                        <div className="flex items-center space-x-2">
                            <PrimaryButton type="button" onClick={handleAddAnswer}>
                                +
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end mt-4">
                        <SecondaryButton
                        className="ms-4"
                        onClick={onCancel}
                        disabled={processing}
                        >
                        Annuler
                        </SecondaryButton>
                        <PrimaryButton
                        className="ms-3"
                        type="submit"
                        disabled={processing}          
                        >
                        {mode==="creation"? "Ajouter" : "Modifier"}
                        </PrimaryButton>
            </div>
        </form>
    );
}