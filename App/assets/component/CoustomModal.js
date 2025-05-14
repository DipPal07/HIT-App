import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomModal = ({visible, onClose, title, message, type = 'error'}) => {
  const iconProps = {
    error: {name: 'alert-circle-outline', color: '#FF3B30'},
    warning: {name: 'warning-outline', color: '#FF9500'},
    info: {name: 'information-circle-outline', color: '#007AFF'},
    success: {name: 'checkmark-circle-outline', color: '#34C759'},
  }[type];

  return (
    <Modal isVisible={visible}>
      <View style={modalStyles.modalContainer}>
        <Icon name={iconProps.name} size={40} color={iconProps.color} />
        <Text style={modalStyles.title}>{title}</Text>
        <Text style={modalStyles.message}>{message}</Text>
        <TouchableOpacity style={modalStyles.button} onPress={onClose}>
          <Text style={modalStyles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;
const modalStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
