// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// Boxicon CSS
import './assets/vendor/fonts/boxicons.css';

// Core CSS
import './assets/vendor/css/core.css';
import './assets/vendor/css/theme-default.css';
import './assets/css/demo.css';

// Vendors CSS
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';

// Helpers JS
import './assets/vendor/js/helpers.js';
// Template config JS
import './assets/js/config.js';

import './App.css'
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
