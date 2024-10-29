import React from 'react'
import { useSelector } from 'react-redux'

const Header = ({currentUser}) => {
  return (
    <div className='bg-maroon h-[60px] flex items-center rounded-[20px] py-2 px-4  '>
      <img className="h-full" src='https://avatar.iran.liara.run/public'/>
      <p className='text-beige text-[20px] mx-3'>{currentUser?.username}</p>
    </div>
  )
}

export default Header