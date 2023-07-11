import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';
import userService from './services/api/userService';

// ==============================================================================
// CSS Files
// ==============================================================================
// Boxicon CSS
import './assets/vendor/fonts/boxicons.css';
// Core CSS
import './assets/vendor/css/core.css';
import './assets/vendor/css/theme-default.css';
import './assets/css/demo.css';
// Vendors CSS
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
// App CSS
import './App.css'
// -----------------------------------------------------------------------------

// ==============================================================================
// JS Files
// ==============================================================================
// Helpers JS
import './assets/vendor/js/helpers.js';
// Template config JS
import './assets/js/config.js';
// Core JS
import './assets/vendor/libs/jquery/jquery.js';
import './assets/vendor/libs/popper/popper.js';
import './assets/vendor/js/bootstrap.js';
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js';
import './assets/vendor/js/menu.js';
// Vendors JS
import './assets/vendor/libs/apex-charts/apexcharts.js';
// Main JS
import './assets/js/main.js';
// ------------------------------------------------------------------------------

import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/common/RequireAuth';
import ProtectedRoutes from './ProtectedRoutes';

import LoginForm from './components/LoginForm';


export default function App() {
  // const [user, setUser] = useState({});
  let auth = useAuth();

  // useEffect(() => {
  //   async function userDetail() {

  //     if (!auth.user) {
  //         // Redirect them to the /login page, but save the current location they were
  //         // trying to go to when they were redirected. This allows us to send them
  //         // along to that page after they login, which is a nicer user experience
  //         // than dropping them off on the home page.
  //         try {
  //             const { data } = await userService.getUser();
  //             auth.setUser(data);
  //         } catch (ex) {
  //             console.log(ex);
              
  //         }
  //     }
  //   }
  //   userDetail();
  // });
  
  
  
  

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <ProtectedRoutes />
            </RequireAuth>
          }
        />
          
      </Routes>
      
    </AuthProvider>
  )
}


