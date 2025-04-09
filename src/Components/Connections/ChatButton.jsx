import React from 'react';

const ChatButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
            Chat
        </button>
    );
};

export default ChatButton;