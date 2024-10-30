import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  const { authUser } = useSelector((store) => store.user);
  const {socket} = useSelector(store=>store.socket);

  useEffect(() => {
    if (authUser) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: authUser?.userId,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on('onlineUsers', (onlineUsers)=>{
        if(onlineUsers !== undefined){
        dispatch(setOnlineUsers(onlineUsers));
        }
      });
      
      return () => {
        socketio.close(); // Ensure cleanup to prevent multiple listeners
      };
    }else{
      if(socket){
        socket.close();   
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
