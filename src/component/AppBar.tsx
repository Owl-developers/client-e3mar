import React, { useContext } from "react";
import Menu from '@mui/icons-material/Menu'

import '../css/appBar.css'

import avatar from '../images/avatar.png'
import { SideBarContext } from "../App";

export default function AppBar():React.ReactElement {
    const {sideBarOpen,setSideBarOpen, widthScreen} = useContext(SideBarContext)
    return (
        <>
            <div className="app-bar">

                <div className="user-info">
                    <div className="user-info-avatar">
                        <img src={avatar} alt="user avatar" />
                    </div>  
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
                {widthScreen < 768 ?<div onClick={()=> setSideBarOpen(!sideBarOpen)} className="burger-menu">
                    <Menu />
                </div>: null}
                
            </div>
        </>
    )
}
