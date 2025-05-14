import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import NavBar from '../assets/component/NavBar';
import api from '../utils/api';
import URL from '../assets/constant/url';
import Pdf from 'react-native-pdf';
import {FormatDate, getUserRole} from '../utils/CommonUtils';
import {useNavigation} from '@react-navigation/native';
import {UserRole} from '../assets/constant/userConstant';
import {AuthContext} from '../utils/AuthContext';
import NetworkIssue from '../assets/component/NetworkIssue';
import DataNotFound from '../assets/component/DataNotFound';
import ServerError from '../assets/component/ServerError';
import LoadingComponent from '../assets/component/LoadingComponent';

const NoticeBoard = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {isAdmin} = useContext(AuthContext);
  const [role, setRole] = useState(UserRole.NOTLOGIN);
  const [noticeData, setNoticeData] = useState([]);
  const navigation = useNavigation();

  const themes = JSON.stringify(route.params);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  useEffect(() => {
    (async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    })();
  }, []);

  const setAllErrorFalse = () => {
    setIsNetworkError(false);
    setIsNotFound(false);
    setIsServerError(false);
  };

  const fetchNoticeData = async () => {
    setAllErrorFalse();
    try {
      if (!refreshing) setIsLoading(true);
      const response = await api.get('/api/notice');
      setNoticeData(response.data.data);
    } catch (error) {
      console.error('Error fetching notice data:', error);
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
    fetchNoticeData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNoticeData();
  };

  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Notice Board',
        }}
      />
      {noticeData.length > 0 && (
        <FlatList
          data={noticeData}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item}) => (
            <View style={styles.cardStyle}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>{FormatDate(item.date)}</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShowPdfFullViewMode', {
                    uri: `${URL.baseUri}${item.link}`,
                  })
                }>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: `${URL.baseUri}${item.link}`,
                    cache: true,
                  }}
                  onLoadComplete={numberOfPages => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={page => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={error => {
                    console.log(error);
                  }}
                  onPressLink={uri => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={{height: height - 220}}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {isNetworkError && <NetworkIssue reload={fetchNoticeData} />}
      {isNotFound && <DataNotFound reload={fetchNoticeData} />}
      {isServerError && <ServerError reload={fetchNoticeData} />}
      {isLoading && !refreshing && <LoadingComponent />}

      {isAdmin && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 10,
            backgroundColor: '#1B3058',
            borderRadius: 50,
            elevation: 5,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('CreateNotice');
          }}>
          <View>
            <Text style={{fontSize: 30, color: 'white'}}>+</Text>
          </View>
        </TouchableOpacity>
      )}
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
  dateBox: {
    bottom: 13,
    width: 90,
    backgroundColor: '#FF3818',
    borderRadius: 10,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    padding: 5,
  },
  dateText: {
    color: 'white',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1B3058',
    borderRadius: 50,
    elevation: 5,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
