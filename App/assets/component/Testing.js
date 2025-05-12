import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Testing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Show Date Picker" onPress={showDatePicker} />

      <Text style={{marginTop: 20}}>
        Selected Date: {date.toLocaleDateString()}
      </Text>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Testing;
