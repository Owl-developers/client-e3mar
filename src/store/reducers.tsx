import { combineReducers } from "@reduxjs/toolkit";
import isLogged from "./slices/isLogged";
import languageApp from "./slices/languageApp";
import userData from "./slices/userData";

const allreducers = combineReducers({
    isLogged,
    languageApp,
    userData
})

export default allreducers