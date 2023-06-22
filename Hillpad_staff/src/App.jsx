// import { useState } from 'react'

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
import './assets/vendor/libs/apex-charts/apexcharts.js'
// Main JS
import './assets/js/main.js';
// ------------------------------------------------------------------------------

import Sidebar from './components/Sidebar.jsx';
import MainBody from './components/MainBody';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
            <Sidebar />
            <MainBody />
        </div>
      </div>
    </>
  )
}

export default App
