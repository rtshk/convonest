import React from 'react';
import ChatItem from './ChatItem';
import useChatItems from '../../hooks/useChatItems';
import { useSelector } from 'react-redux';
import useSearchedUser from '../../hooks/useSearchedUser';

const ChatList = () => {
  useSearchedUser();
  useChatItems();
  const {chatItems, searchedUser, searchedUserList} = useSelector(store => store.user);

  if(!chatItems || !searchedUserList) return;

  return (
    <>
    {searchedUser == ""? (    <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center pr-2 scrollbar-thin scrollbar-thumb-maroon scrollbar-track-lightGray">
      {chatItems?.map((chatItem)=>{
        return (<ChatItem key = {chatItem._id} chatItem = {chatItem} />)
      })}
    </div>) : (<div className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center pr-2 scrollbar-thin scrollbar-thumb-maroon scrollbar-track-lightGray">
      {searchedUserList?.map((chatItem)=>{
        return (<ChatItem key = {chatItem._id} chatItem = {chatItem} />)
      })}
    </div>)}</>
  );
};

export default ChatList;
