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

const StudentsCreativity = ({route, navigation}) => {
  const themes = JSON.stringify(route.params);
  console.log(themes);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  // const height = Dimensions.get('window').height;

  return (
    <View style={{flex: 1}}>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Students Creativity',
        }}
      />
      <FlatList
        data={StudentsCreativityData}
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
                    borderRadius: 10,
                    // margin: 15,
                  }}
                />
              </View>

              <View style={{margin: 8}}>
                <Text style={{}}>{item.item.name}</Text>
                <Text style={{color: 'black'}}>{item.item.stream}</Text>
                <Text
                  style={{
                    backgroundColor: '#E1ECEB',
                    padding: 8,
                    // paddingHorizontal: 10,
                    borderRadius: 10,
                    // paddingBottom: 10,
                  }}>
                  {item.item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          height: 50,
          width: 50,
          borderRadius: 25,
          position: 'absolute',

          right: 10,
          bottom: 10,
          elevation: 5,
        }}>
        <Image
          source={require('../assets/logo/add.png')}
          style={{height: 50, width: 50}}
        />
        {/* <Text>fii</Text> */}
      </View>
    </View>
  );
};

export default StudentsCreativity;

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
    // flex: 1,
  },
});
