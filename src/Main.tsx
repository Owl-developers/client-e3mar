import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import  RootState  from "./store/store"
import { useQuery, useLazyQuery, gql, useApolloClient, useMutation } from "@apollo/client"
import { AlertModal } from "./component/Modals"
import { useModalsContext } from "./Root"
import { lang } from "./store/slices/languageApp"
import { setIsLogged } from "./store/slices/isLogged"
import { setUserData } from "./store/slices/userData"
import Rootstate from "./store/store"
const authQuery =gql `
    query auth {
        auth {
            username,isSuperAdmin
        }
    }
`
var x = 0
export default function Main() {
    var location = useLocation()
    const dispatch = useDispatch()
    const { setMessage, setTitle, setOpen} = useModalsContext()
    const [auth] = useLazyQuery(authQuery, {
        fetchPolicy: 'no-cache',
    });
    var rootState = RootState.getState()
    const {isLogged, languageApp,} = useSelector((state: typeof rootState) => state)

    async function checkAuth() {
        try {
            const {data, error, } = await auth()
            if (error) {
                console.log('=====')
                console.log({error})
                if(error.graphQLErrors) {
                    console.log('Error message:', error.graphQLErrors);
                    setOpen(true)
                    if(error.graphQLErrors[0].extensions?.message) {
                        setTitle('Error')
                        const message:Record<lang, any> = error.graphQLErrors[0].extensions.message as Record<lang, any>
                        var msg: string = String(message[languageApp])
                        setMessage(msg)
                    }
                    setTimeout(() => {
                        setOpen(false)
                    }, 1000);
                    if(error.graphQLErrors[0].extensions?.code !== "500") {
                        console.log('code', error.graphQLErrors[0].extensions?.code)
                        dispatch(setIsLogged(false))
                        dispatch(setUserData({}))

                        return; // Exit early if we have an error
                    }
                }

                return; // Exit early if we have an error
            }
            
            // Only process data if we don't have an error
            if(data) {
                console.log('data')
                console.log({data})
                dispatch(setUserData(data.auth))
                dispatch(setIsLogged(true))

            }
            
        } catch (error) {
            console.log("catch", error)

        }

        console.log('checkAuth')
    }
    useEffect(() => {
        console.log('main')
        x++
        console.log('x', x)
        if (isLogged) {
            checkAuth()
        }
    }, [location])
    return(
        <>
        <Outlet />
        <AlertModal/>
        </>
    )
}