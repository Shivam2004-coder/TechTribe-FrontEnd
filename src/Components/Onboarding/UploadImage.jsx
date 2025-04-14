import React from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import { BASE_URL } from '../../utils/Constants/constants';
import axios from 'axios';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";


const UploadImage = (props) => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const {images, setImages} = props;

    const validUploadCount = images.filter((img) => img !== null).length;

    const handleImageChange = (event , index) => {
        const file = event.target.files[0];
        console.log("I am in handleImageChange!!");
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = async () => {
                const updatedImages = [...images];

                const uImg = reader.result;
                const CloudinaryImages = await axios.post(BASE_URL + "profile/upload/image" , {
                    image: uImg, 
                    isProfile: false,
                    save: false,
                } , {withCredentials: true});
                updatedImages[index] = CloudinaryImages?.data?.public_id;
                setImages(updatedImages);
            };
        }
    };

    const handleDeleteImage = async (index) => {
        try {
            const updatedImages = [...images];
            console.log("I am in delete Function !!");

            const response = await axios.post(BASE_URL + "profile/delete/image", {
                publicId: updatedImages[index] ,
                isProfile: false,
            },{withCredentials: true});

            console.log(response);
    
            updatedImages.splice(index, 1); // Remove the image at the specified index
            updatedImages.push(null); // Add a null at the end to maintain the size of the array
            setImages(updatedImages);
        } catch (err) {
            console.error("Error deleting image:", err.response?.data || err.message);
        }
    };

    const triggerFileInput = (index) => {
        document.getElementById(`upload-${index}`).click();
    };

  return (
    <div className="flex items-center justify-center w-11/12 " >
        <div className="flex flex-col items-center bg-gray-400 p-3 rounded-2xl border-2 border-gray-600">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-white text-lg font-semibold">Upload at least 2 images</h2>
                <span
                    className={`text-sm px-3 py-1 rounded-full ${
                        validUploadCount >= 2 ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                >
                {validUploadCount > 2 ? "2" : validUploadCount } / 2 uploaded
                </span>
            </div>
            <div className="flex flex-col gap-4 items-center">
                {/* First Row */}
                <div className="flex gap-4">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`relative w-24 h-28 border-2 border-dashed border-gray-500 rounded-lg 
                                flex items-center justify-center bg-gray-700 transition-all 
                                ${index === 0 || images[index - 1] ? 'hover:bg-gray-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}
                                overflow-hidden`}
                            // onClick={() => !images[index] && handleFileClick(index)}
                            onClick={() => {
                                if (index === 0 || images[index - 1]) {
                                    triggerFileInput(index);
                                }
                            }}
                        >
                            {images[index] ? (
                            <>
                                <div className="w-full h-full object-cover rounded-lg" >
                                    <AdvancedImage cldImg={cld.image(images[index]).resize(fill().width(250).height(300))} />
                                </div>
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleDeleteImage(index);
                                }}
                                className="absolute bottom-1 right-1 bg-white hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition cursor-pointer"
                                >
                                🗑️
                                </button>
                            </>
                            ) : (
                            <>
                                <span className={`text-gray-400 text-sm font-medium ${index === 0 || images[index - 1] ? '' : 'hidden'}`}>Upload</span>
                                <div className={`absolute bottom-1 right-1 w-6 h-6 bg-white text-black rounded-full 
                                            flex items-center justify-center text-lg font-bold shadow 
                                            group-hover:bg-black group-hover:text-white transition-all ${index === 0 || images[index - 1] ? '' : 'hidden'}`}>
                                    +
                                </div>
                            </>
                            )}
                            <input
                                type="file"
                                id={`upload-${index}`}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e , index)}
                            />
                        </div>
                    ))}
                </div>

                {/* Second Row */}
                <div className="flex gap-4">
                    {[3, 4, 5].map((index) => (
                        <div
                            key={index}
                            className={`relative w-24 h-28 border-2 border-dashed border-gray-500 rounded-lg 
                                flex items-center justify-center bg-gray-700 transition-all 
                                ${index === 0 || images[index - 1] ? 'hover:bg-gray-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}
                                overflow-hidden`}
                            // onClick={() => !images[index] && handleFileClick(index)}
                            onClick={() => {
                                if (index === 0 || images[index - 1]) {
                                    triggerFileInput(index);
                                }
                            }}
                        >
                            {images[index] ? (
                            <>
                                <div className="w-full h-full object-cover rounded-lg" >
                                    <AdvancedImage cldImg={cld.image(images[index]).resize(fill().width(250).height(300))} />
                                </div>
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleDeleteImage(index);
                                }}
                                className="absolute bottom-1 right-1 bg-white hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition cursor-pointer"
                                >
                                🗑️
                                </button>
                            </>
                            ) : (
                            <>
                                <span className={`text-gray-400 text-sm font-medium ${index === 0 || images[index - 1] ? '' : 'hidden'}`}>Upload</span>
                                <div className={`absolute bottom-1 right-1 w-6 h-6 bg-white text-black rounded-full 
                                            flex items-center justify-center text-lg font-bold shadow 
                                            group-hover:bg-black group-hover:text-white transition-all ${index === 0 || images[index - 1] ? '' : 'hidden'}`}>
                                    +
                                </div>
                            </>
                            )}
                            <input
                                type="file"
                                id={`upload-${index}`}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UploadImage