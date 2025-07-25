// ExploreButton.jsx
import React from 'react';
import { errorMessage, successMessage } from '../../utils/ShowMessage';
import axios from 'axios';
import { removeC } from '../../utils/ReduxStore/connectionSlice';
import { useDispatch } from 'react-redux';

const RejectButton = ({ _id }) => {
    const dispatch = useDispatch();

    const handleRequestClick = async () =>  {
        try {
          await axios.post(`${import.meta.env.VITE_BASE_URL}request/review/rejected/${_id}`, {}, { withCredentials: true });
          successMessage("Request Rejected Successfully");
          dispatch(removeC(_id));
        } 
        catch (error) {
          errorMessage("i am in the reject button  "+error.message);
        }
    };

    return (
        <button
            onClick={handleRequestClick}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-red-800 shadow-md transition-transform transform hover:scale-105"
        >
            Reject
        </button>
    );
};

export default RejectButton;