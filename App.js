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
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';

const App: () => Node = () => {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <Navigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default App;
