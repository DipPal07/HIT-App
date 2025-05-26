import React, {useEffect, useState} from 'react';
import {Menu, Provider} from 'react-native-paper';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import facultyData from '../assets/component/FacultyData';
import api from '../utils/api';
import URL from '../assets/constant/url';
import NavBar from '../assets/component/NavBar';
import CustomModal from '../assets/component/CoustomModal';
import {useNavigation} from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [courseType, setCourseType] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [isFocusCourseType, setIsFocusCourseType] = useState(false);
  const [isFocusCourseName, setIsFocusCourseName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('error');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    courseType: '',
    courseName: '',
  });

  const clearFormData = () => {
    form.courseType = '';
    form.courseName = '';
    form.name = '';
    form.email = '';
    form.password = '';
  };

  // Dropdown options for UG/PG
  const courseTypeOptions = facultyData.map(item => ({
    label: item.courseType,
    value: item.courseType,
  }));

  // Filter course names based on selected courseType
  const courseNameOptions =
    facultyData
      .find(item => item.courseType === courseType)
      ?.courseNameAndSemester.map(course => ({
        label: course.courseName,
        value: course.courseName,
      })) || [];

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
    setLoading(true);
    const {name, email, password, courseType, courseName} = form;

    if (!name || !email || !password || !courseType || !courseName) {
      showModal('Error', 'Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/register', {
        name,
        email,
        password,
        courseType,
        courseName,
      });
      console.log(response.data);
      setLoading(false);
      // Check if registration was successful
      if (response.data.success === true) {
        showModal('Success', 'Registration successful!', 'success');
      } else {
        showModal('Error', 'Registration failed. Please try again.');
      }
      clearFormData();
    } catch (error) {
      console.error('Error during registration:', error);
      setLoading(false);

      // Handling different error cases
      if (error?.response?.status === 400) {
        const message =
          error?.response?.data?.message || 'User could not be created.';
        showModal('Error', message, 'error');
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
    <Provider>
      <NavBar
        data={{
          backButton: true,
          headingText: 'HIT',
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Custom Modal */}
        <CustomModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            navigation.navigate('Login');
          }}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />

        <Text style={styles.heading}>Register</Text>

        {/* Dropdown for Course Type (UG / PG) */}
        <Dropdown
          style={[
            styles.dropdown,
            isFocusCourseType && {borderColor: '#007bff'},
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={courseTypeOptions}
          labelField="label"
          valueField="value"
          placeholder={!isFocusCourseType ? 'Select Course Type' : '...'}
          value={courseType}
          onFocus={() => setIsFocusCourseType(true)}
          onBlur={() => setIsFocusCourseType(false)}
          onChange={item => {
            setCourseType(item.value);
            setCourseName(null); // Reset courseName when courseType changes
            handleChange('courseType', item.value);
            setIsFocusCourseType(false);
          }}
        />

        {/* Dropdown for Course Name (Filtered based on courseType) */}
        <Dropdown
          style={[
            styles.dropdown,
            isFocusCourseName && {borderColor: '#007bff'},
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={courseNameOptions}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusCourseName ? 'Select Course Name' : '...'}
          searchPlaceholder="Search..."
          value={courseName}
          onFocus={() => setIsFocusCourseName(true)}
          onBlur={() => setIsFocusCourseName(false)}
          onChange={item => {
            setCourseName(item.value);
            handleChange('courseName', item.value);
            setIsFocusCourseName(false);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={form.name}
          onChangeText={text => handleChange('name', text)}
        />
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
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
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
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  inputSearchStyle: {
    height: 40,
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

export default RegistrationScreen;
