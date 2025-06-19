import { useState } from "react";
import ProfileEdit from "./Options/ProfileEdit";
import Preview from "./Options/Preview";
import Notice from "./Options/Notice";
import UserAvatar from "./Options/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { OnlyShowAvatarPage } from "../../../utils/ReduxStore/setSlice";

const EditOptions = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const showAvatarPage = useSelector((store) => store.set.showAvatarPage);
    // const showEditPage = useSelector((store) => store.set.showEditPage);

    const handleChooseAvatarClick = () => {
        dispatch(OnlyShowAvatarPage());
    };
    
    return (<>
            <div className={`flex flex-col items-start h-full transition-all duration-300 ease-in-out ${ isMenuOpen ? "w-96" : "w-16" } p-1 md:p-2 bg-black shadow-md shadow-black select-none`}
                
            >
                <div className="bg-black h-12 w-12 mb-12 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 ease-in-out cursor-pointer rounded-full" 
                    onClick={toggleMenu}
                >
                    <i className="material-icons">menu</i>
                </div>

                <div className={`bg-black h-12 mb-2 p-3 ${ isMenuOpen ? "w-96" : "w-12" } ${showAvatarPage ? "bg-white text-black" : "" } flex items-center hover:bg-white hover:text-black transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleChooseAvatarClick}
                >
                    <i className="material-icons">face_5</i>
                    <div className="mx-3 font-bold text-lg tracking-wide flex items-center text-center">
                        { isMenuOpen && " Use Avatars" }
                    </div>
                </div>
                
                <div className={`bg-black h-12 mb-2 p-3  ${ isMenuOpen ? "w-96" : "w-12" } flex items-center hover:bg-white hover:text-black transition-all duration-300 ease-in-out cursor-pointer rounded-full`} >
                    <i className="material-icons">edit_document</i>
                    { isMenuOpen && <ProfileEdit /> }
                </div>
                
                <div className={`bg-black h-12 mb-2 p-3 ${ isMenuOpen ? "w-96" : "w-12" } flex items-center hover:bg-white hover:text-black transition-all duration-300 ease-in-out cursor-pointer rounded-full`} >
                    <i className="material-icons">preview</i>
                    { isMenuOpen && <Preview /> }
                </div>
                
                <div className={`bg-black h-12 mb-2 p-3 ${ isMenuOpen ? "w-96" : "w-12" } flex items-center hover:bg-white hover:text-black transition-all duration-300 ease-in-out cursor-pointer rounded-full`} >
                    <i className="material-icons">priority_high</i>
                    { isMenuOpen && <Notice /> }
                </div>

            </div>
        </>
    );
};

export default EditOptions;
