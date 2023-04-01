import { configureStore} from "@reduxjs/toolkit";
import sorts from "./slices/sortSlice"
import pizzas from "./slices/pizzaSlice"
import carts from "./slices/cartSlice"
import {useSelector, useDispatch, TypedUseSelectorHook} from "react-redux"

export const store = configureStore({
    reducer: {
        sorts,
        pizzas,
        carts
    }
})

type RootStore = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
