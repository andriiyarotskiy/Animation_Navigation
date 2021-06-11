import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const image = {
  uri: 'https://images.pexels.com/photos/1479425/pexels-photo-1479425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

const BackgroundImage = ({children, source, borderBottomRadius}) => (
  <View style={styles.container}>
    <ImageBackground
      imageStyle={{
        borderBottomLeftRadius: borderBottomRadius || 0,
        borderBottomRightRadius: borderBottomRadius || 0,
      }}
      source={source}
      style={styles.image}>
      <View style={styles.childrenStyle}>{children}</View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  childrenStyle: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default BackgroundImage;
