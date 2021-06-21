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
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const InPraktik = () => (
  <SafeAreaProvider>
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Navigator />
    </SafeAreaView>
  </SafeAreaProvider>
);

const App: () => Node = () => (
  <Provider store={store}>
    <InPraktik />
  </Provider>
);

export default App;
