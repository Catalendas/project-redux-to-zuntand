import { configureStore } from "@reduxjs/toolkit"; 
import {useSelector, TypedUseSelectorHook, useDispatch} from "react-redux"
import { player } from "./slices/player";

// Informações que vão ser compartilhadas
export const store = configureStore({
    reducer: {
        player
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch