import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ClassTimeTable from '../screens/ClassTimeTable';
import Syllabus from '../screens/Syllabus';
import ScholarshipAndJob from '../screens/ScholarshipAndJob';
import StudentsCreativity from '../screens/StudentsCreativity';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClassTimeTable"
          component={ClassTimeTable}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Syllabus"
          component={Syllabus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScholarshipAndJob"
          component={ScholarshipAndJob}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentsCreativity"
          component={StudentsCreativity}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
