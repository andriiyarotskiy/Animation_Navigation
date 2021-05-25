/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import type {Node} from 'react';
import React from 'react';
import Navigator from './src/navigation';
import {SafeAreaView, StatusBar} from 'react-native';

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#f4f5f5" barStyle="dark-content" />
      <Navigator />
    </SafeAreaView>
  );
};

export default App;
