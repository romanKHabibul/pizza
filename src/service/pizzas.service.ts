import axios from "axios"
import { IProduct } from "../redux/slices/pizzaSlice"

const API_URL = "https://640855c62f01352a8a8ff077.mockapi.io"
axios.defaults.baseURL = API_URL


export const ProductService = {
    async getAllPizzas(currentFilter: string, limit: number, page: number, search: string){
        const param = currentFilter == "Все" ? '': currentFilter
        const title = search ? search : ''
        const addTitle = title && `title=${title}&`
        
        return axios.get<IProduct[]>(`/pizzas?${addTitle}limit=${limit}&page=${page}&param=${param}`)
    }
}