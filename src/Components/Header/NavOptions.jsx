import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NavOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [originSide, setOriginSide] = useState('left'); // default

  useEffect(() => {
    const updateZoomAndWidth = () => {
      const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
      setZoomLevel(zoom);
      setScreenWidth(window.innerWidth);
    };

    updateZoomAndWidth();
    window.addEventListener('resize', updateZoomAndWidth);
    return () => window.removeEventListener('resize', updateZoomAndWidth);
  }, []);

  const handleNavigate = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };



  const hoverStyle = "text-white hover:text-yellow-400";

  const renderContent = (text, IconName) => {
    if (screenWidth < 768) {
      return <i className={`${hoverStyle} material-icons transition-colors duration-400 ease-in-out`}>{IconName}</i>;
    }
    if (zoomLevel <= 67) {
      return <span className={`${hoverStyle} transition-colors duration-400 ease-in-out`}>{text}</span>;
    } else {
      return <i className={`${hoverStyle} material-icons transition-colors duration-400 ease-in-out`}>{IconName}</i>;
    }
  };

  const buttons = [
    { label: "Home", icon: "home", path: "/tribe" },
    { label: "Premium", icon: "diamond", path: "/premium" },
    { label: "About", icon: "info", path: "/about-us" },
    { label: "Contact Us", icon: "help", path: "/contact" },
  ];

  return (
    <div className="flex items-center w-10/12 md:w-7/12 justify-end h-full rounded-sm">
      {buttons.map((btn, index) => (
        <button
          key={btn.label}
          onClick={() => handleNavigate(btn.path)}
            onMouseEnter={() => {
                setOriginSide('left'); // entering → expand from left
                setHoveredIndex(index);
            }}
            onMouseLeave={() => {
                setOriginSide('right'); // leaving → shrink toward right
                setHoveredIndex(null);
            }}
          className="relative overflow-hidden h-full flex-grow flex items-center justify-center p-2 cursor-pointer transition-colors duration-150 ease-in-out"
        >
          {/* animated background */}
          <span
            className={`absolute inset-0 bg-gray-700 transition-transform duration-300 ease-in-out`}
            style={{
              transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
            //   transformOrigin: hoveredIndex === index ? 'left' : 'right',
            transformOrigin: originSide, // use tracked origin
            }}
          />
          {/* button content */}
          <span className="relative z-10">{renderContent(btn.label, btn.icon)}</span>
        </button>
      ))}
    </div>
  );
};

export default NavOptions;


















// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// const NavOptions = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [zoomLevel, setZoomLevel] = useState(100); // Default to 100%
//     const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         const updateZoomAndWidth = () => {
//             const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
//             setZoomLevel(zoom);
//             setScreenWidth(window.innerWidth);
//         };

//         updateZoomAndWidth(); // Initial check
//         window.addEventListener('resize', updateZoomAndWidth);

//         return () => {
//             window.removeEventListener('resize', updateZoomAndWidth);
//         };
//     }, []);


//     useEffect(() => {
//         const updateZoom = () => {
//             const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
//             setZoomLevel(zoom);
//         };

//         updateZoom(); // Initial check
//         window.addEventListener('resize', updateZoom);

//         return () => {
//             window.removeEventListener('resize', updateZoom);
//         };
//     }, []);

//     const handleHomeClick = () => {
//         if ( location !== "/tribe" ) {
//             navigate("/tribe");
//         }
//     }

//     const handlePremiumClick = () => {
//         if ( location !== "/premium" ) {
//             navigate("/premium");
//         }
//     }


//     const hoverStyle = "text-white hover:text-yellow-400";

//     const renderContent = (text, IconName) => {
//         // 👇 Only icons on small screens (mobile < 768px)
//         if (screenWidth < 768) {
//             return <i className={`${hoverStyle} material-icons transition-colors duration-400 ease-in-out `}>{IconName}</i>;
//         }
//         // 👇 Icons or text on larger screens based on zoom level
//         if (zoomLevel <= 67) {
//             return <span className={`${hoverStyle} transition-colors duration-400 ease-in-out `}>{text}</span>;
//         } else {
//             return <i className={`${hoverStyle}   material-icons transition-colors duration-400 ease-in-out `}>{IconName}</i>;
//         }
//     };

//     const handleAboutClick = () => {
//         if ( location !== "/about-us" ) {
//             navigate("/about-us")
//         }
//     }

//     const handleContactUsClick = () => {
//         if ( location !== "/contact" ) {
//             navigate("/contact");
//         }
//     }


//     return (
//         <div className="flex items-center w-10/12 md:w-7/12 justify-end h-full rounded-sm" >
//             <button 
//                 className=" hover:bg-gray-700 
//                             active:bg-black 
//                             h-full 
//                             flex-grow
//                             flex 
//                             items-center
//                             justify-center
//                             p-2 
//                             cursor-pointer
//                             transition-colors 
//                             duration-150 
//                             ease-in-out" 
//                 onClick={handleHomeClick}
//             >
//                 {renderContent("Home","home")}

//             </button>
//             <button 
//                 className=" hover:bg-gray-700 
//                             active:bg-black 
//                             h-full 
//                             flex-grow
//                             flex 
//                             items-center
//                             justify-center
//                             p-2 
//                             cursor-pointer
//                             transition-colors 
//                             duration-150 
//                             ease-in-out"  
//                 onClick={handlePremiumClick}
//             >
//                 {renderContent("Premium","diamond")}
//             </button>
//             <button
//                 className=" hover:bg-gray-700 
//                             active:bg-black 
//                             h-full 
//                             flex-grow
//                             flex 
//                             items-center
//                             justify-center
//                             p-2 
//                             cursor-pointer
//                             transition-colors 
//                             duration-150 
//                             ease-in-out"  
//                 onClick={handleAboutClick}
//             >
//                 {renderContent("About","info")}
//             </button>
//             <button
//                 className=" hover:bg-gray-700 
//                             active:bg-black 
//                             h-full 
//                             flex-grow
//                             flex 
//                             items-center
//                             justify-center
//                             p-2 
//                             cursor-pointer
//                             transition-colors 
//                             duration-150 
//                             ease-in-out" 
//                 onClick={handleContactUsClick}
//             >
//                 {renderContent("Contact Us","help")}
//             </button>
//         </div>
//     )
// }

// export default NavOptions