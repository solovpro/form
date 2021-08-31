const USERS_ENTER = 'USERS_ENTER';
const USERS_EXIT = 'USERS_EXIT';
const ADD_USER = 'ADD_USER';

let initialState = {
    users: [
        {
            id: 1,
            nickname: 'Naruto',
            email: 'naruto@bk.ru',
            pass: 'hokage7',
        },
        {
            id: 2,
            nickname: 'Luffy',
            email: 'luffy@inbox.ru',
            pass: 'king_pirates',
        },
        {
            id: 3,
            nickname: 'Saitama',
            email: 'saitama@mail.ru',
            pass: 'one_punch',
        },
        {
            id: 4,
            nickname: 'Sasuke',
            email: 'sasuke@bk.ru',
            pass: 'only_me',
        },

    ],
    isAuth: false,
    nickname: '',
}

const formReducers = (state = initialState, action) => {
    switch (action.type) {
        case USERS_ENTER :
            return {
                ...state,
                isAuth: action.isAuth,
                nickname: action.nickname,
            }
        case USERS_EXIT:
            return {
                ...state,
                isAuth: false,
                nickname: ''
            }
        case ADD_USER:
            let newUser = {
                id: state.users.length + 1,
                nickname: action.nickname,
                email: action.email,
                pass: action.pass
            }
            return {
                ...state,
                users: [...state.users, newUser]
            }
        default:
            return state
    }
}


export const login = (isAuth, nickname) => ({type: USERS_ENTER, isAuth, nickname});
export const logout = (isAuth) => ({type: USERS_EXIT, isAuth});
export const addUserActionCreator = (nickname, email, pass) => ({type: ADD_USER, nickname, email, pass})

export const loginThunk = (email, pass, users) => (dispatch) => {

    for (let i = 0; i < users.length; i++) {
        if ((users[i].email.toLowerCase() === email.toLowerCase()) && (users[i].pass === pass)) {
            let name = users[i].nickname;
            dispatch(login(true, name));
        } else {
        }
    }
}

export default formReducers;