const initialState = {
    user: "",
    isLoggedIn: false
}

export default function QueueReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_USER":
            return {...state,
                isLoggedIn: true,
                user: action.payload
            };
        default:
            return state;
    }
}

