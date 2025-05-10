import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const NavBar = props => {
  const themes = props.data.currentThemes;
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.navBarContiner,
        {backgroundColor: themes == 'dark' ? '#202020' : '#F1F1F1'},
      ]}>
      <View
        style={[
          styles.navBarAlign,
          {
            // justifyContent: 'flex-start',
            marginLeft: 7,
            marginRight: 10,
            // alignItems: 'center',
            // backgroundColor: 'blue',
            // borderRadius: 20,
            // paddingTop: 5,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
            console.log(props.data);
          }}>
          <Image style={styles.logo} source={require('../logo/SSU.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: themes == 'dark' ? '#682F2F' : 'pink',
          borderRadius: 20,
        }}>
        <Text
          style={[
            styles.mainText,
            {color: themes == 'dark' ? '#F1F1F1' : '#893535'},
          ]}>
          {props.data.headingText}
        </Text>
        <Text
          style={[
            styles.tagLine,
            {color: themes == 'dark' ? '#F1F1F1' : '#202020'},
          ]}>
          Learn Lead Serve
        </Text>
      </View>
      <View
        style={[
          styles.navBarAlign,
          {
            // backgroundColor: 'blue',
            alignItems: 'flex-end',
            paddingRight: 5,
          },
        ]}>
        {/* <Text style={{textAlign: 'right'}}>hiii</Text> */}
        {props.data.backButton ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
              console.log('dip');
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={require('../logo/home.png')}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarContiner: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  logo: {
    height: 50,
    width: 50,
  },
  mainText: {textAlign: 'center', fontSize: 22, fontWeight: 'bold'},
  navBarAlign: {
    flex: 1,
  },
  tagLine: {
    textAlign: 'center',
    fontSize: 12,
  },
});
