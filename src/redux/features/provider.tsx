"use client"

import { ReactNode } from "react"
import { store } from "../store"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';


export function ReduxProvider({children}:{children:React.ReactNode}){
    let persistor=persistStore(store)
    return <Provider store={store}><PersistGate persistor={persistor}>{children}</PersistGate></Provider>
}