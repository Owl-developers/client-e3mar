import React, { createContext, useEffect, useState, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import AppBar from './component/AppBar';
import NavBar from './component/NavBar';

import logo from './images/avatar.png'

export const SideBarContext = createContext({
  sideBarOpen: false, 
  widthScreen:window.innerWidth,  
  setSideBarOpen:(status: boolean)=> {},
  setWidthScreen: (width: number)=>{}
})

function App():React.ReactElement {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)
  const [widthScreen, setWidthScreen] = useState<number>(window.innerWidth)
  useEffect(() => {
    console.log('app')
  }, [])

  return (
    <SideBarContext.Provider value={{sideBarOpen,widthScreen, setSideBarOpen, setWidthScreen}}>
    <div className="app-container">
      <AppBar/>
      <SideBar/>
      <main className='main-content'>
        awd
        <Outlet/>
      </main>
    </div>
    </SideBarContext.Provider>
  )
}

function SideBar(): React.ReactElement | null {

  const {sideBarOpen, widthScreen, setWidthScreen} = useContext(SideBarContext)
  
  useEffect(() => {
    console.log('sideBarOpen', sideBarOpen)
  }, [sideBarOpen])

  window.onresize = (e => {
    setWidthScreen(
       window.innerWidth
    )
  })

  useEffect(() => {
    console.log(window.innerWidth)
    if(sideBarOpen && widthScreen < 769) {
      document.getElementById("aside")?.classList.add('sidebar-open')
    }
  }, [widthScreen])
  useEffect(() => {
    if(sideBarOpen && widthScreen < 769) {
      setTimeout(() => {
        document.getElementById("aside")?.classList.add('sidebar-open')
        
      }, 1);
    }
  }, [sideBarOpen])

  if (widthScreen < 769 && !sideBarOpen) {
    return null;
  }

  return(
    <>
    <aside id='aside' className={`sidebar`}>
      <div className="sidebar-header">
        <img src={logo} alt="e3mar logo" />
        <div className="sidebar-app-name">
          <h1>E3mar</h1>
        </div>
      </div>
      <NavBar/>
    </aside>
    </>
  )
}

export default App