// ==============================================================================
// CSS Files
// ==============================================================================
// Core CSS
import './assets/vendor/css/core.css';
import './assets/vendor/css/theme-default.css';
import './assets/css/demo.css';
// Vendors CSS
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
// Boxicon CSS
import './assets/vendor/fonts/boxicons.css';
// Quill CSS
import 'react-quill/dist/quill.snow.css';
// App CSS
import './App.css';
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

import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/common/RequireAuth';
import LoginForm from './components/LoginForm';
import ProtectedRoutes from './ProtectedRoutes';


export default function App() {

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


