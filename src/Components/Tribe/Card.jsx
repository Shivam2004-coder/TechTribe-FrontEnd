

const Card = (p) => {

  const {
    feed,
    profilePictureIndex,
    setProfilePictureIndex,
    handleNext,
    handlePrev,
    ref,
    dragDirection,
    dragStrength,
  } = p;

  const {
    firstName,
    lastName,
    age,
    uploadedImages,
  } = feed.feed;

  return (
        <div
            className="relative flex flex-col h-full w-96 overflow-hidden rounded-3xl shadow shadow-black"
            style={{
                backgroundImage: `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${uploadedImages[profilePictureIndex]}")`,
                // backgroundImage: `url(${uploadedImages[profilePictureIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            ref={ref}
        >
            {/* LIKE image (top-right) */}
            <img
                src="/yeap.png"
                alt="Like"
                className="pointer-events-none z-50"
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    width: "80px",
                    transform: "rotate(10deg)",
                    opacity: dragDirection === "like" ? dragStrength : 0,
                    transition: "opacity 0.1s ease-in-out",
                }}
            />
    
            {/* NOPE image (top-left) */}
            <img
                src="/nope.png"
                alt="Nope"
                className="pointer-events-none z-50"
                style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    width: "80px",
                    transform: "rotate(-10deg)",
                    opacity: dragDirection === "nope" ? dragStrength : 0,
                    transition: "opacity 0.1s ease-in-out",
                }}
            />
    
            {/* SUPER-LIKE image (bottom-center) */}
            <img
                src="/like.png"
                alt="Superlike"
                className="pointer-events-none z-50"
                style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    opacity: dragDirection === "superlike" ? dragStrength : 0,
                    transition: "opacity 0.1s ease-in-out",
                }}
            />

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
                <div className="col-span-4 h-full flex items-center" >
                    <button className="bg-amber-600 p-4 shadow shadow-black hover:bg-amber-700 cursor-pointer active:shadow-inner active:bg-amber-700" >
                        Know More
                    </button>
                </div>
            </div>
        </div>
  );
};

export default Card;
