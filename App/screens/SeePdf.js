import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, useColorScheme, View} from 'react-native';
import Pdf from 'react-native-pdf';

import NavBar from '../assets/component/NavBar';
import URL from '../assets/constant/url';
import api from '../utils/api';

import LoadingComponent from '../assets/component/LoadingComponent';
import NetworkIssue from '../assets/component/NetworkIssue';
import ServerError from '../assets/component/ServerError';
import DataNotFound from '../assets/component/DataNotFound';
import {darkTheme, lightTheme} from '../assets/constant/themes';

export default function SeePdf({route}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [pdfUri, setPdfUri] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState(null); // null | 'network' | 'server' | 'notFound'

  const {data, uri} = route.params;
  const fetchPdf = async () => {
    try {
      setLoading(true);
      setErrorType(null);

      const response = await api.get(`${URL.baseUri}${uri}`, {
        params: {
          courseName: data.courseName,
          semester: data.semester,
        },
      });

      const link = response?.data?.data?.link;

      if (link) {
        setPdfUri(`${URL.baseUri}${link}`);
      } else {
        setErrorType('notFound');
      }
    } catch (err) {
      if (err.message?.includes('Network')) {
        setErrorType('network');
      } else if (err.response?.status >= 500) {
        setErrorType('server');
      } else {
        setErrorType('notFound');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPdf();
  }, [data, uri]);

  const renderContent = () => {
    if (loading) return <LoadingComponent />;
    if (errorType === 'network') return <NetworkIssue reload={fetchPdf} />;
    if (errorType === 'server') return <ServerError reload={fetchPdf} />;
    if (errorType === 'notFound') return <DataNotFound reload={fetchPdf} />;

    return (
      <Pdf
        trustAllCerts={false}
        source={{uri: pdfUri, cache: true}}
        onLoadComplete={numberOfPages => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={page => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log('PDF load error:', error);
          setErrorType('notFound');
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={[styles.pdf, {backgroundColor: theme.background}]}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <NavBar
        data={{
          backButton: true,
          headingText: 'See Pdf',
        }}
      />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
