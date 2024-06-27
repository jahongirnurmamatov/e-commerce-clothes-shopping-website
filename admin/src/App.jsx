import React from 'react'
import Navbar from './components/navbar/Navbar'
import Admin from './pages/admin/Admin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
      <ToastContainer />
    </div>
    
  )
}

export default App