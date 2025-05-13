import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavBar from '../assets/component/NavBar';
import {WebView} from 'react-native-webview';

const ReportCard = ({route, navigation}) => {
  const themes = JSON.stringify(route.params);
  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Report Card',
        }}
      />
      {/* <Text>Dip</Text> */}
      <WebView
        source={{uri: 'https://hit.ucanapply.com/'}}
        style={{flex: 1, marginHorizontal: 10}}
      />
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({});
