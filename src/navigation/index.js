import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import WaitRoomScreen from '../screens/WaitRoom';
import TestScreen from '../screens/TestScreen';
import LoadingScreen from '../screens/Loading/Loading';
import TestAnimationScreen from '../screens/Test/TestAnimationScreen';
import LeftScreen from '../screens/Test/LeftScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import RightScreen from '../screens/Test/RightScreen';
import GameMenuScreen from '../screens/GameMenu';
import PsychoSocScreen from '../screens/GameMenu/PsychoSoc';
import MedicalFirstScreen from '../screens/GameMenu/Medical/MedicalFirst';
import MedicalSecondScreen from '../screens/GameMenu/Medical/MedicalSecond';
import {PacientHeaderCard} from '../components';
import {opacityOptions, SlideFromTop} from './screenOptions';

const TestSharedStack = createSharedElementStackNavigator();

const MedicalStack = createStackNavigator();
const GameMenuStack = createSharedElementStackNavigator();
const DashBoardStack = createSharedElementStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MedicalScreensStack = () => {
  return (
    <MedicalStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MedicalStack.Screen name="MedicalFirst" component={MedicalFirstScreen} />
      <MedicalStack.Screen
        name="MedicalSecond"
        component={MedicalSecondScreen}
      />
    </MedicalStack.Navigator>
  );
};

const GameStack = () => {
  const pacientAva = 'https://reactnative.dev/img/tiny_logo.png';
  return (
    <GameMenuStack.Navigator
      headerMode="screen"
      screenOptions={{
        header: props => (
          <PacientHeaderCard
            {...props}
            name="Jeroen Boeve"
            photo={pacientAva}
            subTitle="Casus patient"
          />
        ),
      }}>
      <GameMenuStack.Screen name="PsychoSoc" component={PsychoSocScreen} />
      <GameMenuStack.Screen name="Medical" component={MedicalScreensStack} />
    </GameMenuStack.Navigator>
  );
};

const DashBoard = () => {
  return (
    <DashBoardStack.Navigator
      mode="modal"
      screenOptions={opacityOptions}
      headerMode="none">
      <DashBoardStack.Screen name="Dashboard" component={DashboardScreen} />
      <DashBoardStack.Screen
        name="WaitRoom"
        component={WaitRoomScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [{id: 'leftMenuImage'}];
        }}
      />
      <DashBoardStack.Screen
        name="GameMenu"
        component={GameMenuScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          if (showing) {
            return [
              {id: `item.${item.id}.photo`, resize: 'auto'},
              {id: `item.${item.id}.name`},
              {id: `item.${item.id}.subTitle`},
            ];
          }
        }}
      />
      <DashBoardStack.Screen
        name="GameStack"
        component={GameStack}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        // options={{cardStyleInterpolator: forSlide}}
      />
      {/*<DashBoardStack.Screen*/}
      {/*  name="FreePlay"*/}
      {/*  component={FreePlayScreen}*/}
      {/*  sharedElements={(route, otherRoute, showing) => {*/}
      {/*    const {item} = route.params;*/}
      {/*    return [{id: 'rightMenuImage'}];*/}
      {/*  }}*/}
      {/*/>*/}
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

/** This is a test stack **/
const TestShared = () => {
  return (
    <TestSharedStack.Navigator
      mode="modal"
      screenOptions={opacityOptions}
      headerMode="none">
      <TestSharedStack.Screen
        name="TestAnimation"
        component={TestAnimationScreen}
      />
      <TestSharedStack.Screen
        name="Left"
        component={LeftScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {sharedItem} = route.params;
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
          const {sharedItem} = route.params;
          return [{id: 'rightMenuImage'}];
        }}
      />
    </TestSharedStack.Navigator>
  );
};
/** This is a test stack **/
