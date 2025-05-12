import {
  Button,
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import NavBar from '../assets/component/NavBar';
import Placement from '../assets/component/Placement';
import JobAndScholarshipData from '../assets/component/JobAndScholarshipData';
import URL from '../assets/constant/url';
import api from '../utils/api';
import {FormatDate} from '../utils/CommonUtils';
import {AuthContext} from '../utils/AuthContext';

const ScholarshipAndJob = ({route, navigation}) => {
  const {isAdmin} = useContext(AuthContext);
  const themes = JSON.stringify(route.params);
  const [jobAndScholarshipData, setJobAndScholarshipData] = useState(
    JobAndScholarshipData,
  );
  const fetchJobAndScholarshipData = async () => {
    try {
      const response = await api.get(URL.jobAndScholarship.url);
      console.log(response.data);
      setJobAndScholarshipData(response.data.data);
    } catch (error) {
      console.error('Error fetching job and scholarship data:', error.response);
    }
  };
  useEffect(() => {
    fetchJobAndScholarshipData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Scholarship & Job',
        }}
      />
      <Placement />

      <Text style={styles.headingText}>Scholarship And Job Update</Text>
      <FlatList
        data={jobAndScholarshipData}
        renderItem={(item, index) => {
          return (
            <View style={styles.cardStyle}>
              <View
                style={{
                  bottom: 13,
                  height: 30,
                  width: 90,
                  backgroundColor: '#FF3818',

                  borderRadius: 10,
                  left: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                }}>
                <Text style={{color: 'white', fontWeight: '600'}}>
                  {item.item.type}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // position: 'absolute',
                }}>
                <View style={{left: 10, flex: 1}}>
                  <Text
                    style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                    {item.item.companyName}
                  </Text>
                </View>
                <View
                  style={{
                    right: 10,

                    bottom: 20,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '800',
                      backgroundColor: '#00FF13',
                      padding: 3,
                      borderRadius: 8,
                      borderColor: 'white',
                    }}>
                    Last Date : {FormatDate(item.item.lastApplyDate)}
                    {/* {item.item.date} */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#E1ECEB',
                  margin: 8,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    marginBottom: 1,
                    color: 'black',
                  }}>
                  {item.item.title}
                </Text>
                <Text>{item.item.description}</Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    marginBottom: 1,
                    // color: 'black',
                  }}>
                  Eligibility
                </Text>
                <Text>{item.item.eligibility}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.item.applyLink)}>
                  <View
                    style={{
                      width: 110,
                      backgroundColor: 'black',
                      marginTop: 10,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation: 3,
                    }}>
                    <Text style={{color: 'white', fontWeight: '600'}}>
                      Apply Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {isAdmin && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateJobAndScholarship')}>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              backgroundColor: '#c2c2c2',
              borderRadius: 50,
              elevation: 5,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 30, color: 'white'}}>+</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScholarshipAndJob;

const styles = StyleSheet.create({
  cardStyle: {
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    // height: 200,
    marginBottom: 10,
    elevation: 10,
    marginTop: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    paddingLeft: 10,
    // position: 'absolute',
  },
});
