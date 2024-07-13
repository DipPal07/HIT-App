import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        backgroundColor: 'black',
        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
      }}
      onPress={() => {
        props.onPress();
        // console.log(props.data.buttonHandel);
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
        {props.data.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
