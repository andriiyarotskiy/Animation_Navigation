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

const MessageAnswer = ({text, isLoading, newAnswerMessage, bottom}) => {
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
        <Animated.View style={[{marginBottom: bottom}, animateStyleNewAnswer]}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                justifyContent: 'center',
              }}>
              {text}
            </Text>
            <View style={styles.leftArrow} />
            <View style={styles.leftArrowOverlap} />
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
    left: 5,
    flexDirection: 'row',
  },
  ellipsis: {
    marginHorizontal: 2.5,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'pink',
  },

  container: {
    backgroundColor: '#dedede',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: '90%',
    alignSelf: 'flex-start',
  },
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#dedede',
    width: 10,
    height: 30,
    top: -20,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#635f5f', // Rounding
    width: 10,
    height: 25,
    borderBottomLeftRadius: 50,
    top: -25,
    left: 0,
  },
});
