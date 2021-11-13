import { LOGIN,LOGOUT } from "../actions";

const initState = {
    token: (localStorage.getItem("token") !== null) ? localStorage.getItem("token") : '',
    user: (localStorage.getItem("user") !== null) ? JSON.parse(localStorage.getItem("user")) : {id:"",name:"",email:""}
}

export default function rootReducer(state = initState,action){
    const newState = {...state};

    switch (action.type) {
        case LOGIN:
            newState.token = action.value.token;
            newState.user.id = action.value.user.id;
            newState.user.name = action.value.user.name;
            newState.user.email = action.value.user.email;
            break;
    
        case LOGOUT:
            newState.token = '';
            newState.user = {id:"",name:"",email:""};
            break;
    }

    return newState;
}