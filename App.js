import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from './App/screens/Home';
import NavBar from './App/assets/component/NavBar';
import ClassTimeTable from './App/screens/ClassTimeTable';
const App = () => {
  return <Home />;
  // return <ClassTimeTable />;
  // return <NavBar />;
};
const style = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'red',
  },
});
export default App;
