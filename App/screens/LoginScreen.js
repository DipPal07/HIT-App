import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  ViewBase,
  ActivityIndicator,
} from 'react-native';
import api, {storeToken} from '../utils/api';
import {all} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../utils/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {UserRole} from '../assets/constant/userConstant';
import NavBar from '../assets/component/NavBar';
const LoginScreen = () => {
  const navigation = useNavigation();
  const {login, setIsAdmin} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async () => {
    const {email, password} = form;

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      setLoading(true);
      const response = await api.post('/api/login', {
        email,
        password,
      });
      console.log(response.data);
      setLoading(false);
      if (response.data.success === true) {
        Alert.alert('Success', 'Login successful!');

        storeToken(response.data.data.token);
        await AsyncStorage.setItem('name', response.data.data.user.name);
        if (response.data.data.user.role === UserRole.ADMIN) {
          setIsAdmin(true);
          console.log('admin login success');
        }
        await AsyncStorage.setItem('role', response.data.data.user.role);
        // Handle successful login (e.g., navigate to another screen)
        await login(response.data.data.token); // store token and update state
        navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      } else {
        Alert.alert('Error', 'Login failed. Please try again.........');
      }
      console.log(await AsyncStorage.getItem('user'), 'user..........');
    } catch (error) {
      Alert.alert('Error', String(error));
      console.error('Error during login:', error);
      setLoading(false);
    }
    setLoading(false);
  };
  console.log(loading);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavBar
        data={{
          backButton: true,
          // currentThemes: themes,
          headingText: 'HIT',
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View>
          <Text style={styles.heading}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={text => handleChange('email', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleSubmit} color="#4CAF50" />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    paddingTop: 0,
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LoginScreen;
