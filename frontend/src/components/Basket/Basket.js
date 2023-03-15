import React, {useState} from 'react';
import css from './basket.module.css'
import deleteItem from '../../images/Delete.png'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteOneItemFromCart} from "../../redux/slices/CartSlice";

export const Basket = () => {

    const product = useSelector(product => product.CartReducer.products);

    let dispatch = useDispatch();


    return (

        <div className={'relative bg-auto bg-black min-h-screen'}>
            <p className={css.firstPInBasket}>Товари в кошику</p>
            <div className={css.items}>
                {product ? product.map(value => <div className={css.intoItems}>
                    <img onClick={() => dispatch(deleteOneItemFromCart(value.name))} className={css.deleteImg}
                         src={deleteItem}
                         alt=""/>
                    <img className={'h-[300px] w-[250px]'} src={value.photo} alt=""/>
                    <p style={{color: 'white'}}>{value.name}</p>
                </div>) : <p style={{fontSize: '36px'}} className={css.secondPInBasket}>У кошику немає товару</p>}
            </div>
            <Link to={'/shop'}>
                <button className={css.comeBackButton}>Повернутись до товарів</button>
            </Link>
        </div>

    );
};
