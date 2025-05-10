import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const StudentsHelp = ({navigation}) => {
  const themes = useColorScheme();
  console.log(themes);
  const textColor = themes == 'dark' ? '#F1F1F1' : '#202020';

  return (
    <View>
      <Text style={[styles.headingText, {color: textColor}]}>Student Help</Text>
      <View
        style={{
          paddingTop: 5,
          backgroundColor: '#FFF4F4',
          margin: 10,
          borderRadius: 20,
          elevation: 10,
        }}>
        <View style={[styles.rowStyle, {}]}>
          {/* <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}
            onPress={() => {
              // navigation.navigate('ClassTimeTable');
              navigation.navigate('ClassTimeTable', navigation);
            }}>
            <Image
              source={require('../logo/schedule.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>
              Class Time Table
            </Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* <View style={[styles.imageAndTextContainer, {alignItems: 'center'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'center'}]}
            onPress={() => {
              // navigation.navigate('ClassTimeTable');
              navigation.navigate('Syllabus');
            }}>
            <Image
              source={require('../logo/syllabus.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>Syllabus</Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}
            onPress={() => {
              Linking.openURL('https://srisriuniversity.edu.in/');
            }}>
            <Image
              source={require('../logo/website.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>Our Website</Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* <View style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}
            onPress={() => {
              navigation.navigate('NoticeBoard', {themes: themes});
            }}>
            <Image source={require('../logo/Notice.png')} style={styles.icon} />
            <Text style={[styles.text, {color: textColor}]}>Notice Board</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={styles.rowStyle}>
          {/* <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-start'}]}
            onPress={() => {
              navigation.navigate('ScholarshipAndJob', {themes: themes});
            }}>
            <Image source={require('../logo/job.png')} style={styles.icon} />
            <Text style={[styles.text, {color: textColor}]}>
              Scholarship & Job
            </Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* <View style={[styles.imageAndTextContainer, {alignItems: 'center'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'center'}]}
            onPress={() => {
              navigation.navigate('StudentsCreativity', {themes: themes});
            }}>
            <Image
              source={require('../logo/Creativity.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>
              Students Creativity
            </Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}
            onPress={() => {
              // Linking.openURL('https://srisriuniversity.edu.in/result/');
              navigation.navigate('ReportCard', {themes: themes});
            }}>
            <Image source={require('../logo/result.png')} style={styles.icon} />
            <Text style={[styles.text, {color: textColor}]}>Report Card</Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* <View
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}> */}
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image
              source={require('../logo/library.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>
              Library Information
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
        {/* <View style={styles.rowStyle}>
          
          <TouchableOpacity
            style={[styles.imageAndTextContainer, {alignItems: 'flex-end'}]}>
            <Image
              source={require('../logo/attendence.png')}
              style={styles.icon}
            />
            <Text style={[styles.text, {color: textColor}]}>attendance</Text>
          </TouchableOpacity>
        </View> */}
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
    paddingLeft: 10,
  },
  icon: {
    height: 50,
    width: 50,
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
