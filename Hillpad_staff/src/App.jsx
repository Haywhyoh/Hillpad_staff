import { useEffect, useState } from 'react';

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

import ProtectedRoutes from './ProtectedRoutes';

import LoginForm from './components/LoginForm';


function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState({});

  useEffect(() => {
    async function userDetail() {
      try {
        const response = await userService.getUser();
        setUser(response.data);
      } catch (ex) {
        if (ex.response.status === 400 || ex.response.status === 401 || ex.response.status === 403) {
          setUser({});
        }
      }
    }
    userDetail();
  });

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/*" element={<ProtectedRoutes user={user} />} />
      </Routes>
      
    </>
  )
}

export default App
