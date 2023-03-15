import React, {useEffect, useState} from 'react';
import middleIcon from '../../images/vsem torba прямой.png'
import cursor from '../../images/arrow_back_ios_24px.png'
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import right from "../../images/right.png";
import elipse from "../../images/Ellipse 6.png";
import axios from "axios";
import css from "./oneProduct.module.css"
import {addOneProductToCart} from "../../redux/slices/CartSlice";


export const OneProduct = () => {

    const {users} = useSelector(state => state.OneProductReducer);
    const {loginStatus} = useSelector(state => state.LoginReducer);
    const products = useSelector(state => state.CartReducer.products)


    const [state, setState] = useState(true)
    const [testOPT, setTest] = useState(null);

    const dispatch = useDispatch();


    useEffect(() => {
        if (products && products.some(value => value.name === users.name)) {
            setState(false)
        }

    }, [])


    const changeStateForBasket = async (users) => {
        try {
            if (sessionStorage.getItem('refresh_token')) {
                await axios.post('http://localhost:5000/auth/checkToken', {}, {
                    headers: {
                        'Authorization': sessionStorage.getItem('refresh_token')
                    }
                })
                setTest('positive')
                dispatch(addOneProductToCart(users))

            } else {
                setTest('negative')
            }

        } catch (e) {
            console.log(e)
        }


    }


    return (
        <div className={css.mainBlockForOneProduct}>
            <div className={'flex items-center justify-between w-[681px] pt-[25px] pl-[28px]'}>
                <div className={'flex items-center '}>
                    <NavLink className={'flex items-center'} to={'/shop'}>
                        <img className={'h-[20px] mr-2'} src={cursor} alt=""/>
                        <p className={' text-white'}>Повернутись до товарів</p>
                    </NavLink>
                </div>
                <img src={middleIcon} alt=""/>
                {loginStatus ? <div
                    style={{position: 'absolute', display: 'flex', gap: '16px', alignItems: 'center', right: '27px'}}>
                    <Link to={'/basket'}>
                        <p style={{color: 'white', weight: '182px', cursor: 'pointer'}}>Перейти до
                            кошику</p>
                    </Link>

                    <img style={{marginRight: '8px'}} src={right} alt=""/>
                    <img src={elipse} alt=""/>
                </div> : ''}
            </div>
            <div className={' ml-[510px] mt-[38px]'}>{users && <div>
                <img className={'w-[250px]'} src={users.photo} alt=""/>
                <div className={'flex gap-[5px] mt-5 text-{26px}  font-normal'}>
                    <p className={'text-white'}>{users.name}</p>
                    <p className={'text-white'}>399</p>x
                    <p className={'text-white'}>UAN</p>
                </div>


                {testOPT === 'negative' ? (<p style={{color: 'white'}}>Щоб додати до корзини слід
                    авторизуватись</p>) : testOPT === 'positive' ? (
                    <p className={'text-white ml-[30px] font-normal text-[20px] mt-[36px] w-[399px] h-[60px]'}>Додано
                        в <Link className={css.basket} to={'/basket'}>кошик</Link>
                    </p>) : !state ? (
                    <p className={'text-white ml-[30px] font-normal text-[20px] mt-[36px] w-[399px] h-[60px]'}>Додано
                        в <Link className={css.basket} to={'/basket'}>кошик</Link>
                    </p>) : <button onClick={() => changeStateForBasket(users)}
                                    className={'w-[200px] h-[60px] bg-gray-300 ml-[30px] font-normal text-[15px] mt-[32px]'}
                                    style={{borderRadius: '30px',}}>Додати до корзини
                </button>}

            </div>}
            </div>
        </div>
    );
};

