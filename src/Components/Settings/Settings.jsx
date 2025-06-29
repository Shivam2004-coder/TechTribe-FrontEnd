import { useSelector } from "react-redux";
import EditOptions from "./EditOptions";
import ChatTheme from "./ChatTheme/ChatTheme";
import Wallpaper from "./Wallpaper/Wallpaper";
import DisplayMode from "./DisplayMode";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

const Settings = () => {

  const showChatThemePage = useSelector((store) => store.set.showChatThemePage);
  const showWallPaperPage = useSelector((store) => store.set.showWallPaperPage);
  const showDisplayThemePage = useSelector((store) => store.set.showDisplayThemePage);
  const showDeleteAccountPage = useSelector((store) => store.set.showDeleteAccountPage);

  return (
    <div className="relative min-h-screen h-full w-full flex"
    >
      <div className="absolute left-0 top-0 h-full z-10">
        {/* <EditOptions /> */}
      </div>
      <div className="ml-16 w-full flex flex-col items-center transition-all duration-300 ease-in-out">
        {showChatThemePage && <ChatTheme />}
        {showWallPaperPage && <Wallpaper />}
        {showDisplayThemePage && <DisplayMode />}
        {showDeleteAccountPage && <DeleteAccount /> }
      </div>
    </div>

  );
};

export default Settings;