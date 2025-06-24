import { useSelector } from "react-redux";
import EditOptions from "./EditOptions";
import ChatTheme from "./ChatTheme/ChatTheme";
import Wallpaper from "./Wallpaper";
import DisplayMode from "./DisplayMode";

const Settings = () => {

  const showChatThemePage = useSelector((store) => store.set.showChatThemePage);
  const showWallPaperPage = useSelector((store) => store.set.showWallPaperPage);
  const showDisplayThemePage = useSelector((store) => store.set.showDisplayThemePage);
  

  return (
    <div className="relative min-h-screen w-full bg-gray-500 flex">
      <div className="absolute left-0 top-0 h-full z-10">
        <EditOptions />
      </div>
      <div className="ml-16 w-full bg-black flex flex-col items-center transition-all duration-300 ease-in-out">
        {showChatThemePage && <ChatTheme />}
        {showWallPaperPage && <Wallpaper />}
        {showDisplayThemePage && <DisplayMode />}
      </div>
    </div>

  );
};

export default Settings;