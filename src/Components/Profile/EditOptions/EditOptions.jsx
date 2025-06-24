import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnlyShowAvatarPage, OnlyShowEditPage, OnlyShowPreviewPage } from "../../../utils/ReduxStore/setSlice";

const EditOptions = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleMenu = () => {
        setIsMenuOpen((prev) => {
            // Collapse notice when closing menu
            if (prev) setIsNoticeOpen(false);
            return !prev;
        });
    };

    const displayMode = useSelector((store) => store.profile.displayMode);

    const showAvatarPage = useSelector((store) => store.set.showAvatarPage);
    const showEditPage = useSelector((store) => store.set.showEditPage);
    const showPreviewPage = useSelector((store) => store.set.showPreviewPage);
    
    const handleChooseAvatarClick = () => {
        dispatch(OnlyShowAvatarPage());
    };
    const handleProfileEditClick = () => {
        dispatch(OnlyShowEditPage());
    };
    const handlePreviewClick = () => {
        dispatch(OnlyShowPreviewPage());
    };
    const handleNoticeClick = () => {
        if (isMenuOpen) setIsNoticeOpen((prev) => !prev);
    };

    const selectedStyle = displayMode === "Light" ? "bg-black text-white" : "bg-white text-black" ;
    const hoverStyle = displayMode === "Light" ? "hover:bg-black hover:text-white" : "hover:bg-white hover:text-black" ;
    const background = displayMode === "Light" ? "bg-white text-black" : "bg-black";
    
    return (<>
            <div className={`flex flex-col text-sm md:text-lg items-start h-full transition-all duration-300 ease-in-out ${ isMenuOpen ? "w-52 md:w-84" : "w-16" } p-1 md:p-2 ${background} shadow-md shadow-black select-none`}
                
            >
                <div className={`${background} h-12 w-12 mb-12 flex items-center justify-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`}
                    onClick={toggleMenu}
                >
                    <i className="material-icons">menu</i>
                </div>

                <div className={`h-12 mb-2 p-3 ${ isMenuOpen ? "w-48 md:w-80" : "w-12" } ${showAvatarPage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleChooseAvatarClick}
                >
                    <i className="material-icons">face_5</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { isMenuOpen && "Use Avatars" }
                    </div>
                </div>
                
                <div className={` h-12 mb-2 p-3  ${ isMenuOpen ? "w-48 md:w-80" : "w-12" } ${showEditPage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleProfileEditClick}
                >
                    <i className="material-icons ">edit_document</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { isMenuOpen && "Edit Profile" }
                    </div>
                </div>
                
                <div className={` h-12 mb-2 p-3 ${ isMenuOpen ? "w-48 md:w-80" : "w-12" } ${showPreviewPage ? `${selectedStyle}` : `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handlePreviewClick}
                >
                    <i className="material-icons">preview</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { isMenuOpen && "Preview" }
                    </div>
                </div>
                
                 {/* Notice Section */}
                <div 
                    className={`${background} h-auto mb-2 p-3 ${isMenuOpen ? "w-48 md:w-80" : "w-12"} flex flex-col ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-lg`} 
                    onClick={handleNoticeClick}
                >
                    <div className="flex items-center">     
                        <i className="material-icons">priority_high</i>
                        {isMenuOpen && (
                            <div className="mx-3 font-bold tracking-wide flex items-center justify-between text-center w-full">
                                <span>Notice</span>
                                <span>{isNoticeOpen ? "▲" : "▼"}</span>
                            </div>
                        )}
                    </div>

                    {/* Smooth Expandable Message */}
                    <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden text-md mt-2 px-1 ${
                            isNoticeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        After editing your profile always click apply changes and then save your profile...
                    </div>
                </div>

            </div>
        </>
    );
};

export default EditOptions;
