import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import NavBar from '../assets/component/NavBar';
import NewsAndEvent from '../assets/component/NewsAndEvent';
import StudentsHelp from '../assets/component/StudentsHelp';
import Placement from '../assets/component/Placement';
import AboutUs from '../assets/component/AboutUs';

const Home = () => {
  const themes = useColorScheme();

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[
            styles.background,
            {backgroundColor: themes == 'dark' ? '#2E2D2D' : '#FCFCFC'},
          ]}>
          <NavBar
            data={{
              backButton: false,
              currentThemes: themes,
              headingText: 'Sri Sri University',
            }}
          />

          <NewsAndEvent />
          <StudentsHelp />
          <Placement />
          <AboutUs />
          {/* <Text>home</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {padding: 0},
});
