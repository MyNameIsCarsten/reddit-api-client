import React from 'react'
import SearchAppBar from "../SearchBar";
import { Outlet } from 'react-router-dom'
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
