import { AUTH_IN_PROGRESS, AUTH_SUCCESS } from 'actions/types';

export const login = (login) => (dispatch) => {
    //console.log(login, password);
    dispatch({
        type: AUTH_IN_PROGRESS,
    });

    setTimeout(()=>{
        dispatch({
            type: AUTH_SUCCESS,
            payload: {
                profile: login, // Передаем данные
            }
        });    
    },500);
}
