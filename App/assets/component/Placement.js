import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';

const Placement = () => {
  const themes = useColorScheme();

  return (
    <View style={{padding: 10}}>
      <Text
        style={[
          styles.headingText,
          {color: themes == 'dark' ? '#F1F1F1' : '#202020'},
        ]}>
        Placement
      </Text>
      <ScrollView horizontal>
        <Image
          source={require('../placementImage/placment_1.png')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_2.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_3.png')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_4.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_5.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_6.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_7.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_8.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_9.jpg')}
          style={styles.newsAndEventImage}
        />
        <Image
          source={require('../placementImage/placment_10.jpg')}
          style={styles.newsAndEventImage}
        />
      </ScrollView>
    </View>
  );
};

export default Placement;

const styles = StyleSheet.create({
  newsAndEventImage: {
    height: 200,
    width: 200,
    borderRadius: 10,
    margin: 2,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
