import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import api, {storeToken} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../utils/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {UserRole} from '../assets/constant/userConstant';
import NavBar from '../assets/component/NavBar';
import CustomModal from '../assets/component/CoustomModal';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {login, setIsAdmin} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('error');

  const showModal = (title, message, type = 'error') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async () => {
    const {email, password} = form;

    if (!email || !password) {
      showModal('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/api/login', {
        email,
        password,
      });
      setLoading(false);

      if (response.data.success === true) {
        showModal('Success', 'Login successful!', 'success');

        storeToken(response.data.data.token);
        await AsyncStorage.setItem('name', response.data.data.user.name);
        if (response.data.data.user.role === UserRole.ADMIN) {
          setIsAdmin(true);
        }
        await AsyncStorage.setItem('role', response.data.data.user.role);

        await login(response.data.data.token); // store token and update state
        navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      } else {
        showModal('Error', 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);

      // Handling different error cases
      if (error?.response?.status === 400) {
        const message =
          error?.response?.data?.message || 'Email or password incorrect.';
        showModal('Login Failed', message, 'error');
      } else if (error?.response?.status === 500) {
        showModal(
          'Server Error',
          'There was an issue with the server. Please try again later.',
          'error',
        );
      } else if (error?.message === 'Network Error') {
        showModal(
          'Network Error',
          'Please check your internet connection and try again.',
          'error',
        );
      } else {
        showModal('Error', 'An unexpected error occurred.', 'error');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavBar
        data={{
          backButton: true,
          headingText: 'HIT',
        }}
      />
      <View style={{padding: 20}}>
        {/* Custom Modal */}
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />

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
            {loading ? (
              <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    paddingTop: 0,
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
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
