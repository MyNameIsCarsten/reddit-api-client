// General imports
import React from 'react'

// Component imports
import SearchAppBar from "../App/SearchBar/SearchBar";
import { Outlet } from 'react-router-dom'


// CSS import
import './applayout.css'

const AppLayout = () => {
  return (
    <div id='applayout'>
      < SearchAppBar />
     
          < Outlet />
    </div>
  )
}

export default AppLayout
