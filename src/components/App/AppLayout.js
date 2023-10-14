import React from 'react'
import SearchAppBar from "../App/SearchBar/SearchBar";
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
