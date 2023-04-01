import { useState } from 'react'
import Header from './components/header/Header'
import Sort from './components/sorts/Sort'
import Pizzas from './components/Pizzas/Pizzas'
import Cart from './components/Cart/Cart'
import {Routes, Route} from "react-router-dom"
import { useAppDispatch, useAppSelector } from './redux/store'
import { useQuery } from 'react-query'
import {ProductService} from "./service/pizzas.service"
import { setPizzas } from './redux/slices/pizzaSlice'

const App: React.FC= () => {

  const dispatch = useAppDispatch()
  const {currentFilter, page, search} = useAppSelector(state => state.sorts)
  const limit: number = 8

  const {data, isLoading} = useQuery(
    ["pizza", currentFilter, page, limit, search],
    () => ProductService.getAllPizzas(currentFilter, limit, page, search),
    {
      onSuccess: ({data}) => {
        dispatch(setPizzas(data))
      },
      onError(er){
        console.log(er)
      },
      keepPreviousData: true
    }
  )


  return (
    <div className="App">
      <div className="container">
        <Header/>
        <Routes>
          <Route path="/" element={<>
            <Sort/>
            <Pizzas load={isLoading}/>
          </>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
