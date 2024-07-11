import React from 'react';
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';

const AboutUs = () => {
  const themes = useColorScheme();
  console.log(themes);
  const textColor = themes == 'dark' ? '#F1F1F1' : '#202020';

  return (
    <View>
      <Text style={[styles.headingText, {color: textColor}]}>About Us</Text>
      <View>
        <View style={[styles.rowStyle, {}]}>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}>
            <Image
              source={require('../logo/startup.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor, fontWeight: 'bold'}]}>
              Start-Up Hub
            </Text>
            <Text style={[styles.text, {color: textColor}]}>
              120+ Startups - Govt. Approved Incubator
            </Text>
          </View>
          <View style={[styles.imageAndTextContainer, {alignItems: 'center'}]}>
            <Image source={require('../logo/award.png')} style={styles.icon} />
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontWeight: 'bold',
                },
              ]}>
              30+ Awards
            </Text>
            <Text style={[styles.text, {color: textColor}]}>
              Recognized Nationally and Internationally
            </Text>
          </View>
        </View>
        <View style={[styles.rowStyle, {}]}>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image source={require('../logo/green.png')} style={styles.icon} />
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontWeight: 'bold',
                },
              ]}>
              Green Campus
            </Text>
            <Text style={[styles.text, {color: textColor}]}>
              Sprawling 188 acres serene campus
            </Text>
          </View>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image source={require('../logo/vice.png')} style={styles.icon} />
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontWeight: 'bold',
                },
              ]}>
              Vice-Free Campus
            </Text>
            <Text style={[styles.text, {color: textColor}]}>
              Alcohol and Smoke - Free Campus
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutUs;
const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  icon: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  imageAndTextContainer: {
    flex: 1,

    // justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});
