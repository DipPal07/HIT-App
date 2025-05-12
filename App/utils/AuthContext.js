// AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async token => {
    await AsyncStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
