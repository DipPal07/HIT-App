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
    {id: 1, image: require('../newsAndEventImage/hit/h1.jpeg')},
    {id: 2, image: require('../newsAndEventImage/hit/h2.jpeg')},
    {id: 3, image: require('../newsAndEventImage/hit/h3.jpg')},
    {id: 4, image: require('../newsAndEventImage/hit/h4.jpg')},
    {id: 4, image: require('../newsAndEventImage/hit/h5.jpg')},
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
    <View style={{}}>
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
        height={250}
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
    </View>
  );
};

export default NewsAndEvent;

const styles = StyleSheet.create({
  newsAndEventImage: {
    height: '100%',
    width: '100%',
    // objectFit: 'cover',
    borderRadius: 10,
    // margin: 2,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    // paddingLeft: 10,
  },
});
