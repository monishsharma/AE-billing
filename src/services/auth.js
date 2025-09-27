// auth.js
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app } from "../constants/firebase";

const auth = getAuth(app);

// Keep session across reloads
setPersistence(auth, browserLocalPersistence);

// The only two admins
const ADMIN_EMAILS = new Set([
  "sharma.monish17@gmail.com",
  "ashok_entp@rediffmail.com",
]);

function roleFromClaims(claims, email) {
  if (claims && claims.role === "admin") return { role: "admin", isAdmin: true };
  if (email && ADMIN_EMAILS.has(email)) return { role: "admin", isAdmin: true }; // UX fallback only
  return { role: "user", isAdmin: false };
}

async function userWithRole(firebaseUser) {
  const tokenResult = await firebaseUser.getIdTokenResult(true); // refresh to pick new claims
  const { role, isAdmin } = roleFromClaims(tokenResult.claims, firebaseUser.email);
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    role,
    isAdmin,
    getIdToken: (force = false) => firebaseUser.getIdToken(force),
  };
}

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = await userWithRole(cred.user);
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message || String(error) };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message || String(error) };
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      unsub();
      if (!firebaseUser) return resolve(null);
      try {
        const user = await userWithRole(firebaseUser);
        resolve(user);
      } catch {
        // Minimal fallback if claims fetch fails
        const isAdmin = ADMIN_EMAILS.has(firebaseUser.email || "");
        resolve({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          role: isAdmin ? "admin" : "user",
          isAdmin,
          getIdToken: (force = false) => firebaseUser.getIdToken(force),
        });
      }
    });
  });
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) return callback(null);
    try {
      const user = await userWithRole(firebaseUser);
      callback(user);
    } catch {
      const isAdmin = ADMIN_EMAILS.has(firebaseUser.email || "");
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        role: isAdmin ? "admin" : "user",
        isAdmin,
        getIdToken: (force = false) => firebaseUser.getIdToken(force),
      });
    }
  });
};

// Helper to call your Express API with the Firebase ID token
export async function apiFetch(path, init = {}) {
  const token = await auth.currentUser?.getIdToken(false);
  return fetch(`/api${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}
