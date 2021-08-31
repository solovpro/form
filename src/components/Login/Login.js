import React from 'react';
import s from "./LoginForm.module.css";
import {NavLink} from "react-router-dom";

const Login = (props) => {

    return (
        <form className={s.form} onSubmit={props.onSubmit}>
            {!props.isAuth ? <div>
                    <div className={s.header}>Форма авторизации</div>
                    <div className={s.inputs}>
                        {(props.emailDirty && props.emailError) && <div className={s.error}>{props.emailError}</div>}
                        <input onChange={e => props.emailHandler(e)} value={props.email}
                               onBlur={e => props.blurHandler(e)} className={s.input} type={"text"} name={'email'}
                               placeholder={'Email'}/>
                        {(props.passDirty && props.passError) && <div className={s.error}>{props.passError}</div>}
                        <input onChange={e => props.passHandler(e)} value={props.pass}
                               onBlur={e => props.blurHandler(e)} className={s.input} type={"password"} name={'password'}
                               placeholder={'Password'}/>
                    </div>
                    <button disabled={!props.formValid} className={s.button}>Войти</button>
                    <div className={s.registr}>
                        <div>Не зарегестрированы?</div>
                        <NavLink to='/registration'>Регистрация</NavLink>
                    </div>
                </div>
                : <div className={s.inOk}>
                    <div>Вход успешно выполнен!</div>
                    <div className={s.name}>Привет, {props.nickname}!</div>
                    <button className={s.button}>Выйти</button>
                </div>}
        </form>
    );
}

export default Login;