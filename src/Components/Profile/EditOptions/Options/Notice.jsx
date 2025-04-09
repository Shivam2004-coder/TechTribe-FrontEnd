import React from 'react'

const Notice = () => {
  return (
    <div className={`bg-amber-600 flex justify-between items-center p-4 h-15 rounded-lg cursor-pointer
      transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:bg-amber-800 `} >
        This is a notice !!
    </div>
  )
}

export default Notice