const initialState = {
    user: "",
    isLoggedIn: false,
    companies:[],
    tokensCount:0,
    estimatedTime:0,
    index:"",

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
            case "SET_COMPANIES_IN_STORE":
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
        case "SHOW_COMPANY":
            return{
                ...state,
                tokensCount: action.payload.tokensCount,
                estimatedTime: action.payload.estimatedTime,
                index:action.payload.index,
            }    
        default:
            return state;
    }
}

