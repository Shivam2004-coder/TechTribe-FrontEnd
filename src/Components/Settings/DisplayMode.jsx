import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayMode } from '../../utils/ReduxStore/profileSlice';
import useSaveImages from '../../CustomHooks/useSaveImages';
import { successMessage, errorMessage } from '../../utils/ShowMessage';
import { FaDesktop, FaMoon, FaSun } from 'react-icons/fa'; // Icons for modes

const DisplayMode = () => {
  const currentMode = useSelector((store) => store.profile.displayMode);
  const dispatch = useDispatch();
  const { handleSaveProfileClick } = useSaveImages();

  const [selectedMode, setSelectedMode] = useState(currentMode);
  const [loadingMode, setLoadingMode] = useState(null);

  const modes = [
    { name: 'System Default', icon: <FaDesktop /> },
    { name: 'Dark', icon: <FaMoon /> },
    { name: 'Light', icon: <FaSun /> }
  ];

  const handleModeChange = async (mode) => {
    try {
      setSelectedMode(mode);
      setLoadingMode(mode);
      dispatch(setDisplayMode(mode));
      await handleSaveProfileClick(null, null, null, null, mode);
      successMessage(`Display mode set to ${mode}`);
    } catch (err) {
      errorMessage(`Failed to save display mode: ${err.message}`);
    } finally {
      setLoadingMode(null);
    }
  };

  const getGradient = (mode) => {
    switch (mode) {
      case 'System Default':
        return 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900';
      case 'Dark':
        return 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900';
      case 'Light':
        return 'bg-gradient-to-r from-slate-100 via-white to-slate-200 text-black';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-full p-4 rounded-lg shadow-2xl backdrop-blur-xs">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-white mb-6 tracking-wide">
          Display Modes
        </h2>
        <div className="flex flex-col items-center justify-between">
          {modes.map(({ name, icon }) => {
            const isSelected = selectedMode === name;
            const isLoading = loadingMode === name;

            return (
              <button
                key={name}
                onClick={() => handleModeChange(name)}
                disabled={isLoading}
                className={`
                  w-full p-10 rounded-lg font-medium text-center m-2 md:m-5 flex items-center justify-start gap-2 relative overflow-hidden
                  transition-all duration-300
                  ${getGradient(name)}
                  ${isSelected ? 'border-6 border-slate-700' : 'border-2 border-transparent hover:border-slate-600'}
                  ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
                `}
              >
                <div className='bg-white h-7 w-7 rounded-full p-1 flex items-center justify-center shadow-black shadow-inner' > 
                  <div className={`${ isSelected ? "bg-amber-600" : "bg-transparent" } h-full w-full rounded-full `} >

                  </div>
                </div>
                <span className="flex items-center gap-2 z-10">
                  {icon} {name}
                </span>
                {isLoading && (
                  <span className="absolute left-0 top-0 w-full h-full shimmer rounded-lg z-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayMode;
