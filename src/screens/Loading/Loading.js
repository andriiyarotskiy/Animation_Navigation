import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from '../../components';

const LoadingScreen = ({navigation}) => {
  /** Progress Bar Loader **/
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index !== 5) {
      const interval = setInterval(() => {
        setIndex((index + 1) % (5 + 1));
      }, 300);
      return () => {
        clearInterval(interval);
      };
    } else {
      navigation.navigate('Main');
    }
  }, [index]);

  /** Progress Bar Loader **/
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <ProgressBar step={index} steps={5} height={18} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 50,
  },
});
