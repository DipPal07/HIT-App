import {
  Button,
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import NavBar from '../assets/component/NavBar';
import Placement from '../assets/component/Placement';
import URL from '../assets/constant/url';
import api from '../utils/api';
import {FormatDate} from '../utils/CommonUtils';
import {AuthContext} from '../utils/AuthContext';
import NetworkIssue from '../assets/component/NetworkIssue';
import DataNotFound from '../assets/component/DataNotFound';
import ServerError from '../assets/component/ServerError';
import LoadingComponent from '../assets/component/LoadingComponent';
import {darkTheme, lightTheme} from '../assets/constant/themes';

const ScholarshipAndJob = ({route, navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const styles = themedStyles(theme);
  const {isAdmin} = useContext(AuthContext);

  const [jobAndScholarshipData, setJobAndScholarshipData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const setAllErrorFalse = () => {
    setIsNetworkError(false);
    setIsNotFound(false);
    setIsServerError(false);
  };

  const fetchJobAndScholarshipData = async () => {
    setAllErrorFalse();
    try {
      if (!refreshing) setIsLoading(true);
      const response = await api.get(URL.jobAndScholarship.url);
      setJobAndScholarshipData(response.data.data);
    } catch (error) {
      console.error('Error fetching job and scholarship data:', error);

      if (error.response) {
        if (error.response.status >= 500) {
          setIsServerError(true);
        } else {
          setIsNotFound(true);
        }
      } else if (error.request) {
        setIsNetworkError(true);
      } else {
        console.error('Error in setting up the request:', error.message);
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobAndScholarshipData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobAndScholarshipData();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <NavBar
        data={{
          backButton: true,
          headingText: 'Scholarship & Job',
        }}
      />

      <Placement />

      <Text style={styles.headingText}>Scholarship And Job Update</Text>

      {jobAndScholarshipData.length > 0 && (
        <FlatList
          data={jobAndScholarshipData}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item}) => (
            <View style={styles.cardStyle}>
              <View style={[styles.typeBox, {backgroundColor: theme.dateBox}]}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>

              <View style={styles.headerRow}>
                <View style={styles.companyBox}>
                  <Text style={styles.companyName}>{item.companyName}</Text>
                </View>
                <View style={styles.lastDateBox}>
                  <Text
                    style={[
                      styles.lastDateText,
                      {backgroundColor: theme.primary},
                    ]}>
                    Last Date : {FormatDate(item.lastApplyDate)}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.descriptionBox,
                  {backgroundColor: theme.secondaryCard},
                ]}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={{color: theme.text}}>{item.description}</Text>
                <Text style={styles.eligibilityText}>Eligibility</Text>
                <Text style={{color: theme.text}}>{item.eligibility}</Text>

                <TouchableOpacity
                  onPress={() => Linking.openURL(item.applyLink)}>
                  <View
                    style={[
                      styles.applyButton,
                      {backgroundColor: theme.button},
                    ]}>
                    <Text style={[styles.applyText, {color: theme.buttonText}]}>
                      Apply Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {isNetworkError && <NetworkIssue reload={fetchJobAndScholarshipData} />}
      {isNotFound && <DataNotFound reload={fetchJobAndScholarshipData} />}
      {isServerError && <ServerError reload={fetchJobAndScholarshipData} />}
      {isLoading && !refreshing && <LoadingComponent />}

      {isAdmin && (
        <TouchableOpacity
          style={[styles.addButton, {backgroundColor: theme.primary}]}
          onPress={() => navigation.navigate('CreateJobAndScholarship')}>
          <View>
            <Text style={{fontSize: 30, color: theme.buttonText}}>+</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScholarshipAndJob;

// Reusable style function for dynamic theming
const themedStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    cardStyle: {
      width: '95%',
      backgroundColor: theme.card,
      alignSelf: 'center',
      borderRadius: 20,
      marginBottom: 10,
      elevation: 10,
      marginTop: 20,
    },
    headingText: {
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      paddingLeft: 10,
      color: theme.text,
    },
    typeBox: {
      bottom: 13,
      height: 30,
      width: 90,
      borderRadius: 10,
      left: 5,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    typeText: {
      color: theme.buttonText,
      fontWeight: '600',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    companyBox: {
      left: 10,
      flex: 1,
    },
    companyName: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
    },
    lastDateBox: {
      right: 10,
      bottom: 20,
      flex: 1,
    },
    lastDateText: {
      fontWeight: '800',
      padding: 3,
      borderRadius: 8,
      color: theme.buttonText,
    },
    descriptionBox: {
      margin: 8,
      paddingHorizontal: 10,
      borderRadius: 10,
      paddingBottom: 10,
    },
    titleText: {
      fontSize: 15,
      fontWeight: '600',
      marginBottom: 1,
      color: theme.text,
    },
    eligibilityText: {
      fontSize: 15,
      fontWeight: '600',
      marginBottom: 1,
      color: theme.text,
    },
    applyButton: {
      width: 110,
      marginTop: 10,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    applyText: {
      fontWeight: '600',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderRadius: 50,
      elevation: 5,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
