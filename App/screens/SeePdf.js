import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import NavBar from '../assets/component/NavBar';
import URL from '../assets/constant/url';

export default function SeePdf({route}) {
  const [pdfUri, setPdfUri] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {data, uri} = route.params;
  console.log(data);
  console.log(uri);

  const source = {
    uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
    cache: true,
  };

  useEffect(() => {
    setError(false);
    setLoading(true);
    console.log('helloooooooooooo');
    console.log(`${URL.baseUri}${URL.getClassRoutine.url}`);

    fetch(
      `${URL.baseUri}${uri}?courseName=${data.courseName}&semester=${data.semester}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setPdfUri(`${URL.baseUri}${json.data.link}`);
        console.log(pdfUri);
        console.log(json);

        setLoading(false);
      })
      .catch(err => {
        console.log('Fetch error:', err);
        setError(true);
        setLoading(false);
      });

    console.log('hiiiiiiii');
  }, []);

  return (
    <View style={styles.container}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: 'light',
          headingText: 'See Pdf',
        }}
      />
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
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
          style={styles.pdf}
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
