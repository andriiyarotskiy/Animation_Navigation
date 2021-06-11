import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {Animated} from 'react-native';

const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const opacityOptions = {
  useNativeDriver: true,
  // Enable gestures if you want. I disabled them because of my card style interpolator opacity animation
  gestureEnabled: false,
  // gestureResponseDistance: {
  // 	vertical: 100,
  // },
  // gestureDirection: 'vertical',
  ...TransitionPresets.ModalSlideFromBottomIOS,
  transitionSpec: {
    open: iosTransitionSpec,
    close: iosTransitionSpec,
  },
  // Opacity animation, you can also adjust this by playing with transform properties.
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
};

export const anotherOpacity = () => ({
  // useNativeDriver: true,
  gestureEnabled: false,
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 300}},
    close: {animation: 'timing', config: {duration: 300}},
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
  headerShown: false,
  header: null,
});

export const SlideFromTop = (props: StackCardInterpolationProps) => {
  const progress = Animated.add(
    props.current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    props.next
      ? props.next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateY: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                -props.layouts.screen.height,
                0,
                -props.layouts.screen.height,
              ],
              extrapolate: 'clamp',
            }),
            props.inverted,
          ),
        },
      ],
    },
  };
};

export const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

export const horizontalSlide = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 300}},
    close: {animation: 'timing', config: {duration: 300}},
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
