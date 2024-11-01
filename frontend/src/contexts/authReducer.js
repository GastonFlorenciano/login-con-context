import Cookies from 'js-cookie';

export const profileReducer = (state, action) => {
    switch (action.type) {
        
        case 'LOGIN':
            const loginState = {
                ...state,
                user: action.payload,
                isAuth: true
            }
            Cookies.set('token', JSON.stringify(loginState), { expires: 1 });
            return loginState;

        case 'LOGOUT':
            const logoutState = {
                ...state,
                user: null,
                isAuth: false
            };
            Cookies.remove('token');
            return logoutState;

        default:
            return state;
}
}