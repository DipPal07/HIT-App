// DataNotFound.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const DataNotFound = ({reload}) => {
  // console.log(reload);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📭 No Data Found</Text>
      <Text style={styles.subtext}>Try again later or refresh the page.</Text>
      {reload && (
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: '#1B3058',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={reload}>
          <Text style={{color: 'white'}}>Reload</Text>
        </TouchableOpacity>
      )}
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

export default DataNotFound;
