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
import {darkTheme, lightTheme} from '../constant/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
const NavBar = props => {
  // const theme = props.data.currenttheme;
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const navigation = useNavigation();
  return (
    <View style={[styles.navBarContiner, {backgroundColor: theme.background}]}>
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
          <Image style={styles.logo} source={require('../logo/hit.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          {backgroundColor: colorScheme == 'dark' ? '#682F2F' : '#d5ffe7'},
          {borderRadius: 20, flex: 2},
        ]}>
        <Text
          style={[
            styles.mainText,
            {color: colorScheme == 'dark' ? '#F1F1F1' : '#1B3058'},
          ]}>
          {props.data.headingText}
        </Text>
        <Text
          style={[
            styles.tagLine,
            {color: colorScheme == 'dark' ? '#F1F1F1' : '#1B3058'},
          ]}>
          Jnanam Vijnanam Sahitam
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
            {/* <Image
              style={{height: 35, width: 35}}
              source={require('../logo/home.png')}
            /> */}
            <Ionicons size={24} name="home-outline" color={theme.text} />
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
