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
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../assets/component/NavBar';
import CustomModal from '../assets/component/CoustomModal';
import api from '../utils/api';
import URL from '../assets/constant/url';
import {darkTheme, lightTheme} from '../assets/constant/themes';

const ForgotPassword = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('error');

  const showModal = (title, message, type = 'error') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      showModal('Missing Fields', 'Please fill all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showModal('Password Mismatch', 'New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(URL.changePassword.url, {
        email,
        currentPassword,
        newPassword,
      });

      showModal('Success', 'Password changed successfully!', 'success');
      setEmail('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Failed to change password.';
      showModal('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <NavBar
        data={{
          backButton: true,
          headingText: 'Change Password',
        }}
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />

      <View style={styles.container}>
        <Text style={[styles.label, {color: theme.inputLabel}]}>Email</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
            },
          ]}
          placeholder="Enter your email"
          placeholderTextColor={theme.inputText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Current Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
            },
          ]}
          placeholder="Current password"
          placeholderTextColor={theme.inputText}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          New Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
            },
          ]}
          placeholder="New password"
          placeholderTextColor={theme.inputText}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={[styles.label, {color: theme.inputLabel}]}>
          Confirm New Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.textInputBackground,
              color: theme.inputText,
            },
          ]}
          placeholder="Confirm new password"
          placeholderTextColor={theme.inputText}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.submitButton, {backgroundColor: theme.button}]}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.submitButtonText, {color: theme.buttonText}]}>
              Change Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
