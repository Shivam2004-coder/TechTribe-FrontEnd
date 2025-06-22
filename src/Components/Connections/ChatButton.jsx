import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCurrentConnection } from '../../utils/ReduxStore/connectionSlice';

const ChatButton = ({user}) => {
    const dispatch = useDispatch();

    const handleChatButtonClick = () => {
        dispatch(addCurrentConnection(user));
    }

    return (
        <Link to={"/chat/"+user._id} >
            <button
                className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={handleChatButtonClick}
            >
                Chat
            </button>
        </Link>
    );
};

export default ChatButton;