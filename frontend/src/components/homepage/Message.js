import React from 'react'

const Message = ({currentUser, message}) => {
  return (
    <div className={`my-3 mx-5 flex justify-${message.senderId === currentUser._id?"start" : "end"}`}>
        <p className='max-w-[300px] rounded-[20px] inline-block p-2 bg-beige text-black'>{message?.message}</p>
    </div>
  )
}

export default Message