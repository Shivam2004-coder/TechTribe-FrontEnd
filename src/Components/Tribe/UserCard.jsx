import React, { useState } from "react";
import Card from "./Card";


const UserCard = (feed) => {
    const [profilePictureIndex, setProfilePictureIndex] = useState(0);

    const [animationClass, setAnimationClass] = useState('');


    const {uploadedImages} = feed.feed;

    const handleNext = () => {
        setProfilePictureIndex((prevIndex) =>
            prevIndex === uploadedImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setProfilePictureIndex((prevIndex) =>
        prevIndex === 0 ? uploadedImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={`card-wrapper ${animationClass}`}>
            <Card 
                feed={feed} 
                profilePictureIndex={profilePictureIndex}
                setProfilePictureIndex={setProfilePictureIndex}
                handleNext={handleNext}
                handlePrev={handlePrev}
                setAnimationClass={setAnimationClass}
            />
        </div>
    );
};

export default UserCard;