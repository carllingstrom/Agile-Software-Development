import React from 'react'
import "./App.css"
import Navbar from './components/Navbar.jsx';
import Forms from './components/Forms.jsx';




const App = () => {


  return (


    <>
    <div className='header'>
      <Navbar/>
    </div>

    <div className='main-content'>
      <Forms/>
    </div>

    </>

   
  )
}

export default App