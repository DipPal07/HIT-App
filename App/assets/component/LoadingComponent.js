// DataNotFound.js
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
  },
});

export default LoadingComponent;
