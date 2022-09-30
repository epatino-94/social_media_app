import { Navigate,Outlet } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
const Layout = () => {
    return(
      <>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </>
    )
  }

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <Layout/> : <Navigate to={'/login'}/>,
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
  ];
  
  export default routes;