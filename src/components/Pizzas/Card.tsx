import React, { useState } from 'react'
import cl from "./Card.module.css"
import { IProduct } from '../../redux/slices/pizzaSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { addToCart } from '../../redux/slices/cartSlice'

interface ICard extends IProduct {}

const Card: React.FC<ICard> = ({id, title, price, image, category}) => {

    const dispatch = useAppDispatch()
    const cartItem = useAppSelector(state => state.carts.cartItems.find(item => item.id == id))
    const addedCount = cartItem ? cartItem.count: 0

    const [currentDaugh, setCurrentDaugh] = useState(0)
    const [currentSize, setCurrentSize] = useState(0)

    const daughTypes = [
        {id: 0, title: "тонкое"},
        {id: 1, title: "традиционное"}
    ]

    const sizeTypes = [
        {id: 0, title: "26см."},
        {id: 1, title: "30см."},
        {id: 2, title: "40см."}
    ]

    function add(item: IProduct){
        dispatch(addToCart({
            ...item,
            size: sizeTypes[currentSize].title,
            daugh: daughTypes[currentDaugh].title
        }))
    }

    function selectDaugh(id:number){
        setCurrentDaugh(id)
    }

    function selectSize(id:number){
        setCurrentSize(id)
    }

    return (
        <div className={cl.card}>
            <div className={cl.cardItems}>
                <img src={image} alt="pizzas" />
                <h2 className={cl.title}>
                    {title}
                </h2>
                <div className={cl.param}>
                    <ul style={{marginBottom: 7}} className={cl.daugh}>
                       {daughTypes.map(type => 
                            <li onClick={() => selectDaugh(type.id)} className={currentDaugh == type.id ? cl.paramText + ' ' + cl.activeParam : cl.paramText} key={type.id}>
                                {type.title}
                            </li>
                        )} 
                    </ul>
                    <ul className={cl.size}>
                        {sizeTypes.map(type =>
                            <li onClick={() => selectSize(type.id)} className={currentSize == type.id ? cl.paramText + ' ' + cl.activeParam : cl.paramText} key={type.id}>
                                {type.title}
                            </li>    
                        )}
                    </ul>
                </div>
                <div className={cl.footer}>
                    <b className={cl.price}>
                    от {price} ₽
                    </b>
                    <button onClick={() => add({id,title,price,image,category})} className={cl.add}>
                        <img style={{marginRight: 9}} src="./image/plus.png" alt="plus" />
                            Добавить
                        <span style={{marginLeft: 9}} className={cl.count}>
                            {addedCount}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
