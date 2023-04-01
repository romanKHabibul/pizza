import React from 'react'
import cl from "./Cart.module.css"
import CartCard from './CartCard'
import {Link} from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { clearAll } from '../../redux/slices/cartSlice'

const Cart: React.FC = () => {

    const dispatch = useAppDispatch()
    const {cartItems} = useAppSelector(state => state.carts)

    function clear(){
        dispatch(clearAll())
    }

    const totalPrice = cartItems.reduce((sum,item) => {
        return sum + Number(item.count) * item.price
    }, 0)

    const totalCount = cartItems.reduce((count,item) => {
        return count + Number(item.count)
    }, 0) 

    return (
        <div className={cl.cart}>
                {cartItems.length 
                ?
                <div className={cl.cartItems}>
                    <div className={cl.top}>
                        <h2 className={cl.title}>
                            <span style={{marginRight: 18}} className="material-symbols-outlined">
                            shopping_cart
                            </span> 
                            Корзина
                        </h2>
                        <button onClick={clear} className={cl.clearAll}>
                            <span style={{marginRight: 15}} className="material-symbols-outlined">
                            delete
                            </span>
                            Очистить корзину
                        </button>
                    </div>
                    <div className={cl.cards}>
                        {cartItems?.length && cartItems.map(item =>
                            <CartCard {...item} key={item.id}/>
                        )}
                    </div>
                    <div className={cl.footer}>
                        <div className={cl.total}>
                            <div className={cl.totalCount}>
                            Всего пицц: <b>{totalCount} шт.</b>
                            </div>
                            <div className={cl.totalPrice}>
                            Сумма заказа: <span>{totalPrice} ₽</span> 
                            </div>
                        </div>
                        <div className={cl.buttons}>
                            <Link to="/">
                            <button className={cl.back}>
                                <span style={{marginRight: 6}} className="material-symbols-outlined">
                                arrow_back_ios
                                </span>
                                Вернуться назад
                            </button>
                            </Link>
                            <button className={cl.confirm}>
                                Оплатить сейчас
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div className={cl.cartEmpty}>
                    <h2 className={cl.title}>
                        Корзина пустая 😕
                    </h2>
                    <p className={cl.text}>
                        Вероятней всего, вы не заказывали ещё пиццу.
                        Для того, чтобы заказать пиццу, перейди на главную страницу.
                    </p>
                    <img src="./image/empty.png" alt="empty" className={cl.empty} />
                    <Link to="/">
                    <button className={cl.backEmpty}>
                        Вернуться назад
                    </button>
                    </Link>
                </div>
                }
        </div>
    )
}

export default Cart
