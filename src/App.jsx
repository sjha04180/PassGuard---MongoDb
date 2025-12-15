import { useState } from 'react'

import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import './App.css'

function App() {


  return (
    <>
     <div className='relative'>

  <Navbar />

  <div className='min-h-[87vh]'>
    <Manager />
  </div>

  <div className="fixed bottom-0 left-0 w-full">
    <Footer />
  </div>

</div>


    </>
  )
}

export default App
