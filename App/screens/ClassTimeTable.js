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

const ClassTimeTable = ({navigation}) => {
  const [userType, setUserType] = useState(UserRole.NOTLOGIN);
  const [dropDownData, setDropSownData] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

  const themes = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = await AsyncStorage.getItem('role');
        if (userRole) {
          setUserType(userRole);
        }
        console.log(userRole);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const showModal = (title, message, type) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const dropdownListDataHandel = data => {
    console.log(data);
    setDropSownData(data);
  };

  const buttonHandel = () => {
    if (!dropDownData) {
      showModal('Missing Selection', 'Please select a course', 'error');
      return;
    }
    navigation.navigate('SeePdf', {
      data: dropDownData,
      uri: URL.getClassRoutine.url,
    });
    console.log('button pressed....');
  };

  const handleUpload = async () => {
    if (!dropDownData) {
      showModal('Missing Selection', 'Please select a course', 'error');
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
        'The class routine was uploaded successfully.',
        'success',
      );
    } catch (err) {
      let errorMsg = 'An unexpected error occurred. Please try again.';

      if (DocumentPicker.isCancel(err)) {
        errorMsg = 'Upload cancelled by user.';
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }

      console.error('Upload error: ', err);
      showModal('Upload Failed', errorMsg, 'error');
    }
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/backgroundImage/2.jpg')}
        style={{height: '100%', width: '100%'}}>
        <NavBar
          data={{
            backButton: true,
            currentThemes: themes,
            headingText: 'Class Time Table',
          }}
        />
        <View style={{top: '15%'}}>
          <DropdownSelectList dropdowninfo={dropdownListDataHandel} />
          <Button data={{title: 'Search'}} onPress={buttonHandel} />
          {userType === UserRole.ADMIN && (
            <Button
              style={{margin: '10px', left: '10px'}}
              data={{title: 'Upload'}}
              onPress={handleUpload}
            />
          )}
        </View>

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />
      </ImageBackground>
    </View>
  );
};

export default ClassTimeTable;

const styles = StyleSheet.create({});
