import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { app } from "../constants/firebase";

const auth = getAuth(app);

// Set persistence to LOCAL to maintain session across page reloads
setPersistence(auth, browserLocalPersistence);

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName
        };
        return {
            user,
            error: null
        };
    } catch (error) {
        return {
            user: null,
            error: error.message
        };
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

export const getCurrentUser = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                });
            } else {
                resolve(null);
            }
        });
    });
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            callback({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            });
        } else {
            callback(null);
        }
    });
};