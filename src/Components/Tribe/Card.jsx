

const Card = (p) => {

  const {
    feed,
    profilePictureIndex,
    setProfilePictureIndex,
    handleNext,
    handlePrev,
  } = p;

  const {
    firstName,
    lastName,
    age,
    uploadedImages,
  } = feed.feed;

  return (
        <div
            className="relative flex flex-col h-full w-96 overflow-hidden bg-black rounded-3xl shadow shadow-black select-none"
            style={{
                backgroundImage: `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${uploadedImages[profilePictureIndex]}")`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Dots for Image Selection - Moved to the Top */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {uploadedImages.map((_, index) => (
                <div
                    key={index}
                    className={`h-4 w-4 rounded-full cursor-pointer shadow shadow-black ${
                    index === profilePictureIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setProfilePictureIndex(index)}
                />
                ))}
            </div>

            {/* Left Arrow */}
            <button
                className="absolute left-2 top-1/2 w-10 h-10 flex items-center justify-center cursor-pointer transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                onClick={handlePrev}
            >
                ◀
            </button>

            {/* Right Arrow */}
            <button
                className="absolute right-2 top-1/2 w-10 h-10 flex items-center justify-center cursor-pointer transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                onClick={handleNext}
            >
                ▶
            </button>

            {/* User Info Overlay */}
            <div className="absolute bottom-0 grid grid-cols-12 rounded-t-xl text-white w-full  opacity-95  p-4">
                <div className="col-span-8" >
                    <h1 className="text-lg font-bold">{firstName + " " + lastName}</h1>
                    {age && <span>{age} years old</span>}
                    <h3 className="flex items-center" ><i className="material-icons">house</i> Lives in Delhi</h3>
                </div>
                
            </div>
        </div>
  );
};

export default Card;
