import React from 'react'
import cl from "./CartCard.module.css"
import { IProduct } from '../../redux/slices/pizzaSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ICartItem, addToCart, decrement, removeFromCart } from '../../redux/slices/cartSlice'

interface CartCardProps extends ICartItem{}

const CartCard: React.FC<CartCardProps> = ({id,title,price,image,count, size, daugh, category}) => {

    const dispatch = useAppDispatch() 

    function remove(item:any){
        dispatch(removeFromCart(item))
    }   
    function plus(item: ICartItem){
        dispatch(addToCart(item))
    }
    function minus(id: number){
        dispatch(decrement(id))
    }

    return (
        <div className={cl.card}>
                <div className={cl.cardItems}>
                    <div className={cl.left}>
                        <img className={cl.img} src={image} alt="pizza" />
                        <div className={cl.inf}>
                            <h2 className={cl.title}>
                                {title}
                            </h2>
                            <h3 className={cl.text}>
                            {daugh} тесто, {size} 
                            </h3>
                        </div>
                    </div>
                    <div className={cl.counter}>
                        <img onClick={() => minus(id)} style={{marginRight: 12, cursor: 'pointer'}} src="./image/dec.png" alt="dec" />
                        {count}
                        <img onClick={() => plus({id,title,image,category,price,size,daugh})} style={{marginLeft: 12, cursor: 'pointer'}} src="./image/inc.png" alt="inc" />
                    </div>
                    <b className={cl.price}>
                        {price} ₽  
                    </b>
                    <img onClick={() => remove({title, size, daugh})} className={cl.remove} src="./image/remove.png" alt="remove" />
                </div>
        </div>
    )
}

export default CartCard
