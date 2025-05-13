import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import NavBar from '../assets/component/NavBar';

function ComingSoon({navName, themes}) {
  return (
    <>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: navName || 'HIT',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Coming Soon</Text>
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
