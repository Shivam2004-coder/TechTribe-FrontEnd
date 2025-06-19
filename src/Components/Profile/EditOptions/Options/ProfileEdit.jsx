import React from 'react'
import { useDispatch } from 'react-redux'
import { OnlyShowEditPage } from '../../../../utils/ReduxStore/setSlice';

const ProfileEdit = () => {
  
  
  const dispatch = useDispatch();
  
  const handleProfileEditClick = () => {
    dispatch(OnlyShowEditPage());
  }

  return (
    <div 
      className={`bg-yellow-950 flex justify-between items-center p-4 h-15 rounded-lg cursor-pointer
        transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:bg-yellow-900 `}

      onClick={handleProfileEditClick}
    >
      This is a profile Edit page !!!
    </div>
  )
}

export default ProfileEdit