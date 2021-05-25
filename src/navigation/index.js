import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import WaitRoomScreen from '../screens/WaitRoom/WaitRoom';
import TestScreen from '../screens/TestScreen';
import LoadingScreen from '../screens/Loading/Loading';
import {Animated} from 'react-native';
import {StackCardInterpolationProps} from '@react-navigation/stack';
import TestAnimationScreen from '../screens/Test/TestAnimationScreen';
import DetailScreen from '../screens/Test/LeftScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import RightScreen from '../screens/Test/RightScreen';
import LeftScreen from '../screens/Test/LeftScreen';
import FreePlayScreen from '../screens/FreePlay';

const TestSharedStack = createSharedElementStackNavigator();
const DashBoardStack = createSharedElementStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

export const iosTransitionSpec = {
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
/** This is a test stack **/
const TestShared = () => {
  return (
    <TestSharedStack.Navigator
      mode="modal"
      screenOptions={{
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
      }}
      headerMode="none">
      <TestSharedStack.Screen
        name="TestAnimation"
        component={TestAnimationScreen}
      />
      <TestSharedStack.Screen
        name="Left"
        component={LeftScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [
            {id: 'leftMenuImage'},
            {animation: 'fade', resize: 'clip', align: 'left-top'},
          ];
        }}
      />
      <TestSharedStack.Screen
        name="Right"
        component={RightScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [{id: 'rightMenuImage'}];
        }}
      />
    </TestSharedStack.Navigator>
  );
};
/** This is a test stack **/

const DashBoard = () => {
  return (
    <DashBoardStack.Navigator
      mode="modal"
      screenOptions={{
        useNativeDriver: true,
        gestureEnabled: false,
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
      }}
      headerMode="none">
      <DashBoardStack.Screen name="Dashboard" component={DashboardScreen} />
      <DashBoardStack.Screen
        name="WaitRoom"
        component={WaitRoomScreen}
        initialParams={{id: 'leftMenuImage'}}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [{id: 'leftMenuImage'}];
        }}
      />
      <DashBoardStack.Screen
        name="FreePlay"
        component={FreePlayScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [{id: 'rightMenuImage'}];
        }}
      />
    </DashBoardStack.Navigator>
  );
};

const Main = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="DashBoard" component={DashBoard} />
      <MainStack.Screen name="TestScreen" component={TestScreen} />
      <MainStack.Screen name="TestShared" component={TestShared} />
    </MainStack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none" initialRouteName="Loading">
        <RootStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          options={{
            cardStyleInterpolator: SlideFromTop,
          }}
          name="Main"
          component={Main}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const SlideFromTop = (props: StackCardInterpolationProps) => {
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
