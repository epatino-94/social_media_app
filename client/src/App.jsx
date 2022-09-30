import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import{
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom'
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { login } from './reducers/appState';


const Layout = () => {

  const [currentUser,setCurrentUser] = React.useState(JSON.parse(localStorage.getItem('userdata')) || null);
  const dispatch = useDispatch();
  if(!currentUser) return <Navigate to={'/login'}/>


  useEffect(()=>{
    dispatch(login(currentUser))
  },[currentUser])

  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <Home />,
      }
    ]
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
