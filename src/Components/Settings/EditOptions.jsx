import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnlyShowChatThemePage, OnlyShowWallPaperPage, OnlyShowDisplayThemePage } from "../../utils/ReduxStore/setSlice";

const EditOptions = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleMenu = () => {
        setIsMenuOpen((prev) => {
            // Collapse notice when closing menu
            return !prev;
        });
    };

    const displayMode = useSelector((store) => store.profile.displayMode);

    const showChatThemePage = useSelector((store) => store.set.showChatThemePage);
    const showWallPaperPage = useSelector((store) => store.set.showWallPaperPage);
    const showDisplayThemePage = useSelector((store) => store.set.showDisplayThemePage);
    
    const handleChatThemeClick = () => {
        dispatch(OnlyShowChatThemePage());
    };
    const handleWallPaperClick = () => {
        dispatch(OnlyShowWallPaperPage());
    };
    const handleDisplayThemeClick = () => {
        dispatch(OnlyShowDisplayThemePage());
    };

    const selectedStyle = displayMode === "Light" ? "bg-black text-white" : "bg-white text-black" ;
    const hoverStyle = displayMode === "Light" ? "hover:bg-black hover:text-white" : "hover:bg-white hover:text-black" ;
    const background = displayMode === "Light" ? "bg-white text-black" : "bg-black";
    
    return (<>
            <div className={`flex flex-col text-sm md:text-lg items-start h-full transition-all duration-300 ease-in-out ${ isMenuOpen ? "w-52 md:w-84" : "w-16" } p-1 md:p-2 ${background} shadow-md shadow-black select-none`}
                
            >
                <div className={`${background} h-12 w-12 mb-12 flex items-center justify-center  ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`}
                    onClick={toggleMenu}
                >
                    <i className="material-icons">menu</i>
                </div>

                <div className={`h-12 mb-2 p-3 ${ isMenuOpen ? "w-48 md:w-80" : "w-12" } ${showChatThemePage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleChatThemeClick}
                >
                    <i className="material-icons">chat</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { isMenuOpen && "Chat Theme" }
                    </div>
                </div>
                
                <div className={`h-12 mb-2 p-3  ${ isMenuOpen ? "w-48 md:w-80" : "w-12" } ${showWallPaperPage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleWallPaperClick}
                >
                    <i className="material-icons">wallpaper</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { isMenuOpen && "Wallpaper" }
                    </div>
                </div>
                
                <div className={`bg-black h-12 mb-2 p-3 ${ isMenuOpen ? "w-48 md:w-80" : "w-12" } ${showDisplayThemePage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleDisplayThemeClick}
                >
                    <i className="material-icons">brightness_6</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { isMenuOpen && "Display Mode" }
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOptions;
