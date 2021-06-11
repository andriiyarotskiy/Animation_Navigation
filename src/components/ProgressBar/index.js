import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProgressBar = ({
  steps,
  height,
  step,
  userLvl,
  setProgressBarWidth,
  backgroundColor,
  borderColor,
}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  useEffect(() => {
    if (userLvl) {
      // get filled width
      setProgressBarWidth(width + (-width + (width * step) / steps));
    }
  }, [userLvl, width, step]);

  return (
    <View
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={[
        {height, borderColor: borderColor || '#5466fc'},
        styles.container,
      ]}>
      <Animated.View style={{transform: [{translateX: animatedValue}]}}>
        <LinearGradient
          colors={backgroundColor || ['#5466fc', '#2130b1', '#00084b']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={[{height}, styles.gradientStyle]}
        />
      </Animated.View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  gradientStyle: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: -1,
    borderRadius: 5,
  },
});
