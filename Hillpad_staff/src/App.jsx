// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
            <Sidebar />
        </div>
      </div>
    </>
  )
}

export default App
