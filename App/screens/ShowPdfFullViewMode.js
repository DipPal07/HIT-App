import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import NavBar from '../assets/component/NavBar';
import URL from '../assets/constant/url';
import {logout} from '../utils/api';
import {darkTheme, lightTheme} from '../assets/constant/themes';

export default function ShowPdfFullViewMode({route}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [pdfUri, setPdfUri] = useState('');
  const [error, setError] = useState(false);
  const {uri} = route.params;
  console.log(uri);

  useEffect(() => {
    setError(false);

    setPdfUri(uri);
  }, []);

  return (
    <View style={styles.container}>
      <NavBar
        data={{
          backButton: true,
          headingText: 'Notice',
        }}
      />

      {error && (
        <View>
          <Text>Something went wrong</Text>
        </View>
      )}

      {pdfUri && (
        <Pdf
          trustAllCerts={false}
          source={{uri: pdfUri, cache: true}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={[
            styles.pdf,
            {
              backgroundColor: theme.background,
            },
          ]}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
