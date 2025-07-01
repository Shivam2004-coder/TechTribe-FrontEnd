import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";
import EditOptions from "./Profile/EditOptions/EditOptions";
import EditOption from "./Settings/EditOptions";

const Layout = () => {
  let wallpaperImage = useSelector((store) => store.profile.wallpaperImage);
  const displayMode = useSelector((store) => store.profile.displayMode);
  const location = useLocation();
  const path = location.pathname;

  // Determine background styles
  let bgClass = "";
  let bgImage = "";
  let useBackgroundImage = true;

  if (path === "/login" || path === "/onboarding") {
    useBackgroundImage = true;
    bgImage = "url('/loginBackground3.jpg')";
  } else if (path === "/tribe") {
    useBackgroundImage = true;
    bgImage = `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${wallpaperImage}")`;
  } else {
    useBackgroundImage = false;
    bgClass = displayMode === "Light" ? "bg-gradient-to-r from-zinc-400 via-gray-500 to-neutral-600" : "bg-gradient-to-r from-zinc-800 via-gray-800 to-neutral-900";
  }

  return (

    <div className=" flex flex-col min-h-screen max-w-screen overflow-x-clip" >
      <div className="flex flex-row min-h-screen h-full w-full overflow-x-clip" >
        {/* { location.pathname === "/profile" ?
          <EditOptions />
          : location.pathname === "/settings" ?
          <EditOption />
          :
          <>
          </>
        } */}

          {location.pathname === "/profile" ? (
              <EditOptions />
          ) : location.pathname === "/settings" ? (
            // <div className="min-h-screen">
              <EditOption />
            // </div>
          ) : null}

        <div
          className={`flex flex-col justify-between w-full min-h-screen max-w-screen overflow-x-clip ${ useBackgroundImage ? {} : bgClass } `}
          // style={ useBackgroundImage
          //     ? {
          //         backgroundImage: bgImage,
          //         backgroundSize: "cover",
          //         backgroundPosition: "center",
          //         backgroundRepeat: "repeat",
          //         backgroundAttachment: "fixed",
          //       }
          //       : {}
          // }
        >

            {useBackgroundImage && (
              <div
                className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: bgImage,
                }}
              />
            )}
            
            <Header />
            <div className="flex-grow w-full h-full min-h-screen flex items-center justify-center">
              <Outlet />
            </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;




{/* <div
      className={`flex flex-col justify-between min-h-screen max-w-screen overflow-x-clip ${!useBackgroundImage ? bgClass : ""}`}
      style={
        useBackgroundImage
          ? {
              backgroundImage: bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      { location === "/profile" && 
        <EditOptions />

      }
      <Header />
      <div className="flex-grow w-full h-full min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </div> */}