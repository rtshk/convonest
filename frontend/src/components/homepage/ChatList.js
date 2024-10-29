import React from 'react';
import ChatItem from './ChatItem';
import useChatItems from '../../hooks/useChatItems';
import { useSelector } from 'react-redux';

const ChatList = () => {

  useChatItems();
  const {chatItems} = useSelector(store => store.user);
  if(!chatItems) return;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center pr-2 scrollbar-thin scrollbar-thumb-maroon scrollbar-track-lightGray">
      {chatItems?.map((chatItem)=>{
        return (<ChatItem key = {chatItem._id} chatItem = {chatItem} />)
      })}
    </div>
  );
};

export default ChatList;
