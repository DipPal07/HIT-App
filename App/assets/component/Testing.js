import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';

const Testing = () => {
  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error: ', err);
      }
    }
  };

  return (
    <View>
      <Text>Document picker</Text>
      <Button title="Pick Document" onPress={selectDoc} />
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
