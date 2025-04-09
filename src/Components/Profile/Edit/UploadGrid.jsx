import React from 'react';

const UploadGrid = (props) => {
    const {
        images,
        setImages
    } = props;

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[index] = reader.result; // Set the uploaded image
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleDelete = (index) => {
        const newImages = [...images];
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
                {images.map((image, index) => (
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
                        {image ? (
                            <>
                                <img
                                    src={image}
                                    alt={`uploaded-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
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
