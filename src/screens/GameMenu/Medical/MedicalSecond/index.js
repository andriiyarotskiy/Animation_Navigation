import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import Like from './icon/like.svg';
import {ArrowNext, GameTabBar, PacientHeaderCard} from '../../../../components';

const pacientAva = 'https://reactnative.dev/img/tiny_logo.png';

const MedicalSecondScreen = ({navigation, route}) => {
  const {answer} = route.params;
  const isFocused = useIsFocused();

  /** Animations **/
  const offsetPacientCard = useSharedValue(0);
  const offsetHeader = useSharedValue(-300);
  const offsetLike = useSharedValue(760);
  const opacityLike = useSharedValue(1);
  const scaleLike = useSharedValue(1);
  const rotateLike = useSharedValue(0);
  const offsetAnswer = useSharedValue(0);
  const opacityTabBar = useSharedValue(1);
  const offsetNextBtn = useSharedValue(0);

  const stylePacientAnimations = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetPacientCard.value}],
    };
  });

  const styleHeaderAnimations = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetHeader.value}],
    };
  });

  const styleLikeAnimations = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: offsetLike.value},
        {scale: scaleLike.value},
        {rotate: `${rotateLike.value}deg`},
      ],
      opacity: opacityLike.value,
    };
  });

  const styleAnswerAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetAnswer.value}],
    };
  });

  const styleTabBarAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacityTabBar.value,
    };
  });

  const styleNextBtnAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetNextBtn.value}],
    };
  });

  useEffect(() => {
    if (isFocused) {
      offsetHeader.value = withDelay(
        1550,
        withTiming(0, {
          duration: 800,
          easing: Easing.bounce,
        }),
      );
      offsetLike.value = withDelay(
        500,
        withTiming(-50, {
          duration: 800,
        }),
      );
      scaleLike.value = withSequence(
        withTiming(1.8, {duration: 800}),
        withDelay(750, withTiming(1, {duration: 800, easing: Easing.bounce})),
      );
      rotateLike.value = withSequence(
        withDelay(
          600,
          withTiming(answer.isCorrect ? -90 : 270, {duration: 300}),
        ),
        // withDelay(500, withTiming(45, {duration: 300})),
        withTiming(answer.isCorrect ? 45 : 135, {duration: 300}),
        withDelay(
          300,
          withTiming(answer.isCorrect ? 15 : 180, {duration: 300}),
        ),
      );
      // 1550
    }
  }, [isFocused]);

  /** Animations **/

  const nextStep = () => {
    offsetPacientCard.value = withTiming(-300);
    offsetHeader.value = withTiming(-300);
    opacityLike.value = withTiming(0);
    offsetAnswer.value = withTiming(760);
    opacityTabBar.value = withTiming(0);
    offsetNextBtn.value = withTiming(50);
    navigation.navigate('Dashboard', {
      gameOver: true,
      earnedPoints: answer.isCorrect ? 50 : -50,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View style={[styles.nextBtn, styleNextBtnAnimation]}>
        <ArrowNext onPress={nextStep} />
      </Animated.View>
      <Animated.View style={[{zIndex: 1}, stylePacientAnimations]}>
        <PacientHeaderCard
          name="Jeroen Boeve"
          photo={pacientAva}
          subTitle="Casus patient"
        />
      </Animated.View>
      <View style={styles.container}>
        <Animated.View style={[styles.header, styleHeaderAnimations]}>
          <Text style={styles.headerText}>
            {answer.isCorrect
              ? 'Gefeliciteerd, een juiste diagnose!'
              : 'Jammer, een verkeerde diagnose!'}
          </Text>
        </Animated.View>
        <Animated.View style={[{}, styleAnswerAnimation]}>
          <SharedElement id={`answer.${answer.id}`}>
            <View
              style={[
                styles.answer,
                {backgroundColor: answer.isCorrect ? '#60ba45' : '#fc5454'},
              ]}>
              <Text style={styles.answerText}>{answer.title}</Text>
            </View>
          </SharedElement>
        </Animated.View>
      </View>
      <Animated.View style={[styles.like, styleLikeAnimations]}>
        <Like width={125} height={125} fill={'#FFF'} />
      </Animated.View>
      <Animated.View style={styleTabBarAnimation}>
        <GameTabBar />
      </Animated.View>
    </SafeAreaView>
  );
};

export default MedicalSecondScreen;

const styles = StyleSheet.create({
  nextBtn: {
    position: 'absolute',
    zIndex: -1,
    top: 150,
    right: 0,
  },
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  header: {
    marginTop: 25,
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    color: '#00084b',
  },
  answer: {
    top: 50,
    height: 56,
    marginBottom: 8,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5466fc',
    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  answerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  like: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#5466fc',
    borderRadius: 400,
    width: 250,
    height: 250,
  },
});
