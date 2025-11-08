import React, { useState } from "react";

function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ answer: "", is_correct: false }]);
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddAnswer = () => {
    setAnswers([...answers, { answer: newAnswer, is_correct: false }]);
    setNewAnswer("");
  };

  const handleAnswerChange = (index) => (e) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = e.target.value;
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (index) => (e) => {
    const newAnswers = [...answers];
    newAnswers[index].is_correct = e.target.checked;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question:", question);
    console.log("Answers:", answers);
    // Envoyer les données au backend ou effectuer d'autres actions
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ajouter une question</h2>
      <form>
        <label className="block mb-4">
          <span className="text-lg font-semibold">Question:</span>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
          />
        </label>
        <div className="space-y-2">
          <span className="text-lg font-semibold">Réponses:</span>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={answer.answer}
                onChange={handleAnswerChange(index)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={answer.is_correct}
                  onChange={handleCheckboxChange(index)}
                  className="rounded border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                />
                <span className="text-lg">Correct</span>
              </label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
           
            <button
              type="button"
              onClick={handleAddAnswer}
              className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              +
            </button>
          </div>
        </div>
        <button
         onClick={handleSubmit}
          className="block w-full mt-6 px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
