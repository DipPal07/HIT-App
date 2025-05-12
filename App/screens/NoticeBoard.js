import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavBar from '../assets/component/NavBar';
import NoticeData from '../assets/component/NoticeData';
import api from '../utils/api';
import URL from '../assets/constant/url';
import Pdf from 'react-native-pdf';
import {FormatDate} from '../utils/CommonUtils';
import {useNavigation} from '@react-navigation/native';

const NoticeBoard = ({route}) => {
  const navigation = useNavigation();
  const [noticeData, setNoticeData] = useState([]);
  const themes = JSON.stringify(route.params);
  console.log(themes);
  console.log(NoticeData);

  const fetchNoticeData = async () => {
    try {
      const response = await api.get('/api/notice');
      console.log(response.data);
      setNoticeData(response.data.data);
    } catch (error) {
      console.error('Error fetching notice data:', error);
    }
  };

  useEffect(() => {
    fetchNoticeData();
  }, []);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Notice Board',
        }}
      />
      <FlatList
        data={noticeData}
        renderItem={(item, index) => {
          return (
            <View style={styles.cardStyle}>
              <View
                style={{
                  bottom: 13,
                  // height: 30,
                  width: 90,
                  backgroundColor: '#FF3818',
                  borderRadius: 10,
                  left: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                  padding: 5,
                }}>
                <Text style={{color: 'white', fontWeight: '600'}}>
                  {FormatDate(item.item.date)}
                </Text>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ShowPdfFullViewMode', {
                      uri: `${URL.baseUri}${item.item.link}`,
                    })
                  }>
                  <Pdf
                    trustAllCerts={false}
                    source={{
                      uri: `${URL.baseUri}${item.item.link}`,
                      cache: true,
                    }}
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
                    style={{
                      // width: width, // Set width to 100% of the screen
                      height: height - 220, // Subtract padding for navbar and other content
                      paddingHorizontal: 0,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('CreateNotice')}>
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
    </View>
  );
};

export default NoticeBoard;

const styles = StyleSheet.create({
  cardStyle: {
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 10,
    marginTop: 20,
    paddingBottom: 10,
  },
  pdf: {
    // width: '100%', // Make sure it's full width
    height: '100%', // Adjust the height dynamically
  },
});
