import React from 'react';
import s from './Users.module.css';
import {connect} from "react-redux";

const Users = (props) => {
    return (
        <div>
            <div className={s.users}>{props.users.map((user) => <User user={user} key={user.id}/>)}</div>
            <div><hr className={s.hr}/></div>
        </div>
    );
};

const User = (props) => {
    return (
        <div className={s.user}>
            <div>id:{props.user.id}</div>
            <div>nickname: {props.user.nickname}</div>
            <div>email: {props.user.email}</div>
            <div>pass: {props.user.pass}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.form.users
    }
}

export default connect(mapStateToProps, {})(Users);