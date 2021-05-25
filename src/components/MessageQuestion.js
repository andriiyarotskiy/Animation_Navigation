import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const MessageQuestion = ({text, selected, bottom, setQuestionPosition}) => {
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
        style={[{...styles.container, marginBottom: bottom}, styleAnimation]}>
        <Text style={{fontSize: 16, color: '#ffffff'}}>{text}</Text>

        <View style={styles.rightArrow} />

        <View style={styles.rightArrowOverlap} />
      </Animated.View>
    </>
  );
};

export default MessageQuestion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0078fe',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    marginBottom: 10, // marginBottom should be the same as QuestionBox.box
    maxWidth: 300,
    alignSelf: 'flex-end',
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    width: 10,
    height: 30,
    bottom: -20,
    right: 0,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#635f5f', // Rounding
    width: 10,
    height: 25,
    bottom: -25,
    borderTopRightRadius: 50,
    right: 0,
  },
});
