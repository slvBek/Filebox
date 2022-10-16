import React, { Component, useContext,useEffect} from 'react';
import {auth} from '../firebase';
const AuthContext = React.createContext();

export const useAuth = () =>{
    return useContext(AuthContext);
}

const AuthProvider = ({children}) =>{

    const [currentUser, setCurrentUser] = React.useState();
    
    const login = (email, password) =>{
    const obj = {}
    const jsonData = JSON.stringify(obj);
    localStorage.setItem('localKey',jsonData);
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    const logout = () =>{
        return auth.signOut();
    }
    
    const forgotPassword=(email)=>{
    return auth.sendPasswordResetEmail(email);
    }
    
    const signup=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
    }
    useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
    setCurrentUser(user);
    });
    return unsubscribe;
    },[])
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgotPassword
    }
        return (
           <AuthContext.Provider value = {value}>
                  {children}
           </AuthContext.Provider>
        );
    }
    
export default AuthProvider;