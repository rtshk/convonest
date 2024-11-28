import React, { useEffect, useRef } from 'react'
import Message from "./Message"

const MessageArea = ({currentUser, messages}) => {
  
  const bottomMessage = useRef(null);
  useEffect(()=>{
    bottomMessage.current?.scrollIntoView({behavior : 'smooth'});
  }, [messages])
  
  return (
    <div className='h-[580px] w-[100%]  bg-lightGray rounded-[20px] my-4 overflow-auto scrollbar- scrollbar-thin scrollbar-thumb-maroon scrollbar-track-customGray'>
      {messages?.map((message) => {
        return <Message key = {message?._id} message = {message} currentUser = {currentUser} />
       })}
       <div ref={bottomMessage}></div>
    </div>
  )
}

export default MessageArea