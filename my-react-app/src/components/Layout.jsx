import React from 'react'
import { Outlet } from "react-router-dom"
import SideBar from './SideBar'
import TopBar from './TopBar'
import "./SideBar.css"
import "./Layout.css"

export default function Layout() {
  return (
    <>
    <TopBar/>
    <div className="container">
      <div className="side-nav"> <div className="side-nav-sticky-container"> <SideBar/> </div> </div>
        
        <main className='main-content'>                
            <Outlet />
        </main>
    </div>
    </>
  )
}
