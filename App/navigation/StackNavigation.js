import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import all screens
import Home from '../screens/Home';
import ClassTimeTable from '../screens/ClassTimeTable';
import Syllabus from '../screens/Syllabus';
import ScholarshipAndJob from '../screens/ScholarshipAndJob';
import StudentsCreativity from '../screens/StudentsCreativity';
import NoticeBoard from '../screens/NoticeBoard';
import ReportCard from '../screens/ReportCard';
import SeePdf from '../screens/SeePdf';

// Create navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for deeper navigation
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ClassTimeTable" component={ClassTimeTable} />
      <Stack.Screen name="Syllabus" component={Syllabus} />
      <Stack.Screen name="ScholarshipAndJob" component={ScholarshipAndJob} />
      <Stack.Screen name="StudentsCreativity" component={StudentsCreativity} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
      <Stack.Screen name="ReportCard" component={ReportCard} />
      <Stack.Screen name="SeePdf" component={SeePdf} />
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Dashboard" component={MainStack} />
        <Drawer.Screen name="ClassTimeTable" component={ClassTimeTable} />
        <Drawer.Screen name="Syllabus" component={Syllabus} />
        <Drawer.Screen name="ScholarshipAndJob" component={ScholarshipAndJob} />
        <Drawer.Screen
          name="StudentsCreativity"
          component={StudentsCreativity}
        />
        <Drawer.Screen name="NoticeBoard" component={NoticeBoard} />
        <Drawer.Screen name="ReportCard" component={ReportCard} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
