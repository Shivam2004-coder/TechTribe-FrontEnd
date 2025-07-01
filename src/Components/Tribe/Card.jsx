import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen/index";


const Card = (p) => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

  const {
    feed,
    profilePictureIndex,
    setProfilePictureIndex,
    handleNext,
    handlePrev,
    isHovered,
    showAbout,
  } = p;

  const {
    firstName,
    lastName,
    uploadedImages,
    livingIn,
    profileImage,
    membershipType,
  } = feed;

  console.log()

  return (
        <div
            className="relative flex flex-col h-full w-96  md:w-96 overflow-hidden bg-black rounded-3xl shadow shadow-black select-none"
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
            <div 
                className={`absolute
                            ${showAbout ? "scale-100 opacity-95" : "scale-0 opacity-0"} 
                            transition-all duration-500 ease-in-out 
                            bottom-0 grid grid-cols-12 rounded-3xl text-white w-full 
                            bg-gradient-to-t from-black/70 via-black/40 to-transparent 
                            backdrop-blur-2xl p-2 pb-10 ${isHovered ? "md:opacity-100" : "md:opacity-0"} `}
            >
                <div className={`col-span-8 transition-all duration-400 ease-in-out  
                            `} >
                    <div className="flex flex-row items-center justify-between  " >
                        <div className="flex items-center justify-start" >
                            <AdvancedImage
                                cldImg={cld.image(profileImage).resize(fill().width(250).height(250))}
                                className="object-cover h-10 w-10 mx-3 rounded-full shadow-black shadow-lg"
                            />
                            <h1 className="text-xl font-bold">{firstName + " " + lastName}</h1>
                        </div>
                        { membershipType !== "Free" && 
                            <div className="p-1 absolute top-4 right-4 rounded-full w-13 h-13 shadow-inner shadow-white flex items-center justify-center bg-gray-800 "  >
                                { membershipType === "Elite" && <i class="fa-solid fa-crown"></i> }
                                { membershipType === "Pro" &&  <i className="material-icons" >workspace_premium</i> }
                            </div>
                        }
                    </div>
                    <h3 className="flex items-start ml-15 text-md " ><i class="fa-solid fa-house-chimney m-2"></i> {livingIn}</h3>
                </div>
                
            </div>

        </div>
  );
};

export default Card;
