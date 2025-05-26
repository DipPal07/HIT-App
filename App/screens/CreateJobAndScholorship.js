import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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
import {lightTheme, darkTheme} from '../assets/constant/themes';
import CustomModal from '../assets/component/CoustomModal';
import {useNavigation} from '@react-navigation/native';

const CreateJobAndScholarship = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [type, setType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [lastApplyDate, setLastApplyDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');
  const showModal = (title, message, type = 'info') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };
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

      await api.post(URL.jobAndScholarship.url, noticeData, {
        headers: {'Content-Type': 'application/json'},
      });

      showModal(
        'Success',
        'Job/Scholarship notice created successfully',
        'success',
      );
      setType('');
      setCompanyName('');
      setTitle('');
      setDescription('');
      setEligibility('');
      setApplyLink('');
      setLastApplyDate(new Date());
    } catch (error) {
      showModal(
        'Error',
        error?.response?.data?.message || 'Error uploading notice',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <NavBar
        data={{
          backButton: true,
          headingText: 'Create Job/Scholarship',
        }}
      />
      <ScrollView style={[styles.container]}>
        <Text style={[styles.label, {color: theme.inputLabel}]}>Type</Text>
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
          containerStyle={{
            backgroundColor: theme.textInputBackground,
            borderRadius: 8,
          }}
          itemTextStyle={{color: theme.inputText}}
          itemContainerStyle={{
            borderRadius: 8,
          }}
          activeColor={'#45ff4e'}
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.textInputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholderStyle={{
            color: 'black',
            backgroundColor: theme.textInputBackground,
          }}
          selectedTextStyle={{color: theme.inputText}}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Company Name
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
              borderColor: theme.border,
            },
          ]}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="Enter company name"
          placeholderTextColor={theme.inputText}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>Title</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
              borderColor: theme.border,
            },
          ]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter job/scholarship title"
          placeholderTextColor={theme.inputText}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Description
        </Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
              borderColor: theme.border,
            },
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor={theme.inputText}
          multiline
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Eligibility
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
              borderColor: theme.border,
            },
          ]}
          value={eligibility}
          onChangeText={setEligibility}
          placeholder="Enter eligibility"
          placeholderTextColor={theme.inputText}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Apply Link
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
              borderColor: theme.border,
            },
          ]}
          value={applyLink}
          onChangeText={setApplyLink}
          placeholder="Enter apply link"
          placeholderTextColor={theme.inputText}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Last Apply Date
        </Text>
        <TouchableOpacity
          onPress={showDatePicker}
          style={[
            styles.datePicker,
            {backgroundColor: theme.textInputBackground},
          ]}>
          <Text style={[styles.dateText, {color: theme.inputText}]}>
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
            <ActivityIndicator size="large" color={theme.button} />
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: theme.button, marginBottom: 20},
              ]}
              onPress={handleSubmit}>
              <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                Create Notice
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <CustomModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            navigation.navigate('ScholarshipAndJob');
          }}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />
      </ScrollView>
    </View>
  );
};

export default CreateJobAndScholarship;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  datePicker: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
