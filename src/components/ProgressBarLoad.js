import {Animated, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useRef, useState} from 'react';

export const ProgressBarLoad = ({steps, height, step}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      <Text
        style={{
          fontFamily: 'Menlo',
          fontSize: 12,
          fontWeight: '900',
          marginBottom: 8,
        }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          borderWidth: 1,
          borderColor: '#3b5998',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: 5,
          overflow: 'hidden',
        }}>
        <Animated.View style={{transform: [{translateX: animatedValue}]}}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#7387e2', '#3b5998', '#001645']}
            style={{
              height,
              width: '100%',
              position: 'absolute',
              left: 0,
              top: -1,
              borderRadius: 5,
            }}
          />
        </Animated.View>
      </View>
    </>
  );
};
