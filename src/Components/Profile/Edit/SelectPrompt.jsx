import React from 'react';

const SelectPrompt = (props) => {

    const {
        promptsList,
        setIndex,
        setEditPrompt,
        setIsSelectPromptClick
    } = props;

    const handleSelectPromptClick = (index) => {
        setEditPrompt(true);
        setIndex(index);
    }

    const handleCloseButtonClick = () => {
        setIsSelectPromptClick(false);
    }

    return (
        <div className="w-11/12 max-w-lg mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex justify-start" 
                onClick={handleCloseButtonClick}    
            >
                <button className="bg-gray-900 rounded-full" >
                    x
                </button>
            </div>
            <h2 className="text-white text-2xl font-bold mb-4 text-center">Select a Prompt</h2>
            <ul className="space-y-2">
                {promptsList.map((prompt, index) => (
                    <li key={index} className="bg-gray-700 p-3 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-600 cursor-pointer"
                                    onClick={() => handleSelectPromptClick(index)}
                    >
                        {prompt}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectPrompt;