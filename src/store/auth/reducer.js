const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'LOGOUT':
            return {
                ...initialState,
                loading: false
            };
        case 'AUTH_CHECK_COMPLETE':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default authReducer;