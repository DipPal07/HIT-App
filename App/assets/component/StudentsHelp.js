import React from 'react';
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';

const StudentsHelp = () => {
  const themes = useColorScheme();
  console.log(themes);
  const textColor = themes == 'dark' ? '#F1F1F1' : '#202020';

  return (
    <View>
      <Text style={[styles.headingText, {color: textColor}]}>Student Help</Text>
      <View>
        <View style={[styles.rowStyle, {}]}>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}>
            <Image
              source={require('../logo/schedule.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>
              Class Time Table
            </Text>
          </View>
          <View style={[styles.imageAndTextContainer, {alignItems: 'center'}]}>
            <Image
              source={require('../logo/syllabus.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>Syllabus</Text>
          </View>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image
              source={require('../logo/website.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>Our Website</Text>
          </View>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image source={require('../logo/Notice.png')} style={styles.icon} />
            <Text style={[styles.text, {color: textColor}]}>Notice Board</Text>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}>
            <Image source={require('../logo/job.png')} style={styles.icon} />
            <Text style={[styles.text, {color: textColor}]}>
              Scholarship & Job
            </Text>
          </View>
          <View style={[styles.imageAndTextContainer, {alignItems: 'center'}]}>
            <Image
              source={require('../logo/Creativity.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>
              Students Creativity
            </Text>
          </View>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image
              source={require('../logo/attendence.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>attendance</Text>
          </View>
          <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image
              source={require('../logo/library.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>
              Library Information
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StudentsHelp;
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
    fontWeight: '500',
  },
});
