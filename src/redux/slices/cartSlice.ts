import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IProduct } from "./pizzaSlice"
import { getCartFromLS } from "../../utils/getLS";

export interface ICartItem extends IProduct{
    size: string;
    daugh: string
}

interface IState {
    cartItems: ICartItem[] 
}

const initialState: IState = {
    cartItems: getCartFromLS()
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<ICartItem>){
            const findItem = state.cartItems.find(item => item.title == action.payload.title && item.size == action.payload.size && item.daugh == action.payload.daugh)
            if(findItem){
                findItem.count !== undefined  && findItem.count < 9 ? 
                findItem.count++ :
                findItem.count = 1
            } else {
                state.cartItems.push({...action.payload, count: 1})
            }
        },
        removeFromCart(state, action: any){
            state.cartItems = state.cartItems.filter(item => item.title !== action.payload.title && item.size !== action.payload.size && item.daugh !== action.payload.daugh)
        },
        clearAll(state){
            state.cartItems = []
        },
        decrement(state, action: PayloadAction<number>){
            const findItem = state.cartItems.find(item => item.id == action.payload)
            if(findItem){
                findItem.count !== undefined && findItem.count > 1 ?
                findItem.count-- :
                findItem.count = 9
            }  
        }
    }
})

export const {addToCart, removeFromCart, clearAll, decrement} = cartSlice.actions
export default cartSlice.reducer