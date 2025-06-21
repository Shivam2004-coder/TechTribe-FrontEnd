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
        <div className="w-full mx-auto p-4 bg-gray-800 rounded-lg shadow-black shadow-lg">
            <div className="flex justify-end " 
                onClick={handleCloseButtonClick}    
            >
                <button className="bg-gray-900 p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 active:bg-gray-900 " >
                    <i className="material-icons">close</i>
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