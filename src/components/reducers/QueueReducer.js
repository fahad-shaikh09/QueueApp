const initialState = {
    user: "",
    isLoggedIn: false,
    companies:[]
    // {name: "",
    // date: "",
    // certificates: "",
    // timingsFrom: "",
    // timingsTo: "",
    // address: "",
    // },

}

export default function QueueReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        case "ADD_COMPANY":
            return {
                ...state,
                companies: [...state.companies, action.payload]
                // name: action.payload.name,
                // date: action.payload.date,
                // certificates: action.payload.certificates,
                // timingsFrom: action.payload.timingsFrom,
                // timingsTo: action.payload.timingsTo,
                // address: action.payload.address,
            };
        default:
            return state;
    }
}

