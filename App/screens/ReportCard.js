import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import NavBar from '../assets/component/NavBar';
import {WebView} from 'react-native-webview';

const ReportCard = ({route, navigation}) => {
  const themes = JSON.stringify(route.params);
  const [loading, setLoading] = useState(true);

  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Report Card',
        }}
      />

      {loading && (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      )}

      <WebView
        source={{uri: 'https://hit.ucanapply.com/'}}
        style={{flex: 1, marginHorizontal: 10}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 1,
  },
});
