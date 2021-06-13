import {createStore, AnyAction, Store, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import VodType from '../types/VodType'

export interface State {
    theme: string,
    typeList: Array<VodType>
}

const initState: State = {
    theme: 'dark',
    typeList: []
}

const reducer = (state: State = initState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload }
        case 'SET_THEME':
            return { ...state, theme: action.payload }
        case 'SET_TYPES':
            return { ...state, typeList: action.payload }
        default:
            return state
    }
}

const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<Store<State>>(makeStore)