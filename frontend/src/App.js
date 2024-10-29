import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Homepage from "./components/homepage/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";



function App() {

  const router = createBrowserRouter([
    {
      path : "/",
      element:<Homepage/>
    },
    {
      path : "/login",
      element : <Login/>
    },
    {
      path : "/signup",
      element : <Signup/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
