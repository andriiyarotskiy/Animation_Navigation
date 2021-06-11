import React, {useEffect} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AnswerAngle from './icon/answerAngle.svg';

const MessageAnswer = ({text, isLoading, newAnswerMessage}) => {
  const {width, height} = useWindowDimensions();
  const translateEllipses = useSharedValue(-100); // -100
  const opacityEllipses = useSharedValue(0); // 0
  const translateNewAnswer = useSharedValue(-width);

  useEffect(() => {
    if (isLoading) {
      translateEllipses.value = withTiming(0);
      opacityEllipses.value = withTiming(1, {
        easing: Easing.linear,
      });
    } else {
      opacityEllipses.value = withDelay(
        2000,
        withTiming(
          0,
          {
            easing: Easing.linear,
          },
          () => {
            translateNewAnswer.value = withSpring(0);
          },
        ),
      );
    }
  }, [isLoading]);

  /** Ellipses animation **/
  const animateStyleEllipses = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateEllipses.value}],
      opacity: opacityEllipses.value,
    };
  });
  /** New answer animation **/
  const animateStyleNewAnswer = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateNewAnswer.value}],
    };
  });

  return (
    <>
      <Animated.View style={[styles.ellipsisBox, animateStyleEllipses]}>
        <View style={styles.ellipsis} />
        <View style={styles.ellipsis} />
        <View style={styles.ellipsis} />
      </Animated.View>
      {newAnswerMessage && (
        <Animated.View style={[{}, animateStyleNewAnswer]}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                justifyContent: 'center',
              }}>
              {text}
            </Text>
            <AnswerAngle
              style={{position: 'absolute', top: -12, left: -2}}
              width={20}
              height={20}
            />
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default MessageAnswer;

const styles = StyleSheet.create({
  ellipsisBox: {
    top: 35,
    left: 10,
    flexDirection: 'row',
  },
  ellipsis: {
    marginHorizontal: 2.5,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  container: {
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    maxWidth: 288,
    alignSelf: 'flex-start',
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
});
