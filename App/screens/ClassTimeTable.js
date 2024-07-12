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

const ClassTimeTable = () => {
  const themes = useColorScheme();
  const [dropDownData, setDropSownData] = useState();
  const dropdownListDataHandel = data => {
    setDropSownData(data);
    console.log(data);
  };
  return (
    <View>
      <NavBar
        data={{
          backButton: true,
          currentThemes: themes,
          headingText: 'Class Time Table',
        }}
      />

      <DropdownSelectList dropdowninfo={dropdownListDataHandel} />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: 'black',
          height: 50,
          width: 200,
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          elevation: 5,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          Find
        </Text>
      </TouchableOpacity>
      <Text>{dropDownData ? dropDownData : ''}</Text>
    </View>
  );
};

export default ClassTimeTable;

const styles = StyleSheet.create({});
