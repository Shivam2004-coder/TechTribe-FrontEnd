import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { useState } from 'react';
import { BASE_URL } from '../../../utils/Constants/constants';
import axios from 'axios';
import { errorMessage } from '../../../utils/ShowMessage';
import { useDispatch } from 'react-redux';
import { setUploadedImages } from '../../../utils/ReduxStore/profileSlice';
import useSaveImages from '../../../CustomHooks/useSaveImages';

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

    const [uploadingIndexes, setUploadingIndexes] = useState([]);
    const dispatch = useDispatch();
    const { handleSaveProfileClick } = useSaveImages();


    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const uImg = reader.result;

                try {

                    // Start shimmer
                    setUploadingIndexes((prev) => [...prev, index]);

                    // Step 1: If an image already exists at this index, delete it first
                    if (images[index]) {
                        await axios.post(BASE_URL + "profile/delete/image", {
                            publicId: images[index],
                            isProfile: false,
                        }, { withCredentials: true });
                    }

                    // Step 2: Upload new image
                    const response = await axios.post(BASE_URL + "profile/upload/image", {
                        image: uImg,
                        isProfile: false,
                    }, { withCredentials: true });

                    // Step 3: Update images array immutably
                    const newImages = [...images];
                    newImages[index] = response?.data?.public_id;
                    setImages(newImages);
                    dispatch(setUploadedImages(newImages.filter(Boolean))); // Only keep non-null images());
                    await handleSaveProfileClick( null ,newImages , null , null , null );
                }
                catch (err) {
                    console.error("Error uploading image:", err);
                    errorMessage("Failed to upload image. Please try again.");
                }
                finally {
                    // Stop shimmer
                    setUploadingIndexes((prev) => prev.filter(i => i !== index));
                }
            };

            reader.readAsDataURL(file);
        }
    };

    
    const handleDelete = async (index) => {
        try{
            // Start shimmer
            setUploadingIndexes((prev) => [...prev, index]);

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
            console.log(images);
            dispatch(setUploadedImages(newImages.filter(Boolean))); // Only keep non-null images());
            await handleSaveProfileClick( null ,newImages , null , null , null );
        }
        catch (error) {
            console.error("Error deleting image:", error);
            errorMessage("Failed to delete image. Please try again.");
        }
        finally {
            // Stop shimmer
            setUploadingIndexes((prev) => prev.filter(i => i !== index));
        }
    };
    

    const triggerFileInput = (index) => {
        document.getElementById(`upload-${index}`).click();
    };

    return (
        <div className="w-11/12 mx-auto px-1 py-4 rounded-2xl">
            <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
                <i className="material-icons flex items-center justify-center w-8 scale-90 md:scale-125">photo_library</i>
                Profile Photos
            </div>
            <div className="grid grid-cols-3 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div
                        key={index}
                        className={`relative w-full aspect-[4/5] border-2 border-dotted border-gray-500 rounded-lg 
                            flex items-center justify-center bg-gray-700 transition-all 
                            ${index === 0 || images[index - 1] ? 'hover:bg-gray-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}
                            overflow-hidden`}
                        onClick={() => {
                            if (index === 0 || images[index - 1]) {
                            triggerFileInput(index);
                            }
                    }}
                    >
                    {uploadingIndexes.includes(index) ? (
                        <div className="absolute inset-0 shimmer rounded-lg"></div>
                    ) : images[index] ? (
                        <>
                            <AdvancedImage
                                cldImg={cld.image(images[index]).resize(fill().width(400).height(500))}
                                className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                            />
                            {images.filter(Boolean).length > 2 &&
                                <button
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(index);
                                    }}
                                    className="absolute bottom-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-700 hover:text-white transition-all"
                                >
                                    <i className="material-icons text-sm">delete</i>
                                </button>
                            }
                        </>
                    ) : (
                        <>
                            <span className={`text-gray-400 text-sm font-medium ${index === 0 || images[index - 1] ? '' : 'hidden'}`}>
                                Upload
                            </span>
                            <div
                                className={`absolute bottom-2 right-2 w-8 h-8 bg-white text-black rounded-full 
                                flex items-center justify-center text-lg font-bold shadow 
                                hover:bg-black hover:text-white transition-all ${index === 0 || images[index - 1] ? '' : 'hidden'}`}
                            >
                                <i className="material-icons">add</i>
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
