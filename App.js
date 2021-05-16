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
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ChatStackNavigator from './src/navigations/Navigator';

const App: () => Node = () => {
  /** Progress Bar Loader **/
  /*  const [index, setIndex] = useState(0);
  useEffect(() => {
    // if (index !== 5) {
    const interval = setInterval(() => {
      setIndex((index + 1) % (5 + 1));
    }, 500);
    return () => {
      clearInterval(interval);
    };
    // }
  }, [index]);*/
  /** Progress Bar Loader **/

  return (
    <NavigationContainer>
      <ChatStackNavigator />
    </NavigationContainer>

    /*    <View style={styles.container}>
      <ProgressBarLoad step={index} steps={5} height={20} />
    </View>*/
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});
