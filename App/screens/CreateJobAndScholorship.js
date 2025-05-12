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
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dropdown} from 'react-native-element-dropdown'; // Import Dropdown
import axios from 'axios'; // make sure axios is installed
import URL from '../assets/constant/url';
import api from '../utils/api';
import NavBar from '../assets/component/NavBar';
const CreateJobAndScholarship = () => {
  const themes = useColorScheme();
  const [type, setType] = useState(''); // Dropdown value for type
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
    // Ensure all required fields are filled
    if (
      !type ||
      !companyName ||
      !title ||
      !description ||
      !eligibility ||
      !applyLink
    ) {
      Alert.alert(
        'Error',
        'Please fill all fields and select a valid image URL.',
      );
      return;
    }

    try {
      setLoading(true);

      // Create the JSON data object
      const noticeData = {
        type, // scholarship or job
        companyName, // e.g., TechNova Inc.
        title, // job title or scholarship title
        description, // job description or scholarship details
        lastApplyDate: lastApplyDate.toISOString().split('T')[0], // Convert date to YYYY-MM-DD format
        applyLink, // link to apply
        eligibility, // eligibility criteria (e.g., MCA)
      };

      // Send the data to the API endpoint
      const response = await api.post(
        URL.jobAndScholarship.url, // Replace with your actual API endpoint
        noticeData, // Send the data as a JSON object
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);

      Alert.alert('Success', 'Notice uploaded successfully!');
      // Clear the form fields after submission
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
          headingText: 'Create Notice',
        }}
      />
      <View style={styles.container}>
        {/* Dropdown for selecting type */}
        <Text style={styles.label}>Type:</Text>
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
          style={styles.input}
        />

        {/* Company Name */}
        <Text style={styles.label}>Company Name:</Text>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="Enter company name"
        />

        {/* Title */}
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter job title or scholarship title"
        />

        {/* Description */}
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter job description or scholarship details"
          multiline
        />

        {/* Eligibility */}
        <Text style={styles.label}>Eligibility:</Text>
        <TextInput
          style={styles.input}
          value={eligibility}
          onChangeText={setEligibility}
          placeholder="Enter eligibility criteria"
        />

        {/* Apply Link */}
        <Text style={styles.label}>Apply Link:</Text>
        <TextInput
          style={styles.input}
          value={applyLink}
          onChangeText={setApplyLink}
          placeholder="Enter apply link"
        />

        {/* Date Picker */}
        <Text style={styles.label}>Last Apply Date:</Text>
        <Button title="Pick Date" onPress={showDatePicker} />
        <Text style={styles.dateText}>
          {lastApplyDate.toLocaleDateString()}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={lastApplyDate}
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        {/* Submit Button */}
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

export default CreateJobAndScholarship;

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
});
