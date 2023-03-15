import {useEffect, useState} from 'react';
import instaIcon from '../../images/icons8-instagram-48.png'
import middleIcon from '../../images/vsem torba прямой.png'
import products from '../../images/productList/productList'
import circle from '../../images/vsem torba круг.png'
import close from '../../images/close.png'
import elipse from '../../images/Ellipse 6.png'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOneUser} from "../../redux/slices/OneProductSlice";
import {loginAuth, refreshUser, registrationAuth, setforgotPassword} from "../../redux/slices/LoginSlice";
import {useForm} from "react-hook-form";
import cssSoldPage from "./soldPage.module.css"
import css from "../../app.module.css"


export function Shop() {

    const {refreshStatus, loginStatus} = useSelector(state => state.LoginReducer);
    const {actionTokenStatus} = useSelector(state => state.LoginReducer);
    const {registrationAuthStatus} = useSelector(state => state.LoginReducer);

    const [login, setLogin] = useState(' ')


    const [registerForm, setRegister] = useState(' ')
    const [forgotPass, setForgotPass] = useState(' ')
    const [form1, setForm1] = useState('')

    const [form2, setForm2] = useState('')
    const [numberOfPhoneFormRegister, setNumberOfPhoneFormRegister] = useState('')

    const [nameFormRegister, setNameFormRegister] = useState('')
    const [emailFormRegister, setEmailFormRegister] = useState('')
    const [passwordFormRegister, setPasswordFormRegister] = useState('')


    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();


    useEffect(() => {
        if (sessionStorage.getItem('refresh_token')) {
            dispatch(refreshUser())
        }
    }, [])


    const loginForAuth = (e) => {
        dispatch(loginAuth(e))
        setForm1('')
        setForm2('')

        if (!loginStatus) {
            setLogin(' ')
        }
    }

    const registerForAuth = (e) => {
        dispatch(registrationAuth(e))

        if (registrationAuthStatus) {
            setRegister('')
        }

    }


    const sendTokenToEmail = (data) => {
        dispatch(setforgotPassword(data))

    }

    const functionForLogin = () => {
        setLogin('positive')


    }
    const changerLoginOnRegister = () => {
        setLogin(' ')
        setRegister('positive')

    }

    const forgotPassword = () => {
        setLogin(' ')
        setForgotPass('positive')
    }


    const getOneItem = (value) => {
        dispatch(getOneUser(value))
        if (sessionStorage.getItem('refresh_token')) {
            dispatch(refreshUser())
        }
    }


    return (
        <div className={'bg-cover min-h-screen min-w-full bg-[#0E0E0E]'}>
            <div className={'container mx-auto pt-5 items-center flex justify-between'}>
                <div className={'flex items-center'}>
                    <img src={instaIcon} alt=""/>
                    <Link to={'/'}>
                        <p className={'text-white ml-6'}>Про нас</p>
                    </Link>
                </div>
                <img style={{marginRight: '55px'}} src={middleIcon} alt=""/>
                {loginStatus || refreshStatus ? <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                        <Link to={'/basket'}>
                            <p style={{color: 'white', weight: '182px', fontSize: '20px', cursor: 'pointer'}}>Корзина</p>
                        </Link>
                        <img src={elipse} alt=""/>
                    </div>
                    : <p onClick={functionForLogin} className={'text-white'} style={{cursor: 'pointer'}}>Увійти</p>}
            </div>
            <div>
                {login === 'positive' ?
                    <div className={'w-[375px] h-[466px] absolute bg-black left-1/3'}>
                        <img className={'ml-36 mt-9'} src={circle} alt=""/>
                        <img className={css.close_button} src={close} onClick={() => setLogin(' ')} alt=""/>
                        <form onSubmit={handleSubmit(loginForAuth)} className={css.mainBlock} action="">
                            <div>
                                <p className={'text-white '}>Номер телефону</p>
                                <input {...register("email", {required: true})} value={form1}
                                       onChange={(event => setForm1(event.target.value))} className={css.mainInput}
                                       type="text"/>
                            </div>
                            <div>
                                <p className={'text-white'}>Пароль</p>
                                <input {...register("password", {required: true})} value={form2}
                                       onChange={(event => setForm2(event.target.value))} className={css.mainInput}
                                       type="text"/>
                            </div>
                            <button onClick={forgotPassword} className={css.forgotPassButton}>Забули пароль?</button>
                            <button className={css.button}>Увійти
                            </button>
                            <button onClick={changerLoginOnRegister}
                                    style={{marginTop: '26px', color: 'white'}}>Регестрація
                            </button>
                        </form>


                    </div> : (
                        registerForm === 'positive' ? <div
                                className={'w-[375px] h-[576px] absolute bg-black left-1/3'}>
                                <img className={'ml-36 mt-9'} src={circle} alt=""/>
                                <img className={css.close_button} src={close} onClick={() => {
                                    setRegister(' ')

                                }} alt=""/>
                                <form onSubmit={handleSubmit(registerForAuth)} className={css.mainBlock} action="">
                                    <div>
                                        <p className={'text-white '}>Номер телефону</p>
                                        <input {...register("phoneNumber",)} value={numberOfPhoneFormRegister}
                                               onChange={(event => setNumberOfPhoneFormRegister(event.target.value))}
                                               className={css.mainInput}
                                               type="text"/>
                                    </div>
                                    <div>
                                        <p className={'text-white'}>Ім'я користувача</p>
                                        <input {...register("name",)} value={nameFormRegister}
                                               onChange={(event => setNameFormRegister(event.target.value))}
                                               className={css.mainInput}
                                               type="text"/>
                                    </div>
                                    <div>
                                        <p className={'text-white'}>Email</p>
                                        <input {...register("email",)} value={emailFormRegister}
                                               onChange={(event => setEmailFormRegister(event.target.value))}
                                               className={css.mainInput}
                                               type="text"/>
                                    </div>
                                    <div>
                                        <p className={'text-white'}>Пароль</p>
                                        <input {...register("password",)} value={passwordFormRegister}
                                               onChange={(event => setPasswordFormRegister(event.target.value))}
                                               className={css.mainInput}
                                               type="text"/>
                                    </div>
                                    {!registrationAuthStatus ?
                                        <p style={{color: 'red'}}>Цей користувач вже зареєстрований</p> : ' '}
                                    <button className={css.button}>Зареструватися</button>
                                </form>
                            </div> :
                            forgotPass === 'positive' ?
                                <div className={'w-[375px] h-[466px] absolute bg-black left-1/3'}>
                                    <img className={'ml-36 mt-9'} src={circle} alt=""/>
                                    <img className={css.close_button} src={close} onClick={() => setForgotPass(' ')}
                                         alt=""/>
                                    <form onSubmit={handleSubmit(sendTokenToEmail)} className={css.mainBlock} action="">
                                        <div>
                                            <p className={'text-white '}>Email</p>
                                            <input {...register("email", {required: true})} value={form1}
                                                   onChange={(event => setForm1(event.target.value))}
                                                   className={css.mainInput}
                                                   type="text"/>
                                        </div>
                                        {actionTokenStatus === 'negative' ?
                                            <p style={{color: 'red', fontSize: '12px'}}>Ви вже відправили запит,
                                                перевіртве пошту</p> : actionTokenStatus === 'positive' ?
                                                (<p style={{color: 'green', fontSize: '12px'}}>Запит відправленно,
                                                    перевірте пошту</p>) : ''}
                                        <button className={css.button}>Забув пароль
                                        </button>
                                    </form>
                                </div> : ''
                    )}
            </div>
            <div className={cssSoldPage.mainSoldPageOfGoods}>
                {products && products.map(value =>
                    <Link to={'/one-product'} onClick={() => {
                        getOneItem(value)
                    }}>
                        <div className={cssSoldPage.blockForOneItem}>
                            <img className={cssSoldPage.oneItemImage} src={value.photo} alt=""/>
                            <p className={'text-white'}>{value.name}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

