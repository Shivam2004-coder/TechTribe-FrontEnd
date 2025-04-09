import React, { useRef } from 'react'

const UploadImage = (props) => {
    const fileInputRefs = useRef([]);
    const {images, setImages} = props;

    const validUploadCount = images.filter((img) => img !== null).length;

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const updatedImages = [...images];
            updatedImages[index] = reader.result;
            setImages(updatedImages);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleFileClick = (index) => {
        fileInputRefs.current[index].click();
      };

      const handleDeleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages[index] = null;
        setImages(updatedImages);
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
                {validUploadCount} / 2 uploaded
                </span>
            </div>
            <div className="flex flex-col gap-4 items-center">
                {/* First Row */}
                <div className="flex gap-4">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className="relative w-24 h-28  border-2 border-dashed border-gray-500 rounded-lg 
                                    flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-all 
                                    cursor-pointer group overflow-hidden"
                            onClick={() => !images[index] && handleFileClick(index)}
                        >
                            {images[index] ? (
                            <>
                                <img
                                src={images[index]}
                                alt={`uploaded-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteImage(index);
                                }}
                                className="absolute bottom-1 right-1 bg-white hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition cursor-pointer"
                                >
                                🗑️
                                </button>
                            </>
                            ) : (
                            <>
                                <span className="text-gray-400 text-sm font-medium">Upload</span>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-white text-black rounded-full 
                                                flex items-center justify-center text-lg font-bold shadow 
                                                group-hover:bg-black group-hover:text-white transition-all">
                                +
                                </div>
                            </>
                            )}
                            <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            onChange={(e) => handleImageChange(index, e)}
                            />
                        </div>
                    ))}
                </div>

                {/* Second Row */}
                <div className="flex gap-4">
                    {[3, 4, 5].map((index) => (
                        <div
                            key={index}
                            className="relative w-24 h-28 border-2 border-dashed border-gray-500 rounded-lg 
                                    flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-all 
                                    cursor-pointer group overflow-hidden"
                            onClick={() => !images[index] && handleFileClick(index)}
                        >
                            {images[index] ? (
                            <>
                                <img
                                src={images[index]}
                                alt={`uploaded-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteImage(index);
                                }}
                                className="absolute bottom-1 right-1 bg-white hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition cursor-pointer"
                                >
                                🗑️
                                </button>
                            </>
                            ) : (
                            <>
                                <span className="text-gray-400 text-sm font-medium">Upload</span>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-white text-black rounded-full 
                                                flex items-center justify-center text-lg font-bold shadow 
                                                group-hover:bg-black group-hover:text-white transition-all">
                                +
                                </div>
                            </>
                            )}
                            <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            onChange={(e) => handleImageChange(index, e)}
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