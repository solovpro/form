import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {addUserActionCreator} from "../../redux/form-reducers";
import Registration from "./Registration";

const RegistrationContainer = (props) => {

    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('');
    const [pass, setPass] = useState('');
    const [passDirty, setPassDirty] = useState(false);
    const [passError, setPassError] = useState('');
    const [passAgain, setPassAgain] = useState('');
    const [passAgainDirty, setPassAgainDirty] = useState(false);
    const [passAgainError, setPassAgainError] = useState('');
    const [isReg, setIsReg] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {

        if (emailError || passError || nameError || passAgainError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

        if ((passAgain !== pass) && (passAgainError === '')) {
            setPassAgainError('Пароли не совпадают')
        }

        existingEmail(props.users);

    }, [emailError, nameError, passError, passAgainError, props.users, passAgain, pass])

    const blurHandler = (e) => {
        console.log('blur')
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break
            case 'name':
                setNameDirty(true);
                break
            case 'pass':
                setPassDirty(true);
                break
            case 'passAgain':
                setPassAgainDirty(true);
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

    const nameHandler = (e) => {
        setName(e.target.value);

        if (e.target.value.length < 4 || e.target.value.length > 15) {
            setNameError('Имя должно содержать больше 4 и меньше 15 символов')
        } else {
            setNameError('')
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

    const passAgainHandler = (e) => {
        setPassAgain(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPassAgainError('Пароль должен иметь больше 3 и меньше 15 символов')
            if (!e.target.value.length) {
                setPassAgainError('Пароль не может быть пустым')
            }
        } else {
            setPassAgainError('')
        }
    }

    const existingEmail = (users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === email.toLowerCase()) {
                setEmailError('Пользователь с таким емейлом уже существует!')
                break
            } else if (i === users.length - 1 && emailError === 'Пользователь с таким емейлом уже существует!') {
                setEmailError('')
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setIsReg(true);
        if (!emailError) {
            props.addUser(name, email, pass);
        }
    }

    return (
        <div>
            <Registration isReg={isReg} onSubmit={onSubmit} emailDirty={emailDirty} emailError={emailError} emailHandler={emailHandler} blurHandler={blurHandler}
                          email={email} nameDirty={nameDirty} nameError={nameError} nameHandler={nameHandler} name={name} passDirty={passDirty}
                          passError={passError} passHandler={passHandler} pass={pass} passAgainDirty={passAgainDirty} passAgainError={passAgainError}
                          passAgainHandler={passAgainHandler} passAgain={passAgain} formValid={formValid}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.form.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (name, email, pass) => {
            dispatch(addUserActionCreator(name, email, pass));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);