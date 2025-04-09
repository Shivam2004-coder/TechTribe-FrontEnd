import React from 'react';

const Prompt = ({ promptsList, setIsSelectPromptClick, promptContent, setPromptContent , setEditPrompt }) => {

    const handleSelectPrompt = () => {
        setIsSelectPromptClick(true);
    };

    const handleRemovePrompt = (indexToRemove) => {
        setPromptContent(prev => prev.filter(item => item.index !== indexToRemove));
    };

    const handlePromptClick = () => {
        setEditPrompt(true);
    }

    return (
        <div className="p-2 flex flex-col justify-center items-center"> 
            {/* Show all selected prompts */}
            {promptContent.map((item, idx) => (
                <div key={idx} className="mb-4 w-11/12 p-4 bg-gray-600 rounded-xl shadow-md text-white">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-amber-400 mb-2">
                            ※ {promptsList[item.index]}
                        </h3>
                        <p className="text-sm italic text-gray-200">⁓ {item.content}</p>
                    </div>
                    <div className="flex justify-around mt-2">
                        <button className="bg-gray-700 rounded-md shadow shadow-black" 
                            onClick={handlePromptClick}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleRemovePrompt(item.index)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full text-xs transition-transform transform hover:scale-105 shadow shadow-black"
                            title="Remove Prompt"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}

            {/* Select Prompt Button */}
            <div className="w-11/12 p-4 mx-auto bg-gradient-to-r from-gray-700 via-zinc-500 to-slate-400 rounded-lg shadow-lg border-2 border-dashed border-amber-700">
                <div 
                    className="rounded-2xl flex justify-between cursor-pointer items-center"
                    onClick={handleSelectPrompt}
                > 
                    <h2 className="flex justify-start font-medium">
                        Select Prompt
                    </h2>
                    <button className="bg-amber-700 h-6 w-6 rounded-full shadow shadow-black text-white text-sm font-bold flex items-center justify-center">
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Prompt;