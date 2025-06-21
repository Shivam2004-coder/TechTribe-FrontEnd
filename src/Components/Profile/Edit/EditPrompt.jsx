import React, { useEffect, useState } from 'react';

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

   // 🧠 Load existing answer if it exists
  useEffect(() => {
    setPromptContent(prev => {
      const found = prev.find(item => item.index === index);
      if (found) {
        setAnswer(found.content);  // set initial answer
      }
      return prev;  // return unchanged state
    });
  }, [index, setPromptContent]);
  

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
      <div className="bg-gray-800 w-full rounded-2xl p-6 text-white relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-lg bg-red-500 hover:bg-red-600 text-white p-1 h-9 w-9 flex items-center justify-center rounded-full shadow-black shadow-md"
            onClick={handleClose}
          >
            <i className="material-icons">close</i>
          </button>
          <h2 className="text-lg font-semibold">Answer Prompt</h2>
          <button
            className="text-sm bg-green-500 hover:bg-green-600 h-9 px-3 py-1 rounded-full lex items-center justify-center shadow-black shadow-md"
            onClick={handleDone}
          >
            Done
          </button>
        </div>

        {/* Prompt Display */}
        <div className="text-lg bg-black flex items-center justify-start p-3 rounded-lg text-gray-300 mb-4 shadow-gray-400 shadow-inner">
          <strong className="text-white">{promptsList[index]}</strong>
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Complete your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-52 p-3 rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner shadow-black"
        />
      </div>
  );
};

export default EditPrompt;