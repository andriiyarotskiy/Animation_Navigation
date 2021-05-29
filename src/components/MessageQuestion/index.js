import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const MessageQuestion = ({text, selected, setQuestionPosition}) => {
  const questionInBoxRef = useRef(null);
  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        questionInBoxRef.current.measureInWindow((x, y, pageX, pageY) => {
          setQuestionPosition({left: x, top: y});
        });
      }, 0);
      opacity.value = withDelay(1300, withTiming(1, {duration: 300})); // delayMS 1500
    }
  }, [selected]);

  const opacity = useSharedValue(0);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <>
      <Animated.View
        ref={questionInBoxRef}
        style={[{...styles.container}, styleAnimation]}>
        <Text style={styles.textQuestion}>{text}</Text>

        <View style={styles.rightArrow} />

        <View style={styles.rightArrowOverlap} />
      </Animated.View>
    </>
  );
};

export default MessageQuestion;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 8, // marginBottom should be the same as Index.box
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#00084b',
    borderRadius: 8,
    maxWidth: 288,
    alignSelf: 'flex-end',

    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#5466fc',
  },
  textQuestion: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
  },
  // rightArrow: {
  //   position: 'absolute',
  //   backgroundColor: '#0078fe',
  //   width: 10,
  //   height: 30,
  //   bottom: -20,
  //   right: 0,
  // },
  //
  // rightArrowOverlap: {
  //   position: 'absolute',
  //   backgroundColor: '#635f5f', // Rounding
  //   width: 10,
  //   height: 25,
  //   bottom: -25,
  //   borderTopRightRadius: 50,
  //   right: 0,
  // },
});
