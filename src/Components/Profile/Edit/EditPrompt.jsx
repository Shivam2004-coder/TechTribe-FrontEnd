import React, { useState } from 'react';

const EditPrompt = ({ promptsList, setEditPrompt, index , setPromptContent }) => {
  const [answer, setAnswer] = useState("");

  const handleClose = () => {
    setEditPrompt(false);
  };


  const handleDone = () => {
    if (answer.trim().length > 0) {
      setPromptContent(prev => {
        const indexExists = prev.find(item => item.index === index);
  
        if (indexExists) {
          // Update the content of the existing index
          return prev.map(item =>
            item.index === index ? { ...item, content: answer } : item
          );
        } else {
          // Add a new item if index doesn't exist
          return [...prev, { index, content: answer }];
        }
      });
    }
    setEditPrompt(false);
  };
  

//   const handleDone = () => {
//     if ( answer.trim().length > 0 ) {
//         setPromptContent(prev => [...prev, {
//             index: index,
//             content: answer
//         }]);
//     }
//     setEditPrompt(false);
//   };

  return (
      <div className="bg-gray-800 w-11/12 max-w-2xl rounded-2xl shadow-lg p-6 text-white relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-xl bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow"
            onClick={handleClose}
          >
            ×
          </button>
          <h2 className="text-lg font-semibold">Answer Prompt</h2>
          <button
            className="text-sm bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full shadow"
            onClick={handleDone}
          >
            Done
          </button>
        </div>

        {/* Prompt Display */}
        <div className="text-sm text-gray-300 mb-2">
          <strong className="text-white">{promptsList[index]}</strong>
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Complete your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-40 p-3 rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  );
};

export default EditPrompt;