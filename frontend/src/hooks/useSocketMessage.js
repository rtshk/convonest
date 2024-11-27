import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import {Howl} from "howler";
import { toast } from 'react-toastify';


const useSocketMessage = () => {
    const {messages} = useSelector(store=>store.messages);
    const {currentUser} = useSelector(store=>store.user)
    const {socket} = useSelector(store => store.socket);
    const dispatch = useDispatch();
    const notificationSound = new Howl({src : ['/notification.wav'],});
    useEffect(()=>{
        if(socket){
            socket.on('newMessage', (newMessage, sender)=>{            
                if(newMessage?.senderId === currentUser?._id){
                    dispatch(setMessages([...messages,newMessage]));
                }else{
                    notificationSound.play();
                    toast.info(`${sender.username} sent a new message`)
                }
            })
        }
        return ()=>{
            socket?.off("newMessage");
        }
    },[currentUser, dispatch, messages])
}

export default useSocketMessage