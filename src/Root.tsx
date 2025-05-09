import { createContext, useContext, useEffect, useState } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import  Main  from "./Main";

import  Login  from "./pages/core/Login";
import Register from "./pages/core/Register";

import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";
import { useDispatch, useSelector } from "react-redux";
import  RootState  from "./store/store";
const ModalsContext = createContext({message: '', title: '', open: false, setMessage: (message: string) => {}, setTitle: (title: string) => {}, setOpen: (open: boolean) => {}})

export function useModalsContext() {
    return useContext(ModalsContext);
}
interface IProtectRout {
    children: React.ReactElement
}
function ProtectUserRout() {
    var rootState = RootState.getState()
    const {isLogged, userData} = useSelector((state: typeof rootState) => state)
    const isSuperAdmin = userData.isSuperAdmin
    if(!isLogged) {
        return <Navigate to='/login' />
    }
    if(isLogged && !isSuperAdmin) {
        return <Outlet/>
    }
    if(isLogged && isSuperAdmin) {
        return <Navigate to='/admin' />
    }
}
function ProtectAdminRout() {
    var rootState = RootState.getState()
    const {isLogged, userData} = useSelector((state: typeof rootState) => state)
    const isSuperAdmin = userData.isSuperAdmin
    console.log("ProtectAdminRout")
    console.log({isSuperAdmin, isLogged})

    if(!isLogged) {
        return <Navigate to='/login' />
    }
    if(isLogged && isSuperAdmin) {
        return <Outlet/>
    }
    if(isLogged && !isSuperAdmin) {
        return <Navigate to='/user' />
    }
}
function ProtectSignRout() {
    var rootState = RootState.getState()
    const {isLogged, userData} = useSelector((state: typeof rootState) => state)
    const isSuperAdmin = userData.isSuperAdmin
    if(isLogged && isSuperAdmin) {
        return <Navigate to='/admin' />
    }
    if(isLogged && !isSuperAdmin) {
        return <Navigate to='/user' />
    }
    return <Outlet/>
}

var x = 0
export default function Root() {

    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    var rootState = RootState.getState()
    const {userData, languageApp} = useSelector((state: typeof rootState) => state)
    console.log("userdata", userData.isSuperAdmin)

    useEffect(() => {
        if (languageApp === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        x++
        console.log('root')
        console.log(x)
    }, [])
    return(
        <ModalsContext.Provider value={{message, title, open, setMessage, setTitle, setOpen}}>
            <HashRouter>
                <Routes>

                    <Route path="/" element={<Main />}>
                        <Route element={<ProtectSignRout/>}>
                            <Route path="/login" element={<Login />} />
                        </Route>
                        <Route element={<ProtectSignRout/>}>
                            <Route path="/register" element={<Register />} />
                        </Route>

                        <Route element={<ProtectAdminRout/>}>
                            <Route path="/admin" element={<Admin />}>
                                
                            </Route>
                        </Route>
                            
                        <Route element={<ProtectUserRout/>}>
                            <Route path="/user" element={<User />}>

                            </Route>
                        </Route>

                    </Route>
                </Routes>
            </HashRouter>
        </ModalsContext.Provider>
    )
}
