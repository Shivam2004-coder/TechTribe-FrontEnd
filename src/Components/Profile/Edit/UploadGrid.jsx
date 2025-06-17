import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import React from 'react';
import { BASE_URL } from '../../../utils/Constants/constants';
import axios from 'axios';
import { errorMessage } from '../../../utils/ShowMessage';

const UploadGrid = (props) => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const {
        images,
        setImages
    } = props;

    const handleImageUpload = (e, index) => {
        console.log("I am in image upload function !!");
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const newImages = [...images];
                const uImg = reader.result;
                try{
                    const CloudinaryImages = await axios.post(BASE_URL + "profile/upload/image" , {
                        image: uImg, 
                        isProfile: false,
                    } , {withCredentials: true});
                    newImages[index] = CloudinaryImages?.data?.public_id;
                    setImages(newImages);
                }
                catch(err){
                    console.error("Error uploading image:", err);
                    errorMessage("Failed to upload image. Please try again.");
                }
                };
                reader.readAsDataURL(file);
            }
    };
    
    const handleDelete = async (index) => {
        const newImages = [...images];

        console.log("I am in delete Function !!");

        const response = await axios.post(BASE_URL + "profile/delete/image", {
            publicId: newImages[index] ,
            isProfile: false,
            save: false,
        },{withCredentials: true});

        console.log(response);

        newImages.splice(index, 1); // Remove the image at the specified index
        newImages.push(null); // Add a null at the end to maintain the size of the array
        setImages(newImages); // Update state
    };
    

    const triggerFileInput = (index) => {
        document.getElementById(`upload-${index}`).click();
    };

    return (
        <div className="w-11/12 max-w-xl mx-auto p-1 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-semibold">Profile Photos</h2>
            </div>
            <div className="grid grid-cols-3 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div
                        key={index}
                        className={`relative w-full h-28 border-2 border-dashed border-gray-500 rounded-lg 
                                flex items-center justify-center bg-gray-700 transition-all 
                                ${index === 0 || images[index - 1] ? 'hover:bg-gray-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}
                                overflow-hidden`}
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
                                {/* <img
                                    src={image}
                                    alt={`uploaded-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                /> */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the onClick of the box
                                        handleDelete(index);
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
                            onChange={(e) => handleImageUpload(e, index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadGrid;
