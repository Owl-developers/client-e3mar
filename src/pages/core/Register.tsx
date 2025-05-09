import react from "react"

import { Link } from "react-router-dom"

import Build from "@mui/icons-material/Build"
import Username from "@mui/icons-material/Person"
import Password from "@mui/icons-material/Lock"
import Email from "@mui/icons-material/Email"
import Phone from "@mui/icons-material/Phone"
import CircularProgress from "@mui/material/CircularProgress"

import { gql, useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { setUserData } from "../../store/slices/userData"
import { setIsLogged } from "../../store/slices/isLogged"
import { lang } from "../../store/slices/languageApp"
import { useSelector } from "react-redux"
import RootState from '../../store/store'
import { useModalsContext } from "../../Root"
import { useState } from "react"
import en from "../../languages/en.json"
import ar from "../../languages/ar.json"

const registerMutation = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            username,
            email,
        }
    }
`

export default function Register() {
    const [register, { loading, error, reset,data }] = useMutation(registerMutation)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [errorInput, setErrorInput] = useState('')
    const [property, setProperty] = useState('')

    const { setMessage, setTitle, setOpen} = useModalsContext()

    const dispatch = useDispatch()
    var rootState = RootState.getState()
    const {languageApp} = useSelector((state:typeof rootState) => state)
    const translate = {
        en: en,
        ar: ar
    }
    const RegisterButton = translate[languageApp].buttons.register
    const inputLabels = translate[languageApp].inputLabels
    const inputPlaceholders = translate[languageApp].inputPlaceholders
    const navigate = translate[languageApp].navigate

    if (error) {
        if(error.graphQLErrors) {
            console.log('Error message:', error.graphQLErrors);
            if(error.graphQLErrors[0].message == 'error validation' && error.graphQLErrors[0].extensions?.message) {
                setProperty(error.graphQLErrors[0].extensions?.property as string)
                const message:Record<lang, any> = error.graphQLErrors[0].extensions.message as Record<lang, any>
                var msg: string = message[languageApp]
                setErrorInput(msg)
                reset()
                return
            }
            setOpen(true)
            if(error.graphQLErrors[0].extensions?.message) {
                setTitle('Error')
                const message:Record<lang, any> = error.graphQLErrors[0].extensions.message as Record<lang, any>
                var msg: string = message[languageApp]
                setMessage(msg)
            }
            setTimeout(() => {
                setOpen(false)
            }, 1000);
        }
        reset()
    }
    if(data) {
        console.log("register data",data)
        dispatch(setUserData(data.register))
        dispatch(setIsLogged(true))
        setOpen(true)
        setTitle('Success')
        setMessage('Register successful')
        setTimeout(() => {
            setOpen(false)
        }, 1000);
        reset()

    }
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
                                {inputLabels.username}
                                </label>
                            <input placeholder={inputPlaceholders.username} type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {property === "username" && <p className="input-error-message">{errorInput}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                <Password />
                                {inputLabels.password}
                                </label>
                            <input placeholder={inputPlaceholders.password} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {property === "password" && <p className="input-error-message">{errorInput}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">
                                <Email />
                                {inputLabels.email}
                                </label>
                            <input placeholder={inputPlaceholders.email} type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {property === "email" && <p className="input-error-message">{errorInput}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">
                                <Phone />
                                {inputLabels.phone}
                                </label>
                            <input placeholder={inputPlaceholders.phone} type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {property === "phone" && <p className="input-error-message">{errorInput}</p>}
                        </div>
                        <button onClick={() => register({ variables: { input: { username, password, email, phone } } })}>
                            {RegisterButton}
                            {loading && <CircularProgress size={20} style={{marginLeft: '10px', color: 'white'}} />}
                        </button>
                        <p><Link to="/login">{navigate.register}</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
