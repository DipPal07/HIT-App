import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DropdownSelectList from '../assets/component/DropdownSelectList';
import NavBar from '../assets/component/NavBar';
import Button from '../assets/component/Button';
import DocumentPicker from 'react-native-document-picker';
import api from '../utils/api';
import URL from '../assets/constant/url';

const Syllabus = ({navigation}) => {
  const themes = useColorScheme();
  const [dropDownData, setDropSownData] = useState();

  const dropdownListDataHandel = data => {
    console.log(data);
    setDropSownData(data);
  };

  const buttonHandel = () => {
    if (!dropDownData) {
      alert('Please select a course');
      return;
    }
    navigation.navigate('SeePdf', {
      data: dropDownData,
      uri: URL.getSyllabus.url,
    });
    console.log('button pressed....');
  };

  const handleUpload = async () => {
    if (dropDownData) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });

        const formData = new FormData();

        formData.append('pdf', {
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type || 'application/pdf', // adjust MIME if known
        });

        formData.append('courseName', dropDownData.courseName);
        formData.append('semester', dropDownData.semester);

        const response = await api.post('/api/syllabus', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload success:', response.data);
        alert('Syllabus uploaded successfully!');
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
        } else {
          console.error('Upload error: ', err);
        }
        if (err.response) {
          // Server responded with an error (non-2xx status)
          console.error(`Error: ${err.response.status}${err.response}`);
          console.error('Server response:', err.response.data);
        } else if (err.request) {
          // No response received (network error, server down, etc.)
          console.error('Network Error: No response received from the server');
          console.error('Request details:', err.request);
        } else {
          // Error in setting up the request (e.g., invalid URL)
          console.error('Error in setting up the request:', err.message);
        }
      }
    } else {
      alert('Please select a course');
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
            headingText: 'Syllabus',
          }}
        />
        <View style={{top: '15%'}}>
          <DropdownSelectList dropdowninfo={dropdownListDataHandel} />
          <Button data={{title: 'Search'}} onPress={buttonHandel} />
          <Button
            style={{margin: '10px', left: '10px'}}
            data={{title: 'Upload Syllabus'}}
            onPress={handleUpload}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Syllabus;

const styles = StyleSheet.create({});
