import { useDispatch, useSelector } from "react-redux";
import { OnlyShowChatThemePage, OnlyShowWallPaperPage, OnlyShowDisplayThemePage, OnlyShowDeleteAccountPage, toggleSettingsMenu } from "../../utils/ReduxStore/setSlice";

const EditOptions = () => {
    const showSettingsMenu = useSelector((store) => store.set.showSettingsMenu);
    const dispatch = useDispatch();

    const displayMode = useSelector((store) => store.profile.displayMode);

    const showChatThemePage = useSelector((store) => store.set.showChatThemePage);
    const showWallPaperPage = useSelector((store) => store.set.showWallPaperPage);
    const showDisplayThemePage = useSelector((store) => store.set.showDisplayThemePage);
    const showDeleteAccountPage = useSelector((store) => store.set.showDeleteAccountPage);
    
    const handleChatThemeClick = () => {
        dispatch(OnlyShowChatThemePage());
    };
    const handleWallPaperClick = () => {
        dispatch(OnlyShowWallPaperPage());
    };
    const handleDisplayThemeClick = () => {
        dispatch(OnlyShowDisplayThemePage());
    };
    const handleDeleteAccountClick = () => {
        dispatch(OnlyShowDeleteAccountPage());
    }

    const openMenu = () => dispatch(toggleSettingsMenu(true));
    const closeMenu = () => dispatch(toggleSettingsMenu(false));

    console.log(showDeleteAccountPage);

    const selectedStyle = displayMode === "Light" ? "bg-black text-white" : "bg-white text-black" ;
    const hoverStyle = displayMode === "Light" ? "hover:bg-black hover:text-white " : "hover:bg-white hover:text-black " ;
    const background = displayMode === "Light" ? "bg-white text-black" : "bg-black text-white";
    
    return (<>
            <div className={`flex fixed flex-col text-sm md:text-lg z-30 items-start h-full transition-all duration-300 ease-in-out ${ showSettingsMenu ? "w-52 md:w-84" : "w-16" } p-1 md:p-2 ${background} select-none`}
            >
                    <div
                        className={`${background} h-12 mb-12 ${
                            showSettingsMenu ? "w-48 md:w-80 justify-between mt-3" : `w-12 justify-center ${hoverStyle}`
                        } flex items-center transition-all duration-300 ease-in-out cursor-pointer rounded-full`}
                        onClick={!showSettingsMenu ? openMenu : undefined}
                    >
                        {!showSettingsMenu ? (
                            <i className={`material-icons`}
                            >menu</i>
                        ) : (
                            <>
                            <img
                                src="/techTribeLogo1.png"
                                alt="WebsiteLogo"
                                className={`h-10 w-10 md:h-15 md:w-15 mx-1 ${ displayMode === "Light" ? "bg-black rounded-md" : "bg-transparent" } `}
                            />
                            
                            </>
                        )}
                    </div> 
                    { showSettingsMenu &&
                        <div className="absolute flex items-center justify-center top-4 right-4" >
                            <i
                                className={`material-icons ${hoverStyle} transition-all duration-300 ease-in-out rounded-xl p-3`}
                                onClick={closeMenu} // Apply click only to delete icon
                            >
                                close
                            </i>
                        </div>
                    }

                <div className={`h-12 mb-2 p-3 ${ showSettingsMenu ? "w-48 md:w-80" : "w-12" } ${showChatThemePage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleChatThemeClick}
                >
                    <i className="material-icons">chat</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { showSettingsMenu && "Chat Theme" }
                    </div>
                </div>
                
                <div className={`h-12 mb-2 p-3  ${ showSettingsMenu ? "w-48 md:w-80" : "w-12" } ${showWallPaperPage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleWallPaperClick}
                >
                    <i className="material-icons">wallpaper</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { showSettingsMenu && "Wallpaper" }
                    </div>
                </div>
                
                <div className={`bg-black h-12 mb-2 p-3 ${ showSettingsMenu ? "w-48 md:w-80" : "w-12" } ${showDisplayThemePage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleDisplayThemeClick}
                >
                    <i className="material-icons">brightness_6</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { showSettingsMenu && "Display Mode" }
                    </div>
                </div>
                <div className={`bg-black h-12 mb-2 p-3 ${ showSettingsMenu ? "w-48 md:w-80" : "w-12" } ${showDeleteAccountPage ? `${selectedStyle}` :  `${background}` } flex items-center ${hoverStyle} transition-all duration-300 ease-in-out cursor-pointer rounded-full`} 
                    onClick={handleDeleteAccountClick}
                >
                    <i className="material-icons">delete</i>
                    <div className="mx-3 font-bold tracking-wide flex items-center text-center">
                        { showSettingsMenu && "Delete Account" }
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOptions;
