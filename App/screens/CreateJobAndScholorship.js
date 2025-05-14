import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dropdown} from 'react-native-element-dropdown';
import api from '../utils/api';
import URL from '../assets/constant/url';
import NavBar from '../assets/component/NavBar';

const CreateJobAndScholarship = () => {
  const themes = useColorScheme();
  const [type, setType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [lastApplyDate, setLastApplyDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = selectedDate => {
    setLastApplyDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = async () => {
    if (
      !type ||
      !companyName ||
      !title ||
      !description ||
      !eligibility ||
      !applyLink
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const noticeData = {
        type,
        companyName,
        title,
        description,
        lastApplyDate: lastApplyDate.toISOString().split('T')[0],
        applyLink,
        eligibility,
      };

      const response = await api.post(URL.jobAndScholarship.url, noticeData, {
        headers: {'Content-Type': 'application/json'},
      });

      Alert.alert('Success', 'Notice uploaded successfully!');
      setType('');
      setCompanyName('');
      setTitle('');
      setDescription('');
      setEligibility('');
      setApplyLink('');
      setLastApplyDate(new Date());
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
          headingText: 'Create Job/Scholarship',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.label, {marginTop: 0}]}>Type</Text>
        <Dropdown
          data={[
            {label: 'Scholarship', value: 'scholarship'},
            {label: 'Job', value: 'job'},
          ]}
          value={type}
          onChange={item => setType(item.value)}
          labelField="label"
          valueField="value"
          placeholder="Select Type"
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
        />

        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="Enter company name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter job/scholarship title"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor="#999"
          multiline
        />

        <Text style={styles.label}>Eligibility</Text>
        <TextInput
          style={styles.input}
          value={eligibility}
          onChangeText={setEligibility}
          placeholder="Enter eligibility"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Apply Link</Text>
        <TextInput
          style={styles.input}
          value={applyLink}
          onChangeText={setApplyLink}
          placeholder="Enter apply link"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Last Apply Date</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text style={styles.dateText}>
            {lastApplyDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={lastApplyDate}
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Notice</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateJobAndScholarship;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    justifyContent: 'center',
  },
  placeholder: {
    color: '#999',
  },
  selectedText: {
    color: '#333',
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
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
