import { LOGIN,LOGOUT } from "../actions";

const initState = {
    token: ''
}

export default function rootReducer(state = initState,action){
    const newState = {...state};

    switch (action.type) {
        case LOGIN:
            newState.token = action.value;
            break;
    
        case LOGOUT:
            newState.token = '';
            break;
    }

    return newState;
}