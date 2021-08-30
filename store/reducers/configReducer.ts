
import { AnyAction } from "redux";
import Banner from "../../types/Banner";
import FriendLink from "../../types/FriendLink";
import Seo from "../../types/Seo";
import VodType from "../../types/VodType";

export interface ConfigState {
    theme: string,
    typeList: VodType[],
    seo: Seo | undefined,
    friendLinks: FriendLink[],
    banners: Banner[],
    showLogin: boolean
}

const initState: ConfigState = {
    theme: 'dark',
    typeList: [],
    seo: undefined,
    friendLinks: [],
    banners: [],
    showLogin: false
}

const reducer = (state: ConfigState = initState, action: AnyAction) => {
    switch (action.type) {
        case 'SET_THEME':
            return { ...state, theme: action.payload }
        case 'SET_TYPES':
            return { ...state, typeList: action.payload }
        case 'SET_SEO':
            return { ...state, seo: action.payload }
        case 'SET_LINKS':
            return { ...state, friendLinks: action.payload }
        case 'SET_BANNERS':
            return { ...state, banners: action.payload }
        case 'SET_LOGIN_MODAL':
            return { ...state, showLogin: action.payload }
        default:
            return state
    }
}

export default reducer