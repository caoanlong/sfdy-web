import {createStore, applyMiddleware, Middleware} from 'redux'
import thunk from 'redux-thunk'
import {createWrapper, Context} from 'next-redux-wrapper'
import reducers from './reducers'


const bindMiddleware = (middleware: Middleware<any, any, any>[]) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension")
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const makeStore = (context: Context) => {
    const isServer = typeof window === 'undefined'
    if (isServer) return createStore(reducers, bindMiddleware([thunk]))
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default
    const persistConfig = {
        key: 'jyav',
        // whitelist: ['reducer'], // make sure it does not clash with server keys
        storage
    }
    const persistedReducer = persistReducer(persistConfig, reducers)
    const store: any = createStore(persistedReducer, bindMiddleware([thunk]))
    store.__persistor = persistStore(store)
    return store
}

export type RootState = ReturnType<typeof reducers>

export const wrapper = createWrapper(makeStore)