import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
} from 'react-native';

const facultyData = [
  {
    key: '01',
    facultyName: 'Faculty Of Architecture',
    courseNameAndSemester: [
      {
        courseName: 'Bachelor of Architecture',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Bachelor in Interior Design',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
    ],
  },
  {
    key: '02',
    facultyName: 'Faculty Of Agriculture',
    courseNameAndSemester: [
      {
        courseName: 'B.Sc. (Hons.) Agriculture',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'B.Sc. (Hons.) Horticulture',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'B.Sc. (Hons.) Agribusiness',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'B.Sc. (Hons.) Food, Nutrition and Dietetics',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Agronomy',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Entomology',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Horticulture',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Statistics',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Agricultural Economics',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Agricultural Extension',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Genetics and Plant Breeding',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Plant Pathology',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.Sc. Soil Science and Agricultural Chemistry',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
    ],
  },
  {
    key: '03',
    facultyName: 'Faculty of Management Studies',
    courseNameAndSemester: [
      {
        courseName: 'BBA',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          //   '7th Semester',
          //   '8th Semester',
        ],
      },
      {
        courseName: 'B.Com (Hons.)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
        ],
      },
      {
        courseName: 'MBA (General Management)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
        ],
      },
      {
        courseName: 'MBA (Agribusiness)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
        ],
      },
    ],
  },
  {
    key: '04',
    facultyName: 'Faculty of Arts, Communication & Indic Studies',
    courseNameAndSemester: [
      {
        courseName: 'B.A. (Hons.) English',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'MA (English)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
        ],
      },
      {
        courseName: 'BFA Animation',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'BFA Applied Arts',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'BFA Painting',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Bachelor of Performing Arts (Odissi Dance)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.P.A. (Odissi Dance)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Bachelor of Performing Arts (Hindustani Vocal Music)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'M.A. in Hindu Studies',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          //   '5th Semester',
          //   '6th Semester',
          //   '7th Semester',
          //   '8th Semester',
        ],
      },
      {
        courseName: 'MA (Sanskrit)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          //   '5th Semester',
          //   '6th Semester',
          //   '7th Semester',
          //   '8th Semester',
        ],
      },
    ],
  },
  {
    key: '05',
    facultyName: 'Faculty of Health & Wellness',
    courseNameAndSemester: [
      {
        courseName: 'BSc Osteopathy',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'MSc Osteopathy',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Integrated M.Sc. in Osteopathy',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'BSc Yoga',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Bachelor of Naturopathy and Yogic Science (BNYS)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'MSc (Yoga)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'BSc Nursing',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'General Nursing and Midwifery',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Bachelor of Physical Education and Sports (BPES)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'Bachelor of Physiotherapy (BPT)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
      {
        courseName: 'MSc Exercise and Sports Physiology (MESP)',
        semester: [
          '1st Semester',
          '2nd Semester',
          '3rd Semester',
          '4th Semester',
          '5th Semester',
          '6th Semester',
          '7th Semester',
          '8th Semester',
        ],
      },
    ],
  },

  // Add more faculties if needed
];

const DropdownSelectList = () => {
  const [selectedFacultyName, setSelectedFacultyName] = useState(
    'Select your faculty name',
  );
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCourse, setSelectedCourseName] = useState();
  const [isClickedCourse, setIsClickedCourse] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState();
  const [isClickedSemester, setIsClickedSemester] = useState(false);
  const [courseData, setCourseData] = useState([null]);
  const [semesterData, setSemesterData] = useState([null]);

  const facultiesFunction = item => {
    console.log(item.item.facultyName);
    setSelectedFacultyName(item.item.facultyName);
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
    <View>
      <TouchableOpacity
        style={styles.dropDownStyle}
        onPress={() => {
          setIsClicked(!isClicked);
          setIsClickedCourse(false);
          setIsClickedSemester(false);
        }}>
        <Text style={styles.placeholderText}>{selectedFacultyName}</Text>
      </TouchableOpacity>
      {isClicked ? (
        <View style={styles.dropDownArea}>
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
                  <Text style={styles.placeholderText}>
                    {item.item.facultyName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      {/* next drop down */}
      <TouchableOpacity
        style={styles.dropDownStyle}
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
        <View style={styles.dropDownArea}>
          <FlatList
            data={courseData}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  style={styles.dropDownAreaText}
                  onPress={() => {
                    courseFunction(item);
                  }}>
                  <Text style={styles.placeholderText}>
                    {item.item.courseName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      {/* semester drop down */}
      <TouchableOpacity
        style={styles.dropDownStyle}
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
        <View style={styles.dropDownArea}>
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
                    }}>
                    <Text style={styles.placeholderText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      ) : null}

      <Button
        title="hiiii"
        onPress={() => {
          console.log(courseData);
        }}
      />
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
    // elevation: 5,
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
