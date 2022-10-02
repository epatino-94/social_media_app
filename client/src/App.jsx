import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Create from './pages/Create'
import{
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom'
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { login, setViewport as actionViewport } from './reducers/appState';


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
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/profile/:name',
        element: <Profile />
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

  const [viewport, setViewport] = React.useState(window.innerWidth < 576 ? 'Mobile' : window.innerWidth < 769 ? 'Tablet' : 'Desktop')

  const dispatch = useDispatch();

  const handleResize = () => {
    window.innerWidth < 576 ? setViewport('Mobile') : window.innerWidth < 769 ? setViewport('Tablet') : setViewport('Desktop')
  }


  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  React.useEffect(()=>{
    dispatch(actionViewport({viewport:viewport}));
  },[viewport])




  return (
    <RouterProvider router={router} />
  )
}

export default App
