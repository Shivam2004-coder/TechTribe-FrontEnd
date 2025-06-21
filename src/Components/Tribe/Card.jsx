

const Card = (p) => {

  const {
    feed,
    profilePictureIndex,
    setProfilePictureIndex,
    handleNext,
    handlePrev,
    isHovered,
  } = p;

  const {
    firstName,
    lastName,
    uploadedImages,
    livingIn,
  } = feed.feed;

  console.log("uploadedImages", uploadedImages);

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
                    className={`h-4 w-4 rounded-full cursor-pointer shadow-black shadow-lg 
                        transition-all duration-400 ease-in-out 
                      ${isHovered ? "md:scale-100" : "md:scale-0"} ${
                    index === profilePictureIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setProfilePictureIndex(index)}
                />
                ))}
            </div>

            {/* Left Arrow */}
            <button
                className={`absolute w-1/2 h-full  flex items-center justify-start cursor-pointer text-white p-4
                            transition-all duration-400 ease-in-out ${isHovered ? "scale-100" : "scale-0"}  `}
                onClick={handlePrev}
            >
                <div className="flex p-2 rounded-2xl items-center justify-center bg-black opacity-0 md:opacity-100" > 
                    ◀
                </div>
            </button>

            {/* Right Arrow */}
            <button
                className={`absolute left-1/2 w-1/2 h-full  flex items-center justify-end cursor-pointer text-white p-4
                            transition-all duration-400 ease-in-out ${isHovered ? "scale-100" : "scale-0"}  `}
                onClick={handleNext}
            >
                <div className="flex p-2 rounded-2xl items-center justify-center bg-black opacity-0 md:opacity-100" > 
                    ▶
                </div>
            </button>

            {/* User Info Overlay */}
            <div className={`absolute bottom-4 grid grid-cols-12 rounded-t-xl text-white w-full  opacity-95  p-4
                             `}>
                <div className={`col-span-8 transition-all duration-400 ease-in-out  ${isHovered ? "md:opacity-100" : "md:opacity-0"}
                            `} >
                    <h1 className="text-lg font-bold">{firstName + " " + lastName}</h1>
                    <h3 className="flex items-center" ><i className="material-icons">house</i> {livingIn}</h3>
                </div>
                
            </div>

        </div>
  );
};

export default Card;
