import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState } from 'react'; 
import './App.css'
import Home from './pages/Home/components/Home'
import About from './pages/About/components/About'
import Login from './pages/Login/components/Login'
import Sign from './pages/Sign/components/Sign'
import Products from './pages/Products/components/Products';
import Profile from './pages/Profile/components/Profile'
import Sales from './pages/Sales/components/Sales'
import NotFound from './pages/NotFound/NotFound'
import Root from  './routes/Root'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './auth/ProtectedRoutes'
import UnProtectedRoutes from './auth/UnProtectedRoutes'
import UserContextProvider from './context/User';
import ForgetPassword from './pages/ForgetPassword/components/ForgetPassword';



function App() {

  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Root/>,
      children :[
        {
          path: "*",
          element:  <NotFound/>, 
        },
  
        {
          path: "/",
          element: <Home />,
        },
  
        {
          path: "/about",
          element: <About />,
        },
      
        {
          path: "/login",
          element:
             <Login />,
        },
  
        {
          path: "/profile/:id",
          element:
          (
            <ProtectedRoutes>
             <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/SignUp",
          element:<Sign/>,
        },
        {
          path:"/products/:id", 
          element:<Products/>
        },
        {
          path:"//forgetPassword", 
          element:<ForgetPassword />
        },
        {
          path:"/sales", 
          element:
          (
            <ProtectedRoutes>
             <Sales/>
            </ProtectedRoutes>
          ),
        }
      ]
    },
  
   
  ]);

   return (
  
    <> 
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    

    <ToastContainer />
    </>
  
  
  );
}
export default App;
