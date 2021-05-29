import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const image = {
  uri: 'https://images.pexels.com/photos/1479425/pexels-photo-1479425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

const BackgroundImage = ({children}) => (
  <View style={styles.container}>
    {/*<ImageBackground source={image} style={styles.image}>*/}
    <View style={{flex: 1}}>{children}</View>
    {/*</ImageBackground>*/}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default BackgroundImage;
