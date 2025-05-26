import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {Text} from 'react-native-paper';
import NavBar from '../assets/component/NavBar';
import {darkTheme, lightTheme} from '../assets/constant/themes';

function ComingSoon({navName, themes}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <>
      <NavBar
        data={{
          backButton: true,
          headingText: navName || 'HIT',
        }}
      />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={[styles.text, {color: theme.text}]}>Coming Soon</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills the entire space
    justifyContent: 'center', // centers vertically
    alignItems: 'center', // centers horizontally
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ComingSoon;
