import s from './App.module.css';
import React from 'react';
import {Provider} from "react-redux";
import store from './redux/store-redux';
import {HashRouter, Route, Redirect} from "react-router-dom";
import LoginContainer from "./components/Login/LoginContainer";
import Users from "./components/Users/Users";
import Registration from "./components/Registration/RegistrationContainer";

const App = () => {

    return (
        <div className={s.app}>
            <div className={s.users}>
                <div className={s.headerUsers}>Зарегестрированные пользователи</div>
                <div><Users/></div>
            </div>
            <div className={s.form}>
                <Route exept path={'/'} render={() => <Redirect to={'login'} />} />
                <Route path={'/login'}
                       render={() => <LoginContainer/>}/>
                <Route path={'/registration'} render={() => <Registration/>} />
            </div>
        </div>
    )
};

const AppComponent = () => {
    return <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
}

export default AppComponent;
