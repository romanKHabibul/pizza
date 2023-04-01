import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface IProduct {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    count?: number;
}

interface IState {
    pizzas: IProduct[]
}

const initialState: IState = {
    pizzas: [

    ],
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<IProduct[]>){
            state.pizzas = action.payload
        }
    }
})

export const {setPizzas} = pizzaSlice.actions
export default pizzaSlice.reducer