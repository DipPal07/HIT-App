import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DropdownSelectList from '../assets/component/DropdownSelectList';
import NavBar from '../assets/component/NavBar';
import Testing from '../assets/component/Testing';
import Button from '../assets/component/Button';

const Syllabus = () => {
  const themes = useColorScheme();
  const [dropDownData, setDropSownData] = useState();
  const dropdownListDataHandel = data => {
    console.log(data);
    setDropSownData(data);
  };
  const buttonHandel = () => {
    console.log('button pressed....');
  };
  return (
    <View>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Syllabus',
        }}
      />

      <DropdownSelectList dropdowninfo={dropdownListDataHandel} />
      <Button data={{title: 'Search'}} onPress={buttonHandel} />
      <Text>{dropDownData ? dropDownData : ''}</Text>
    </View>
  );
};

export default Syllabus;

const styles = StyleSheet.create({});
