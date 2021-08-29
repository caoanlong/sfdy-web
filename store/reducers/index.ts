import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import configReducer, { ConfigState } from "./configReducer";
import memberReducer, { MemberState } from "./memberReducer";

export type State = {
    config: ConfigState,
    member: MemberState
}

const reducers = (state: State | undefined, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload
        default:
            const combineReducer = combineReducers({
                member: memberReducer,
                config: configReducer
            })
            return combineReducer(state, action)
    }
}

export default reducers