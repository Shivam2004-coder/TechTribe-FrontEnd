import React from 'react'
import UserAvatar from './UserAvatar'
import ProfileEdit from './ProfileEdit'
import Preview from './Preview'
import Notice from './Notice'

const Options = () => {
  return (
    <div className="w-full h-full bg-gray-500 opacity-85" >
        <UserAvatar />
        <ProfileEdit />
        <Preview />
        <Notice />
    </div>
  )
}

export default Options