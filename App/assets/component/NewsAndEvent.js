import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';

const NewsAndEvent = () => {
  const width = Dimensions.get('window').width;
  const newsAndEventData = [
    {id: 1, image: require('../newsAndEventImage/1.jpg')},
    {id: 2, image: require('../newsAndEventImage/2.jpeg')},
    {id: 3, image: require('../newsAndEventImage/3.jpeg')},
    {id: 4, image: require('../newsAndEventImage/4.png')},
  ];
  const themes = useColorScheme();
  const renderItem = ({item, index}) => {
    console.log(item.image);

    // const [currentIndex, setCurrentIndex] = useState(0);
    return (
      // <TouchableOpacity>
      <Image source={item.image} style={styles.newsAndEventImage} />
      // </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        style={[
          styles.headingText,
          {color: themes == 'dark' ? '#F1F1F1' : '#202020'},
        ]}>
        News & Event
      </Text>
      {/* <FlatList
        data={newsAndEventData}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
        }}
      /> */}
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={newsAndEventData}
        scrollAnimationDuration={1000}
        mode="parallax"
        // mode="horizontal-stack"
        // pagingEnabled={true}
        // snapEnabled={true}
        // parallax
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={renderItem}
      />
      {/* <View
        style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {newsAndEventData.map((item, index) => {
          return (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: 'red',
                marginLeft: 5,
              }}></View>
          );
        })}
      </View> */}
    </View>
  );
};

export default NewsAndEvent;

const styles = StyleSheet.create({
  newsAndEventImage: {
    height: 400,
    width: 400,
    borderRadius: 10,
    // margin: 2,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
  },
});
