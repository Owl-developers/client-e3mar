import { HashRouter, Route, Routes } from "react-router-dom";
import  Main  from "./Main";

import  Login  from "./pages/core/Login";
import Register from "./pages/core/Register";

import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";


export default function Root() {
    return(
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin" element={<Admin />}>

                        </Route>
                        <Route path="/user" element={<User />}>

                        </Route>
                    </Route>
                </Routes>
            </HashRouter>
        </>
    )
}
