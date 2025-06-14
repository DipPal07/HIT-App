import {ImageBackground, StyleSheet, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropdownSelectList from '../assets/component/DropdownSelectList';
import NavBar from '../assets/component/NavBar';
import Button from '../assets/component/Button';
import DocumentPicker from 'react-native-document-picker';
import api from '../utils/api';
import URL from '../assets/constant/url';
import {UserRole} from '../assets/constant/userConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../assets/component/CoustomModal';
import {darkTheme, lightTheme} from '../assets/constant/themes';

const Syllabus = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [userType, setUserType] = useState(UserRole.NOTLOGIN);
  const [dropDownData, setDropSownData] = useState();

  // ✅ Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');

  const dropdownListDataHandel = data => {
    setDropSownData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = await AsyncStorage.getItem('role');
        if (userRole) setUserType(userRole);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const buttonHandel = () => {
    if (!dropDownData) {
      showModal('Warning', 'Please select a course', 'warning');
      return;
    }

    navigation.navigate('SeePdf', {
      data: dropDownData,
      uri: URL.getSyllabus.url,
    });
  };

  const showModal = (title, message, type = 'info') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const handleUpload = async () => {
    if (!dropDownData) {
      showModal('Error', 'Please select a course before uploading.', 'error');
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

      const response = await api.post('/api/syllabus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
      showModal('Success', 'Syllabus uploaded successfully!', 'success');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');

        return;
      }

      console.error('Upload error:', err);

      if (err.response) {
        showModal(
          'Server Error',
          err.response.data?.message || 'Something went wrong on the server.',
          'error',
        );
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
            headingText: 'Syllabus',
          }}
        />
        <View style={styles.contentWrapper}>
          <DropdownSelectList dropdowninfo={dropdownListDataHandel} />
          <Button data={{title: 'Search'}} onPress={buttonHandel} />
          {userType === UserRole.ADMIN && (
            <View style={styles.uploadButtonWrapper}>
              <Button
                data={{title: 'Upload Syllabus'}}
                onPress={handleUpload}
              />
            </View>
          )}
        </View>
      </ImageBackground>

      {/* ✅ Custom Modal usage */}
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

export default Syllabus;

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
