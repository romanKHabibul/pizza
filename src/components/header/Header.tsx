import React, { useEffect, useRef } from 'react'
import cl from "./Header.module.css"
import {Link, useLocation} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setSearch } from '../../redux/slices/sortSlice'

const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const {search} = useAppSelector(state => state.sorts)
    const {cartItems} = useAppSelector(state => state.carts)
    const isMounted = useRef(false)
    const location = useLocation()

    const totalPrice = cartItems.reduce((sum,item) => {
        return sum + Number(item.count) * item.price
    }, 0)

    const totalCount = cartItems.reduce((count,item) => {
        return count + Number(item.count)
    }, 0) 

    useEffect(() => {
        if(isMounted.current){
            const json = JSON.stringify(cartItems)
            localStorage.setItem('cart',json)
        }
        isMounted.current = true
    },[cartItems])


    return (
        <header className={cl.header}>
                <div className={cl.headerItems}>
                    <div className={cl.left}>
                        <Link to="/">
                        <img className={cl.img} src="./image/logo.png" alt="pizzas" />
                        </Link>
                        <div className={cl.inf}>
                            <h2 className={cl.title}>
                            REACT PIZZA
                            </h2>
                            <p className={cl.text}>
                            самая вкусная пицца во вселенной
                            </p>
                        </div>
                    </div>
                    {location.pathname =="/" &&
                    <div className={cl.search}>
                        <img className={cl.lupa} src="./image/lupa.png" alt="search" />
                        <input value={search} onChange={(e) => dispatch(setSearch(e.target.value))} type="text" placeholder="Поиск..."/>
                        {search &&
                        <img onClick={() => dispatch(setSearch(''))} className={cl.remove} src="./image/remove.png" alt="remove" />
                        }
                    </div>
                    }
                    <Link to="/cart">
                    {location.pathname == "/"
                    ?
                    <div className={cl.right}>
                        <button className={cl.buttonPrice}>
                            {totalPrice} ₽
                        </button>
                        <button className={cl.buttonCount}>
                            <span className="material-symbols-outlined">
                            shopping_cart
                            </span>
                            {totalCount}
                        </button>
                    </div>
                    :
                    <div></div>
                    }
                    </Link>
                </div>
        </header>
    )
}

export default Header
