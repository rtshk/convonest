import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';

const useSocketMessage = () => {
    const {messages} = useSelector(store=>store.messages);
    const {currentUser} = useSelector(store=>store.user)
    const {socket} = useSelector(store => store.socket);
    const dispatch = useDispatch();
    useEffect(()=>{
        socket.on('newMessage', (newMessage)=>{
            if(newMessage?.senderId === currentUser?._id){
                console.log("hook runs")
                dispatch(setMessages([...messages,newMessage]));
            }
        })
        return ()=>{
            socket?.off("newMessage");
        }
    },[currentUser, dispatch, messages])
}

export default useSocketMessage