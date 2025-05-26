import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {darkTheme, lightTheme} from '../constant/themes';

const Button = props => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        backgroundColor: theme.button,

        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
        marginVertical: 10,
      }}
      onPress={() => {
        props.onPress();
        // console.log(props.data.buttonHandel);
      }}>
      <Text style={{color: theme.buttonText, fontWeight: 'bold', fontSize: 20}}>
        {props.data.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
