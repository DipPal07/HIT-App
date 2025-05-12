import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios'; // make sure axios is installed
import URL from '../assets/constant/url';
import api from '../utils/api';
import NavBar from '../assets/component/NavBar';

const CreateNotice = () => {
  const themes = useColorScheme();
  const [noticeNo, setNoticeNo] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirmDate = selectedDate => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handlePickPdf = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      setPdf(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error picking PDF', err.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!noticeNo || !pdf) {
      Alert.alert('Error', 'Please fill all fields and select a PDF.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('pdf', {
        uri: pdf.uri,
        name: pdf.name,
        type: pdf.type || 'application/pdf',
      });
      formData.append('noticeNo', noticeNo);
      formData.append('date', date.toISOString().split('T')[0]); // e.g. '2024-05-12'

      const response = await api.post(
        URL.createNotice.url, // replace with your actual API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);

      Alert.alert('Success', 'Notice uploaded successfully!');
      setNoticeNo('');
      setPdf(null);
      setDate(new Date());
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Upload Failed',
        error?.response?.data?.message || 'Error uploading notice',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Create Notice',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Notice No:</Text>
        <TextInput
          style={styles.input}
          value={noticeNo}
          onChangeText={setNoticeNo}
          placeholder="Enter notice number"
        />

        <Text style={styles.label}>Date:</Text>
        <Button title="Pick Date" onPress={showDatePicker} />
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date}
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        <Text style={styles.label}>PDF:</Text>
        <Button title="Pick PDF File" onPress={handlePickPdf} />
        {pdf && <Text style={styles.pdfName}>Selected: {pdf.name}</Text>}

        <View style={{marginTop: 20}}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Button title="Create Notice" onPress={handleSubmit} />
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
  },
  pdfName: {
    marginTop: 10,
    fontSize: 14,
    color: 'green',
  },
});
