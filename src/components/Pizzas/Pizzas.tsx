import React, { useState } from 'react'
import cl from "./Pizzas.module.css"
import Card from './Card'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { nextPage, prevPage } from '../../redux/slices/sortSlice';

interface PizzasProps {
  load: boolean;
}

const Pizzas: React.FC<PizzasProps> = ({load}) => {

  const {pizzas} = useAppSelector(state => state.pizzas)
  const {page} = useAppSelector(state => state.sorts)
  const dispatch = useAppDispatch()
  
  if(load){
    return <h3 className={cl.title}>Загрузка</h3>
  }

  function next(){
    dispatch(nextPage())
  }

  function prev(e: any){
    e.preventDefault()
    dispatch(prevPage())
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  }

  return (
    <div className={cl.prod}>
        <div className={cl.prodItems}>
            <h2 className={cl.title}>
                Все пиццы
            </h2>
            <div className={cl.pizzas}>
              {pizzas?.length ? pizzas.map(pizza => 
                <Card {...pizza} key={pizza.id}/>
              )
              :
                <h3 className={cl.title} style={{color: "red"}}>Не удалось загрузить пиццы</h3>
              }
            </div>
            {!load &&
            <div className={cl.pagination}>
              <button disabled={page <= 1} onClick={prev} className={cl.pagination}>
                Назад
              </button>
              <button disabled={page >= pizzas.length} onClick={next} className={cl.pagination}>
                Вперёд
              </button>
            </div>
            }
        </div>
    </div>
  )
}

export default Pizzas
