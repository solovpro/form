import s from "./Registration.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

const Registration = (props) => (
    <div>
        {!props.isReg ? <form className={s.registration} onSubmit={props.onSubmit}>
                <div className={s.header}>
                    <div>Регистрация</div>
                </div>
                <div className={s.email}>
                    {(props.emailDirty && props.emailError) && <div className={s.error}>{props.emailError}</div>}
                    <div>
                        <input onChange={e => props.emailHandler(e)} onBlur={e => props.blurHandler(e)}
                               name={'email'} value={props.email} type="text" placeholder={'Email'}/>
                    </div>
                </div>
                <div className={s.name}>
                    {(props.nameDirty && props.nameError) && <div className={s.error}>{props.nameError}</div>}
                    <div>
                        <input onChange={e => props.nameHandler(e)} onBlur={e => props.blurHandler(e)}
                               name={'name'} value={props.name} type="text" placeholder={'Name'}/>
                    </div>
                </div>
                <div className={s.pass}>
                    {(props.passDirty && props.passError) && <div className={s.error}>{props.passError}</div>}
                    <div>
                        <input onChange={e => props.passHandler(e)} onBlur={e => props.blurHandler(e)} name={'pass'}
                               value={props.pass} type="password" placeholder={'Password'}/>
                    </div>
                </div>
                <div className={s.passAgain}>
                    {(props.passAgainDirty && props.passAgainError) || <div className={`${s.lastError} ${s.error}`}>{props.passAgainError}</div>}
                    <div>
                        <input onChange={e => props.passAgainHandler(e)} onBlur={e => props.blurHandler(e)}
                               name={'passAgain'}
                               value={props.passAgain} type="password" placeholder={'Password again'}/>
                    </div>
                </div>
                <div className={s.buttonBlock}>
                    <button disabled={!props.formValid} className={s.button}>Зарегестрироваться</button>
                </div>
                <div className={s.goIsAuth}>
                    <div>Уже зарегестрированы?</div>
                    <div><NavLink to={'login'}>Войти</NavLink></div>
                </div>
            </form>
            : <div className={s.regOk}>
                <div>Ура!</div>
                <div className={s.text}>Вы успешно зарегестрировались, <span>{props.name}!</span></div>
                <div><NavLink className={s.button} to={'login'}>Войти</NavLink></div>
            </div>
        }
    </div>
)

export default Registration;