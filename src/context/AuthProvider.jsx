import React from 'react'
import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../firebase/firebase.init';
import { toast } from 'react-toastify';
import axios from 'axios';


const googleProvider = new GoogleAuthProvider();


export default function AuthProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('light');

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const handleLogout = () => {
        signOutUser()
            .then(e => {
                axios.post('https://group-study-backend-six.vercel.app/logout', user, { withCredentials: true })
                    .then(res => console.log(res.data))
                toast.success("Logout Success!")
                // window.location.href = "/";
            })
            .catch(e => {
                console.log(e)
                toast.error("Something Wrong")
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state captured', currentUser)
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        singInUser,
        singInWithGoogle,
        handleLogout,
        theme,
        setTheme
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
