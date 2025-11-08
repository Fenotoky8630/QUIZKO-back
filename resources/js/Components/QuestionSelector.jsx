// import React, { useState } from "react";
// import { MultiSelect } from "react-multi-select-component";

// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

// const MultipleSelect = () => {
//   const [selected, setSelected] = useState([]);

//   return (
//     <div>
//       <h1>Select Fruits</h1>
//       <pre>{JSON.stringify(selected)}</pre>
//       <MultiSelect
//         options={options}
//         value={selected}
//         onChange={setSelected}
//         labelledBy="Selectionnez"
//       />
//     </div>
//   );
// };

// export default MultipleSelect;

import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const QuestionSelector = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Liste des questions (vous pouvez la récupérer depuis une API ou un autre endroit)
  const questions = [
    { label: 'Question 1', value: 'question1' },
    { label: 'Question 2', value: 'question2' },
    // ... Ajoutez d'autres questions ici
  ];

  const handleQuestionSelect = (selected) => {
    setSelectedQuestions(selected);
  };

  return (
    <div className="">
      <h2>Sélectionnez les questions :</h2>
      <MultiSelect
        options={questions}
        value={selectedQuestions}
        onChange={handleQuestionSelect}
        labelledBy="Sélectionnez les questions"
      />
      {/* Affichez les questions sélectionnées ici */}
      {selectedQuestions.map((question) => (
        <div key={question.value}>{question.label}</div>
      ))}
    </div>
  );
};

export default QuestionSelector;
