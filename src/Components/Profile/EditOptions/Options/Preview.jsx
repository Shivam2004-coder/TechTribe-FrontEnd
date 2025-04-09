import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OnlyShowPreviewPage } from "../../../../utils/ReduxStore/setSlice";

const Preview = () => {

  const showPreviewPage = useSelector((store) => store.set.showPreviewPage);

  const dispatch = useDispatch();
    
  const handlePreviewClick = () => {
    dispatch(OnlyShowPreviewPage());
  }

  return (
    <div 
      className={`bg-yellow-950 flex justify-between items-center p-4 h-15 rounded-lg cursor-pointer
        transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:bg-yellow-900 `}

      onClick={handlePreviewClick}
    >
      This is a preview page !!!

      { showPreviewPage ? 
        <div className="bg-white rounded-full h-9 w-2 font-extrabold" >
          
        </div>
        :
        <div className="bg-yellow-950 rounded-full h-6 w-2 font-extrabold " >
          
        </div>
      }
    </div>
  )
}

export default Preview