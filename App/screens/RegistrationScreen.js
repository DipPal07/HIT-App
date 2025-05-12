import React, {useState} from 'react';
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
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import facultyData from '../assets/component/FacultyData';
import api from '../utils/api';
import URL from '../assets/constant/url';

const RegistrationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [courseType, setCourseType] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [isFocusCourseType, setIsFocusCourseType] = useState(false);
  const [isFocusCourseName, setIsFocusCourseName] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    courseType: '',
    courseName: '',
  });

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

  const handleChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const {name, email, password, courseType, courseName} = form;

    if (!name || !email || !password || !courseType || !courseName) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      console.log('Submitting data:');

      const response = await api.post('/api/register', {
        name,
        email,
        password,
        courseType,
        courseName,
      });

      console.log(response);

      // Axios wraps response data in `response.data`
      if (response.data.success === true) {
        Alert.alert('Success', 'Registration successful!');
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
      console.log(response.data);

      console.log('Submitted data:', {
        name,
        email,
        password,
        courseType,
        courseName,
      });
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
      // setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Provider>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
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
            <Button title="Register" onPress={handleSubmit} color="#4CAF50" />
          </View>
        </ScrollView>
      )}
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
    marginTop: 20,
  },
});

export default RegistrationScreen;
