import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  useColorScheme,
} from 'react-native';
import facultyData from './FacultyData';
import {darkTheme, lightTheme} from '../constant/themes';

const DropdownSelectList = props => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [selectedCourseType, setSelectedCourseType] = useState(
    'Select your course type',
  );
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCourse, setSelectedCourseName] = useState();
  const [isClickedCourse, setIsClickedCourse] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState();
  const [isClickedSemester, setIsClickedSemester] = useState(false);
  const [courseData, setCourseData] = useState();
  const [semesterData, setSemesterData] = useState();

  const facultiesFunction = item => {
    setSelectedCourseType(item.item.courseType);
    setIsClicked(false);
    setCourseData(item.item.courseNameAndSemester);
    setSelectedCourseName('');
    setSelectedSemester('');
    setSemesterData(null);
  };
  const courseFunction = item => {
    console.log(item);
    setSelectedCourseName(item.item.courseName);
    setIsClickedCourse(false);
    // setCourseData(item.item.courseNameAndSemester);
    setSemesterData(item.item.semester);

    // console.log(courseData);
  };
  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity
        style={[
          styles.dropDownStyle,
          {backgroundColor: theme.textInputBackground},
        ]}
        onPress={() => {
          setIsClicked(!isClicked);
          setIsClickedCourse(false);
          setIsClickedSemester(false);
        }}>
        <Text style={styles.placeholderText}>{selectedCourseType}</Text>
      </TouchableOpacity>
      {isClicked ? (
        <View
          style={[
            styles.dropDownArea,
            {backgroundColor: theme.textInputBackground},
          ]}>
          <FlatList
            data={facultyData}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  style={styles.dropDownAreaText}
                  onPress={() => {
                    facultiesFunction(item);
                    // console.log(courseData);
                  }}>
                  <Text style={[styles.placeholderText, {color: theme.text}]}>
                    {item.item.courseType}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      {/* next drop down */}
      <TouchableOpacity
        style={[
          styles.dropDownStyle,
          {backgroundColor: theme.textInputBackground},
        ]}
        onPress={() => {
          setIsClickedCourse(!isClickedCourse);
          setIsClickedSemester(false);
          setIsClicked(false);
        }}>
        <Text style={styles.placeholderText}>
          {selectedCourse ? selectedCourse : 'Select your course name'}
        </Text>
      </TouchableOpacity>
      {isClickedCourse ? (
        <View
          style={[
            styles.dropDownArea,
            {backgroundColor: theme.textInputBackground},
          ]}>
          {!courseData ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: 'red',
                paddingTop: 30,
                color: theme.text,
              }}>
              Please select course type first
            </Text>
          ) : (
            <FlatList
              data={courseData}
              renderItem={(item, index) => {
                // console.log(courseData + '===============');
                return (
                  <TouchableOpacity
                    style={styles.dropDownAreaText}
                    onPress={() => {
                      courseFunction(item);
                    }}>
                    <Text style={[styles.placeholderText, {color: theme.text}]}>
                      {item.item.courseName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      ) : null}
      {/* semester drop down */}
      <TouchableOpacity
        style={[
          styles.dropDownStyle,
          {backgroundColor: theme.textInputBackground},
        ]}
        onPress={() => {
          setIsClickedSemester(!isClickedSemester);
          setIsClickedCourse(false);
          setIsClicked(false);
        }}>
        <Text style={styles.placeholderText}>
          {selectedSemester ? selectedSemester : 'Select your semester'}
        </Text>
      </TouchableOpacity>
      {isClickedSemester ? (
        <View
          style={[
            styles.dropDownArea,
            {backgroundColor: theme.textInputBackground},
          ]}>
          {!semesterData ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: 'red',
                paddingTop: 30,
              }}>
              Please select faculty and courses first
            </Text>
          ) : (
            <FlatList
              data={semesterData}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.dropDownAreaText}
                    onPress={() => {
                      setSelectedSemester(item);
                      console.log(item);

                      setIsClickedSemester(false);
                      props.dropdowninfo(
                        {semester: item, courseName: selectedCourse},
                        // selectedCourseType +
                        //   '**' +
                        //   selectedCourse +
                        //   '**' +
                        //   item,
                      );
                    }}>
                    <Text style={styles.placeholderText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    width: '90%',
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,

    // elevation: 5,
  },
  placeholderText: {
    fontSize: 20,
    // justifyContent: 'center',
    paddingLeft: 10,
  },
  dropDownArea: {
    height: 300,
    width: '90%',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 5,

    marginBottom: 10,
  },
  dropDownAreaText: {
    height: 50,
    width: '80%',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default DropdownSelectList;
