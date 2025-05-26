import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  useColorScheme,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomModal from '../assets/component/CoustomModal';
import {darkTheme, lightTheme} from '../assets/constant/themes';

const NoticeBoard = ({route}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {isAdmin} = useContext(AuthContext);
  const [role, setRole] = useState(UserRole.NOTLOGIN);
  const [noticeData, setNoticeData] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const showModal = (title, message, type = 'info') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

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
  const deleteNotice = async id => {
    Alert.alert(
      'Delete Notice',
      'Are you sure you want to delete this notice?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await api.delete(`/api/notice/${id}`);
              if (response.status === 200) {
                showModal(
                  'Notice Deleted',
                  'The notice has been successfully deleted.',
                  'success',
                );
                // Refresh the notice data after deletion
              }
            } catch (error) {
              console.error('Error deleting notice:', error);
              if (error.response) {
                if (error.response.status >= 500) {
                  showModal(
                    'Server Error',
                    'There was an error deleting the notice. Please try again later.',
                    'error',
                  );
                } else {
                  showModal(
                    'Error',
                    'There was an error deleting the notice. Please try again.',
                    'error',
                  );
                }
              } else if (error.request) {
                showModal(
                  'Network Error',
                  'Please check your internet connection and try again.',
                  'error',
                );
              } else {
                showModal(
                  'Unexpected Error',
                  'An unexpected error occurred. Please try again.',
                  'error',
                );
              }
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const fetchNoticeData = async () => {
    console.log(noticeData);

    setAllErrorFalse();
    try {
      if (!refreshing) setIsLoading(true);

      const response = await api.get('/api/notice');
      console.log(response, ' API Response');

      setNoticeData(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 500) {
          setIsServerError(true);
        } else {
          setNoticeData([]);
          setIsNotFound(true);
        }
      } else if (error.request) {
        setIsNetworkError(true);
      } else {
        console.error('Error:', error.message);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
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
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <NavBar
        data={{
          backButton: true,
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
            <View
              style={[
                styles.cardStyle,
                {backgroundColor: theme.primary, padding: 7},
              ]}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>{FormatDate(item.date)}</Text>
              </View>

              {/* Delete Icon */}
              {isAdmin && (
                <TouchableOpacity
                  onPress={() => {
                    console.log('Delete ID:', item._id);
                    deleteNotice(item._id);
                  }}
                  style={styles.deleteIcon}>
                  <Ionicons name="trash-bin" size={24} color={theme.text} />
                </TouchableOpacity>
              )}

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
                  style={{height: height - 220, borderRadius: 10}}
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
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateNotice')}>
          <Text style={{fontSize: 30, color: 'white'}}>+</Text>
        </TouchableOpacity>
      )}
      <CustomModal
        visible={modalVisible}
        onClose={async () => {
          setModalVisible(false);
          await fetchNoticeData();
        }}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
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
    position: 'relative',
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
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
