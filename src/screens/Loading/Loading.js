import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';
import {ProgressBar} from '../../components';

// Write to Async Storage
// const storeData = async value => {
//   try {
//     await AsyncStorage.setItem('PHPSESSID_ASYNC_STORAGE', value);
//   } catch (e) {
//     // saving error
//   }
// };
//
// // Get from Async Storage
// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('PHPSESSID_ASYNC_STORAGE');
//     if (value !== null) {
//       // value previously stored
//       return value;
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

const LoadingScreen = ({navigation}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [webViewLoad, setWebViewLoad] = useState(true);

  /** Progress Bar Loader **/
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let interval;
    if (index === 0) {
      axios
        .post('https://hemd.hudatascience.nl/mypractice/api/v1/check_login', {
          app: 'inpraktijk_game',
        })
        .then(res => {
          setIsLogged(res.data.is_logged_in);
          console.log('is_logged_in', res.data.is_logged_in);
        });
    } else if (index === 5 && !isLogged) {
      setShowLogin(true);
      setIndex(5);
      return () => {
        clearInterval(interval);
      };
    } else if (index === 5 && isLogged) {
      navigation.navigate('Main');
    }

    interval = setInterval(() => {
      if (index === 5) {
        setIndex(5);
      } else {
        setIndex((index + 1) % (5 + 1));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };

    // if (index !== 5) {
    //   const interval = setInterval(() => {
    //     setIndex((index + 1) % (5 + 1));
    //   }, 300);
    //   return () => {
    //     clearInterval(interval);
    //   };
    // } else {
    //   // navigation.navigate('Main');
    // }
  }, [index, isLogged]);
  /** Progress Bar Loader **/

  const onPressHandler = () => {
    setWebViewVisible(true);
    setWebViewLoad(false);
  };

  // useEffect(() => {
  //   CookieManager.clearByName("PHPSESSID").then(res => {
  //     console.log('CookieManager.clearByName =>', res);
  //   });
  // }, []);
  /** Login **/

  const onLoadHandler = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.log('nativeEvent', nativeEvent);

    // if (!isLogged) {
    //   CookieManager.clearByName(
    //     'https://hemd.hudatascience.nl/mypractice/#/',
    //     'PHPSESSID',
    //   ).then(success => {
    //     console.log('CookieManager.clearByName =>', success);
    //   });
    // }

    if (nativeEvent.url === 'https://hemd.hudatascience.nl/mypractice/#/') {
      CookieManager.get('https://hemd.hudatascience.nl/mypractice/').then(
        res => {
          console.log('res', res.PHPSESSID);
          if (res.PHPSESSID.value) {
            navigation.navigate('Main');
          }

          // if (res) {
          //   CookieManager.get('https://hemd.hudatascience.nl/mypractice/')
          //     .then(response => {
          //       console.log('CookieManager.get =>', response);
          //       if (response.PHPSESSID.value === res.PHPSESSID.value) {
          //         navigation.navigate('Main');
          //       }
          //     })
          //     .catch(e => {
          //       if (e) {
          //         // storeData('');
          //       }
          //     });
          // }
        },
      );
    }
  };
  /** Login **/

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      {!showLogin && (
        <View>
          <ProgressBar step={index} steps={5} height={18} />
        </View>
      )}
      {showLogin && webViewLoad && (
        <View style={styles.btnLogin}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressHandler}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      {webViewVisible && (
        <WebView
          useWebkit={false}
          startInLoadingState={true}
          renderLoading={() => (
            <View>
              <Text>LOADING</Text>
            </View>
          )}
          incognito={true}
          onLoadEnd={onLoadHandler}
          source={{uri: 'https://hemd.hudatascience.nl/mypractice'}}
        />
      )}
      {/*<WebView*/}
      {/*  incognito={true}*/}
      {/*  onLoadEnd={onLoadHandler}*/}
      {/*  source={{uri: 'https://hemd.hudatascience.nl/mypractice'}}*/}
      {/*/>*/}
      {/*<View style={styles.btnLogin}>*/}
      {/*  <TouchableOpacity*/}
      {/*    activeOpacity={0.8}*/}
      {/*    onPress={() => {*/}
      {/*      CookieManager.clearAll(true).then(succcess => {*/}
      {/*        console.log(*/}
      {/*          'CookieManager.clearAll from webkit-view =>',*/}
      {/*          succcess,*/}
      {/*        );*/}
      {/*      });*/}
      {/*    }}>*/}
      {/*    <Text style={styles.textLogin}>Clear cookie</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    marginHorizontal: 50,
  },
  btnLogin: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 150,
    width: 120,
    height: 58,
    backgroundColor: '#5466fc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#707070',
    justifyContent: 'center',
  },
  textLogin: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center',
  },
});
