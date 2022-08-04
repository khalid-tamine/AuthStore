import { View, Text } from 'react-native'
import React ,{ useContext , useEffect, useState } from 'react'
import firebase from '../firebase.js';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setcurrentUser] = useState(null);
    const [loading , setLoading] = useState(true);

    function signUp (Email, Password) {
        return firebase.auth().createUserWithEmailAndPassword( Email, Password)
    }
    function logIn (Email, Password) {
        return firebase.auth().signInWithEmailAndPassword( Email, Password)
    }

    function logOut () {
        return firebase.auth().signOut()
    }
    function resetPassword (Email) {
        return firebase.auth().sendPasswordResetEmail( Email)
    }

    function updatePassword (Password) {
        return currentUser.updatePassword( Password)
    }
    function updateEmail (Email) {
        return currentUser.updateEmail( Email)
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => 
            {   
                setcurrentUser(user);
                setLoading(false);
            }
        )
        return () => unsubscribe()
    }, [])

    const value = {  signUp , logIn , logOut , resetPassword , updateEmail , updatePassword ,currentUser }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>

  )
}