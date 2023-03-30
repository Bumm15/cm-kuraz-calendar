import React, { useState, useContext, useEffect } from "react"
import { auth } from "../firebase-config"
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


/* DB RULES: */
/** "auth.token.email === 'pavelmarek25@seznam.cz' || auth.token.email === 'pavliiiicek.m@seznam.cz'" **/ 



export function AuthProvider({ children }) {
    const [user, setUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user?.email)
        })

        return unsubscribe
    }, [])

    async function signUp(email, password) {
        const userCredencials = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredencials.user).catch(error => console.log(error))
    }

    function signIn(email,password) {
        //firebase login with email and passwd
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function passwordReset(email) {
        try {
          await sendPasswordResetEmail(auth, email);
          return true;
        } catch (error) {
          return error.message;
        }
      }

    function logOut() {
        //
        return signOut(auth)
    }

    const value = {
        user,
        signIn,
        logOut,
        signUp,
        auth,
        passwordReset
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
