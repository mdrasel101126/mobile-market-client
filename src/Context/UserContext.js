import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [isAddService, setIsAddService] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignUp = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("helloFoodies-jwt");
    setProfileUpdate(false);
    //localStorage.removeItem("genious-token");
    return signOut(auth);
  };
  const updateUserProfile = (name, phothUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: phothUrl,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [profileUpdate]);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleSignUp,
    logOut,
    updateUserProfile,
    setProfileUpdate,
    isAddService,
    setIsAddService,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
