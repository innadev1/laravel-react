import { initialState } from '../state/initialState'

export const appReducer = (state= initialState.app) => { return state }

export const userReducer = (state= initialState.currentUser, action) => {
    switch (action.type) {
        case "CHANGE_VALUE":
            return action.data
        case "CHANGE_INPUT":
            return {...state, [action.name]: action.value}
        default:
            return state;
    }
}

export const calendarReducer = (state= initialState.events, action) => {
    switch (action.type) {
        case "SET_CALENDAR_EVENTS":
            return action.data
        default:
            return state;
    }
}

export const brandsFullViewReducer = (state= initialState.brands, action) => {
    switch (action.type) {
        case "SET_FULL_BRANDS":
            return action.data
        default:
            return state;
    }
}

export const formReducer = (state= initialState.form, action) => {
    switch (action.type) {
        case "SET_FORM_EVENT":
            return action.data
        default:
            return state;
    }
}

export const brandsListReducer = (state= initialState.brandsList, action) => {
    switch (action.type) {
        case "SET_LIST_BRANDS":
            return action.data
        default:
            return state;
    }
}

export const domainsListReducer = (state= initialState.domainsList, action) => {
    switch (action.type) {
        case "SET_LIST_DOMAINS":
            return action.data
        default:
            return state;
    }
}

export const languagesListReducer = (state= initialState.languagesList, action) => {
    switch (action.type) {
        case "SET_LIST_LANGUAGES":
            return action.data
        default:
            return state;
    }
}

export const productsListReducer = (state= initialState.productsList, action) => {
    switch (action.type) {
        case "SET_LIST_PRODUCTS":
            return action.data
        default:
            return state;
    }
}

export const segmentsListReducer = (state= initialState.segmentsList, action) => {
    switch (action.type) {
        case "SET_LIST_SEGMENTS":
            return action.data
        default:
            return state;
    }
}
