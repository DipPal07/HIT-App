import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavBar from '../assets/component/NavBar';

import StudentsCreativityData from '../assets/component/StudentsCreativityData';
import NoticeData from '../assets/component/NoticeData';

const NoticeBoard = ({route, navigation}) => {
  const themes = JSON.stringify(route.params);
  console.log(themes);
  const width = Dimensions.get('window').width;
  // const height = Dimensions.get('window').height;

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
        data={NoticeData}
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
                  {item.item.date}
                </Text>
              </View>

              <View>
                <Image
                  source={item.item.image}
                  style={{
                    width: width - 30,
                    height: width - 30,

                    alignSelf: 'center',
                    borderRadius: 15,

                    // margin: 15,
                  }}
                />
              </View>
            </View>
          );
        }}
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
    // height: 200,
    marginBottom: 10,
    elevation: 10,
    marginTop: 20,
    paddingBottom: 10,
    // flex: 1,
  },
});
