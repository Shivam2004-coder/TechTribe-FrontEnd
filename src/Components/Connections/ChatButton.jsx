import React from 'react';
import { Link } from 'react-router-dom';

const ChatButton = ({_id}) => {
    return (
        <Link to={"/chat/"+_id} >
            <button
                className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                Chat
            </button>
        </Link>
    );
};

export default ChatButton;