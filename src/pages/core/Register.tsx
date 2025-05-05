import react from "react";

import { Link } from "react-router-dom"

import Build from "@mui/icons-material/Build"
import Username from "@mui/icons-material/Person"
import Password from "@mui/icons-material/Lock"

import "../../css/sign.css"

export default function Register() {
    return (
        <>
            <div className="sign-container">
                <div className="sign-background">
                    <div className="construction-overlay">
                        <Build />
                        <h2>Building The Future</h2>
                        <p>Efficient. Effective. Excellence.</p>
                    </div>
                </div>
                <div className="sign-card">
                    <div className="sign-header">
                        <div className="logo">
                            <Build />
                        </div>
                        <div className="app-name">
                            <h1>E3mar</h1>
                        </div>
                        <div className="description">
                            <p>Construction Management System</p>
                        </div>  
                    </div>
                    <div className="sign-form">
                        <div className="form-group">
                            <label htmlFor="username">
                                <Username />
                                Username
                                </label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                <Password />
                                Password
                                </label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button type="submit">Register</button>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
