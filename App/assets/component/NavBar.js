import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';

const NavBar = () => {
  const themes = useColorScheme();
  return (
    <View
      style={[
        styles.navBarContiner,
        {backgroundColor: themes == 'dark' ? '#202020' : '#F1F1F1'},
      ]}>
      <View style={[styles.navBarAlign, {justifyContent: 'flex-start'}]}>
        <TouchableOpacity>
          <Image style={styles.logo} source={require('../logo/SSU.png')} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 2}}>
        <Text
          style={[
            styles.mainText,
            {color: themes == 'dark' ? '#F1F1F1' : '#893535'},
          ]}>
          Sri Sri University
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
          },
        ]}>
        {/* <Text style={{textAlign: 'right'}}>hiii</Text> */}
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
