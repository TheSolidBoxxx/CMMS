import React from 'react'
import { Outlet } from "react-router-dom"
import SideBar from './SideBar'
import TopBar from './TopBar'
import "./SideBar.css"

export default function Layout() {
  return (
    <>
    <div className="top-nav"> <div className="top-nav-sticky-container"><TopBar/></div> </div>
    <div id='box'></div>
    <div style={{display: 'flex'}}>
      <div className="side-nav"> <div className="side-nav-sticky-container"><SideBar/></div> </div>
        
        <main className='content-box'>                
            <Outlet />
        </main>
    </div>
    </>
  )
}
