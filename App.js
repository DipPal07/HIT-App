import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from './App/screens/Home';
import NavBar from './App/assets/component/NavBar';
import ClassTimeTable from './App/screens/ClassTimeTable';
import Syllabus from './App/screens/Syllabus';
import StackNavigation from './App/navigation/StackNavigation';

const App = () => {
  return <StackNavigation />;
  // return <Home />;
  // return <ClassTimeTable />;
  // return <Syllabus />;
  // return <NavBar />;
};
const style = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'red',
  },
});
export default App;
