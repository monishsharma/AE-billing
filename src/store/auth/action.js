import { loginWithEmailAndPassword, logout, getCurrentUser, subscribeToAuthChanges } from "../../services/auth";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_START' });
        const { user, error } = await loginWithEmailAndPassword(email, password);

        if (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error });
            return;
        }

        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await logout();
        dispatch({ type: 'LOGOUT' });
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const checkAuthState = () => async (dispatch) => {
    try {
        const user = await getCurrentUser();
        if (user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
            dispatch({ type: 'LOGOUT' });
        }
    } catch (error) {
        console.error('Auth state check error:', error);
        dispatch({ type: 'LOGOUT' });
    }
};

export const subscribeToAuth = () => (dispatch) => {
    return subscribeToAuthChanges((user) => {
        if (user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
            dispatch({ type: 'LOGOUT' });
        }
    });
};