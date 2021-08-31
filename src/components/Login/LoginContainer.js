import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {loginThunk, logout} from "../../redux/form-reducers";
import Login from "./Login";

const LoginContainer = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passDirty, setPassDirty] = useState(false);
    const [emailError, setEmailError] = useState('Емейл не может быть пустым');
    const [passError, setPassError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break
            case 'password':
                setPassDirty(true);
                break
            default:
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный емайл')
        } else {
            setEmailError('')
        }
    }

    const passHandler = (e) => {
        setPass(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPassError('Пароль должен иметь больше 3 и меньше 15 символов')
            if (!e.target.value.length) {
                setPassError('Пароль не может быть пустым')
            }
        } else {
            setPassError('')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (props.isAuth) {
            props.logout(false);
        } else {
            props.loginThunk(email, pass, props.users);
            setEmail('')
            setPass('')
        }
    }

    return (
        <div>
            <Login isAuth={props.isAuth} onSubmit={onSubmit} nickname={props.nickname} emailDirty={emailDirty}
                   emailError={emailError} emailHandler={emailHandler} blurHandler={blurHandler}
                   passDirty={passDirty} passError={passError} passHandler={passHandler} formValid={formValid}
                   email={email} pass={pass}/>
        </div>
    );
};



const mapStateToProps = (state) => {
    return {
        users: state.form.users,
        isAuth: state.form.isAuth,
        nickname: state.form.nickname
    }
}

export default connect(mapStateToProps, {logout, loginThunk})(LoginContainer);