import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../utils/AuthContext';
import {UserRole} from '../assets/constant/userConstant';

// Screens
import Home from '../screens/Home';
import ClassTimeTable from '../screens/ClassTimeTable';
import Syllabus from '../screens/Syllabus';
import ScholarshipAndJob from '../screens/ScholarshipAndJob';
import StudentsCreativity from '../screens/StudentsCreativity';
import NoticeBoard from '../screens/NoticeBoard';
import ReportCard from '../screens/ReportCard';
import SeePdf from '../screens/SeePdf';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import ShowPdfFullViewMode from '../screens/ShowPdfFullViewMode';
import CreateNotice from '../screens/CreateNotice';
import CreateJobAndScholarship from '../screens/CreateJobAndScholorship';
import ComingSoon from '../screens/ComingSoon';
import ForgotPassword from '../screens/ForgotPassword';

// Navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = props => {
  const [name, setName] = React.useState('HIT');
  const [role, setRole] = React.useState(UserRole.STUDENT);
  const {isLoggedIn, logout} = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchName = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const userRole = await AsyncStorage.getItem('role');
      setRole(userRole);
      setName(storedName || 'HIT');
    };
    fetchName();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await logout();
    props.navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

  return (
    <View style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={{color: 'white', marginTop: 5}}>
          {role || UserRole.STUDENT}
        </Text>
      </View>

      <View style={styles.drawerItems}>
        {props.state.routeNames.map(routeName => {
          if (
            (routeName === 'login' || routeName === 'registration') &&
            isLoggedIn
          ) {
            return null;
          }
          return (
            <TouchableOpacity
              key={routeName}
              onPress={() => props.navigation.navigate(routeName)}
              style={styles.drawerItem}>
              <Text style={styles.drawerItemText}>{routeName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isLoggedIn && (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      <View style={styles.socialIcons}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.linkedin.com/school/haldia-institute-of-technology/',
            )
          }>
          <Icon name="logo-linkedin" size={28} color="#ecf0f1" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://x.com/HIT_WB_OFFICIAL')}>
          <Icon name="logo-twitter" size={28} color="#ecf0f1" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Stack
const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ClassTimeTable" component={ClassTimeTable} />
    <Stack.Screen name="Syllabus" component={Syllabus} />
    <Stack.Screen name="ScholarshipAndJob" component={ScholarshipAndJob} />
    <Stack.Screen name="StudentsCreativity" component={StudentsCreativity} />
    <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
    <Stack.Screen name="ReportCard" component={ReportCard} />
    <Stack.Screen name="SeePdf" component={SeePdf} />
    <Stack.Screen name="CreateNotice" component={CreateNotice} />
    <Stack.Screen
      name="CreateJobAndScholarship"
      component={CreateJobAndScholarship}
    />
    <Stack.Screen name="ShowPdfFullViewMode" component={ShowPdfFullViewMode} />
    <Stack.Screen name="ComingSoon" component={ComingSoon} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

// Drawer Navigation
const StackNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#2c3e50',
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: '#ecf0f1',
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#4CAF50',
        drawerInactiveTintColor: '#ecf0f1',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={MainStack} />
      <Drawer.Screen name="ClassTimeTable" component={ClassTimeTable} />
      <Drawer.Screen name="Syllabus" component={Syllabus} />
      <Drawer.Screen name="ScholarshipAndJob" component={ScholarshipAndJob} />
      <Drawer.Screen name="StudentsCreativity" component={ComingSoon} />
      <Drawer.Screen name="NoticeBoard" component={NoticeBoard} />
      <Drawer.Screen name="ReportCard" component={ReportCard} />
      <Drawer.Screen name="login" component={LoginScreen} />
      <Drawer.Screen name="registration" component={RegistrationScreen} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: '#2c3e50',
    marginBottom: 20,
  },
  userName: {
    color: '#ecf0f1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItems: {
    flex: 1,
    marginTop: 20,
  },
  drawerItem: {
    padding: 10,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  logoutText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#7f8c8d',
  },
});

export default StackNavigation;
