import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import URL from '../assets/constant/url';
import api from '../utils/api';
import NavBar from '../assets/component/NavBar';
import CustomModal from '../assets/component/CoustomModal';

const CreateNotice = () => {
  const themes = useColorScheme();
  const [noticeNo, setNoticeNo] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('error');

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const showModal = (title, message, type = 'error') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

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
        showModal('PDF Error', err.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!noticeNo || !pdf) {
      showModal('Missing Fields', 'Please fill all fields and select a PDF.');
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
      formData.append('date', date.toISOString().split('T')[0]);

      const response = await api.post(URL.createNotice.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // success
      showModal('Success', 'Notice uploaded successfully!', 'success');
      setNoticeNo('');
      setPdf(null);
      setDate(new Date());
    } catch (error) {
      console.error(error?.response?.data || error.message);

      if (error?.response?.status === 400) {
        showModal(
          'Notice Creation Failed',
          error?.response?.data?.message || 'Notice could not be created.',
          'error',
        );
      } else if (error?.response?.status === 500) {
        showModal(
          'Server Error',
          error?.response?.data?.message ||
            'Something went wrong on the server.',
          'error',
        );
      } else {
        showModal('Error', 'Unexpected error occurred.', 'error');
      }
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

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Notice No:</Text>
        <TextInput
          style={styles.input}
          value={noticeNo}
          onChangeText={setNoticeNo}
          placeholder="Enter notice number"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.datePicker} onPress={showDatePicker}>
          <Icon name="calendar-outline" size={20} color="#007AFF" />
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date}
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        <Text style={styles.label}>PDF File:</Text>
        <TouchableOpacity style={styles.pdfPicker} onPress={handlePickPdf}>
          <Icon name="document-attach-outline" size={20} color="#007AFF" />
          <Text style={styles.pdfText}>
            {pdf ? pdf.name : 'Pick a PDF file'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Create Notice</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    fontSize: 16,
    color: '#000',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  pdfPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  pdfText: {
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
