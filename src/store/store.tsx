import { configureStore, } from '@reduxjs/toolkit';
import allreducers from './reducers'

function loadState() {
    const state = localStorage.getItem('state')
    if(state !== null && state.length > 0) {
        return JSON.parse(state)
    }
    return undefined
}

function saveState(state: any) {
    localStorage.setItem('state', JSON.stringify(state))
}

const store = configureStore({reducer: allreducers,preloadedState: loadState(), devTools:true})
// const store = createStore(allreducers, loadState())
store.subscribe(()=> {
    saveState(store.getState())
})

export default store