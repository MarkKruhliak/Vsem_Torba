import {useForm} from "react-hook-form";
import circle from "../../images/vsem torba круг.png";
import css from "../../app.module.css";
import close from "../../images/close.png";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassword} from "../../redux/slices/LoginSlice";

export const ForgotPassword = () => {

    const {setForgotPassStatus} = useSelector(state => state.LoginReducer);


    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const submitNewPassword = (data) => {
        dispatch(setNewPassword(data))
    }

    return (

        <div className={'w-[375px] h-[466px] absolute bg-black left-1/3 top-[100px]'}>
            <img className={'ml-36 mt-9'} src={circle} alt=""/>
            <img className={css.close_button} src={close} alt=""/>
            <form onSubmit={handleSubmit(submitNewPassword)} className={css.mainBlock} action="">
                <div>
                    <p className={'text-white '}>Пароль</p>
                    <input {...register("password", {required: true})}
                           className={css.mainInput}
                           type="text"/>
                </div>
                <div>
                    <p className={'text-white'}>Новый Пароль</p>
                    <input {...register("set_password", {required: true})}
                           className={css.mainInput}
                           type="text"/>
                </div>
                {setForgotPassStatus ? (<p style={{color: 'green'}}>Пароль змінено</p>) : ''}
                <button className={css.button}>Підвердити
                </button>
            </form>
        </div>
    );
}
