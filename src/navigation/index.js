import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import WaitRoomScreen from '../screens/WaitRoom';
import LoadingScreen from '../screens/Loading/Loading';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import GameMenuScreen from '../screens/GameMenu';
import MedicalFirstScreen from '../screens/GameMenu/Medical/MedicalFirst';
import MedicalSecondScreen from '../screens/GameMenu/Medical/MedicalSecond';
import {PacientHeaderCard} from '../components';
import {anotherOpacity, SlideFromTop} from './screenOptions';
import PsychoSocScreen from '../screens/GameMenu/PsychoSoc';
import DifDiagnoseFirstScreen from '../screens/GameMenu/DifferentialDiagnose/DifDiagnoseFirst';
import DifDiagnoseSecondScreen from '../screens/GameMenu/DifferentialDiagnose/DifDiagnoseSecond';
import TestScreen from '../screens/TestScreen';

// const TestSharedStack = createSharedElementStackNavigator();

const MedicalStack = createSharedElementStackNavigator();
const DifDiagnoseStack = createSharedElementStackNavigator();
const GameMenuStack = createSharedElementStackNavigator();
const MainStack = createSharedElementStackNavigator();
const RootStack = createStackNavigator();

const DifDiagnoseScreensStack = () => {
  return (
    <DifDiagnoseStack.Navigator
      headerMode="screen"
      screenOptions={anotherOpacity}>
      <DifDiagnoseStack.Screen
        options={{headerShown: false}}
        name="DifDiagnoseFirst"
        component={DifDiagnoseFirstScreen}
      />
      {/*<DifDiagnoseStack.Screen*/}
      {/*  options={{headerShown: false}}*/}
      {/*  name="DifDiagnoseSecond"*/}
      {/*  sharedElements={route => {*/}
      {/*    const {answers} = route.params;*/}
      {/*    return [{id: 'answers'}];*/}
      {/*  }}*/}
      {/*  component={DifDiagnoseSecondScreen}*/}
      {/*/>*/}
    </DifDiagnoseStack.Navigator>
  );
};

const MedicalScreensStack = () => {
  const pacientAva = 'https://reactnative.dev/img/tiny_logo.png';

  return (
    <MedicalStack.Navigator headerMode="screen">
      <MedicalStack.Screen
        options={{
          header: props => (
            <PacientHeaderCard
              {...props}
              name="Jeroen Boeve"
              photo={pacientAva}
              subTitle="Casus patient"
            />
          ),
        }}
        name="MedicalFirst"
        component={MedicalFirstScreen}
      />
      <MedicalStack.Screen
        options={anotherOpacity}
        name="MedicalSecond"
        component={MedicalSecondScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {answer} = route.params;
          if (showing) {
            return [
              {id: `answer.${answer.id}`, animation: 'fade', resize: 'clip'},
            ];
          }
        }}
      />
    </MedicalStack.Navigator>
  );
};

const GameStack = () => {
  const pacientAva = 'https://reactnative.dev/img/tiny_logo.png';
  return (
    <GameMenuStack.Navigator headerMode="screen">
      <GameMenuStack.Screen
        options={{
          header: props => (
            <PacientHeaderCard
              {...props}
              name="Jeroen Boeve"
              photo={pacientAva}
              subTitle="Casus patient"
            />
          ),
        }}
        name="PsychoSoc"
        component={PsychoSocScreen}
      />
      <GameMenuStack.Screen
        options={anotherOpacity}
        name="Medical"
        component={MedicalScreensStack}
      />
      <GameMenuStack.Screen
        name="DifDiagnose"
        options={{
          header: props => (
            <PacientHeaderCard
              {...props}
              name="Jeroen Boeve"
              photo={pacientAva}
              subTitle="Casus patient"
            />
          ),
        }}
        component={DifDiagnoseScreensStack}
      />
    </GameMenuStack.Navigator>
  );
};

const Main = () => {
  return (
    <MainStack.Navigator
      mode="screen"
      initialRouteName="Dashboard"
      screenOptions={anotherOpacity}
      headerMode="none">
      <MainStack.Screen
        // options={opacityOptions}
        name="Test"
        component={TestScreen}
      />
      <MainStack.Screen
        // options={opacityOptions}
        name="Dashboard"
        component={DashboardScreen}
      />
      <MainStack.Screen
        name="WaitRoom"
        // options={opacityOptions}
        component={WaitRoomScreen}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [{id: 'leftMenuImage', animation: 'fade', resize: 'clip'}];
        }}
      />
      <MainStack.Screen
        name="GameStack"
        component={GameStack}
        // options={opacityOptions}
      />
      <MainStack.Screen
        name="GameMenu"
        component={GameMenuScreen}
        // options={opacityOptions}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          if (showing) {
            return [
              {id: `item.${item.id}.photo`, animation: 'fade', resize: 'clip'},
              {id: `item.${item.id}.name`, animation: 'fade', resize: 'clip'},
              {
                id: `item.${item.id}.subTitle`,
                animation: 'fade',
                resize: 'clip',
              },
            ];
          }
        }}
      />
    </MainStack.Navigator>
  );
};

const Navigator = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
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
// const TestShared = () => {
//   return (
//     <TestSharedStack.Navigator
//       mode="modal"
//       screenOptions={opacityOptions}
//       headerMode="none">
//       <TestSharedStack.Screen
//         name="TestAnimation"
//         component={TestAnimationScreen}
//       />
//       <TestSharedStack.Screen
//         name="Left"
//         component={LeftScreen}
//         sharedElements={(route, otherRoute, showing) => {
//           const {sharedItem} = route.params;
//           return [
//             {id: 'leftMenuImage'},
//             {animation: 'fade', resize: 'clip', align: 'left-top'},
//           ];
//         }}
//       />
//       <TestSharedStack.Screen
//         name="Right"
//         component={RightScreen}
//         sharedElements={(route, otherRoute, showing) => {
//           const {sharedItem} = route.params;
//           return [{id: 'rightMenuImage'}];
//         }}
//       />
//     </TestSharedStack.Navigator>
//   );
// };
/** This is a test stack **/
