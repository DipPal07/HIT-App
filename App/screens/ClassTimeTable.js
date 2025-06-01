import {ImageBackground, StyleSheet, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropdownSelectList from '../assets/component/DropdownSelectList';
import NavBar from '../assets/component/NavBar';
import Button from '../assets/component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserRole} from '../assets/constant/userConstant';
import DocumentPicker from 'react-native-document-picker';
import api from '../utils/api';
import URL from '../assets/constant/url';
import CustomModal from '../assets/component/CoustomModal';
import {darkTheme, lightTheme} from '../assets/constant/themes';

const ClassTimeTable = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [userType, setUserType] = useState(UserRole.NOTLOGIN);
  const [dropDownData, setDropSownData] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = await AsyncStorage.getItem('role');
        if (userRole) {
          setUserType(userRole);
        }
        console.log('User Role:', userRole);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const showModal = (title, message, type = 'info') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const dropdownListDataHandel = data => {
    console.log('Selected Course:', data);
    setDropSownData(data);
  };

  const buttonHandel = () => {
    if (!dropDownData) {
      showModal('Missing Selection', 'Please select a course.', 'error');
      return;
    }

    navigation.navigate('SeePdf', {
      data: dropDownData,
      uri: URL.getClassRoutine.url,
    });
    console.log(URL.getClassRoutine.url);

    console.log('Navigated to SeePdf with:', dropDownData);
  };

  const handleUpload = async () => {
    if (!dropDownData) {
      showModal('Missing Selection', 'Please select a course.', 'error');
      return;
    }

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      const formData = new FormData();
      formData.append('pdf', {
        uri: res[0].uri,
        name: res[0].name,
        type: res[0].type || 'application/pdf',
      });
      formData.append('courseName', dropDownData.courseName);
      formData.append('semester', dropDownData.semester);

      const response = await api.post('/api/class-routine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
      showModal(
        'Upload Successful',
        'Class routine uploaded successfully.',
        'success',
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
        return;
      }

      console.error('Upload error:', err);

      if (err.response?.data?.message) {
        showModal('Server Error', err.response.data.message, 'error');
      } else if (err.message === 'Network Error') {
        showModal(
          'Network Error',
          'Please check your internet connection.',
          'error',
        );
      } else {
        showModal('Unexpected Error', err.message, 'error');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          colorScheme == 'light'
            ? require('../assets/backgroundImage/2.jpg')
            : require('../assets/backgroundImage/image.png')
        }
        style={styles.background}>
        <NavBar
          data={{
            backButton: true,
            headingText: 'Class Time Table',
          }}
        />
        <View style={styles.contentWrapper}>
          <DropdownSelectList dropdowninfo={dropdownListDataHandel} />
          <Button data={{title: 'Search'}} onPress={buttonHandel} />
          {userType === UserRole.ADMIN && (
            <View style={styles.uploadButtonWrapper}>
              <Button data={{title: 'Upload'}} onPress={handleUpload} />
            </View>
          )}
        </View>
      </ImageBackground>

      {/* ✅ Status Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </View>
  );
};

export default ClassTimeTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    top: '15%',
    paddingHorizontal: 20,
  },
  uploadButtonWrapper: {
    marginTop: 20,
  },
});
