import update from 'immutability-helper';
import { AUTH_IN_PROGRESS, AUTH_SUCCESS } from 'actions/types';

const initialState = {
 profile: '',
 status:  '',
};

const reducer = (state = initialState, action) => {
    
    const { type } = action;
    switch(type){
        case AUTH_IN_PROGRESS:
            return update(state, {
                status: { $set: 'in_progress'},                
                //profile: { $set: 'Wait..'},
            });
        case AUTH_SUCCESS:
            return update(state, {
                status: { $set: 'success'},                
                profile: { $set: action.payload.profile},                
            });

        default:
            return state;    
    }

}

export default reducer;