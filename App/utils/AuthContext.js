// AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserRole} from '../assets/constant/userConstant';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsLoggedIn(!!token);
  };
  const checkAdmin = async () => {
    const role = await AsyncStorage.getItem('role');
    if (role === UserRole.ADMIN) {
      setIsAdmin(true);
      console.log('admin login success');
    }
  };
  useEffect(() => {
    checkAdmin();
    checkToken();
  }, []);

  const login = async token => {
    await AsyncStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{isLoggedIn, login, logout, setIsAdmin, isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};
