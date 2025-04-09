// ExploreButton.jsx
import React from 'react';

const ExploreButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
            Explore
        </button>
    );
};

export default ExploreButton;