import {combineReducers, createStore} from 'redux'
import {
    userReducer,
    appReducer,
    calendarReducer,
    formReducer,
    brandsFullViewReducer,
    brandsListReducer,
    domainsListReducer,
    languagesListReducer,
    productsListReducer,
    segmentsListReducer
} from '../reducers'

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

export const store = createStore(
    combineReducers({
        appReducer,
        userReducer,
        calendarReducer,
        formReducer,
        brandsFullViewReducer,
        brandsListReducer,
        domainsListReducer,
        languagesListReducer,
        productsListReducer,
        segmentsListReducer
    }),
    persistedState
)

console.log("redux storage",store.getState());

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    console.log("redux storage update",store.getState());
})
