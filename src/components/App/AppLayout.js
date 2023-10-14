import React from 'react'
import SearchAppBar from "../SearchBar";
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
          < SearchAppBar />
          < Outlet />
    </div>
  )
}

export default AppLayout
