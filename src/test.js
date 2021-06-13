import React, {createRef, useEffect, useRef, useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

// Write to Async Storage
const storeData = async value => {
  try {
    await AsyncStorage.setItem('PHPSESSID_ASYNC_STORAGE', value);
  } catch (e) {
    // saving error
  }
};

// Get from Async Storage
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('PHPSESSID_ASYNC_STORAGE');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

/** dev.to **/
// Send the cookie information back to the mobile app
const CHECK_COOKIE: string = `
  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
  true;
`;
let webViewRef = createRef();
const onNavigationStateChange = navigationState => {
  // Check cookies every time URL changes
  if (webViewRef.current) {
    webViewRef.current.injectJavaScript(CHECK_COOKIE);
  }
};
const onMessage = async event => {
  const {data} = event.nativeEvent;
  console.log('data', data);

  if (data.includes('Cookie:')) {
    // process the cookies
    const storedCookies = await CookieManager.get(
      'https://hemd.hudatascience.nl/mypractice',
      true,
    );
    console.log('storedCookies', storedCookies);
  }
};
/** dev.to **/

const LoadingScreen = ({navigation}) => {
  /** Progress Bar Loader **/
  // const [index, setIndex] = useState(0);
  // useEffect(() => {
  //   if (index !== 5) {
  //     const interval = setInterval(() => {
  //       setIndex((index + 1) % (5 + 1));
  //     }, 300);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   } else {
  //     // navigation.navigate('Main');
  //   }
  // }, [index]);
  /** Progress Bar Loader **/

  const [isAuth, setIsAuth] = useState(false);
  const [loginBtnVisible, setLoginBtnVisible] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const sessionID = await getData();
  //       console.log('sessionID', sessionID);
  //     } catch (e) {}
  //   };
  //   checkAuth();
  //
  //   axios
  //     .post('https://hemd.hudatascience.nl/mypractice/api/v1/check_login', {
  //       app: 'inpraktijk_game',
  //     })
  //     .then(res => {
  //       if (res.data.is_logged_in) {
  //         navigation.navigate('Main');
  //       } else {
  //         setLoginBtnVisible(true);
  //       }
  //     });
  // }, []);

  const onPressHandler = () => {
    navigation.navigate('Main');
    // setLoginBtnVisible(false);
    // setShowWebView(true);
  };
  /** **/

  /** **/

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      {/*<View>*/}
      {/*  <ProgressBar step={index} steps={5} height={18} />*/}
      {/*</View>*/}
      {/*      {loginBtnVisible && (
        <View style={styles.btnLogin}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressHandler}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      )}*/}
      {/*<WebView*/}
      {/*  ref={webViewRef}*/}
      {/*  source={{uri: 'https://hemd.hudatascience.nl/mypractice'}}*/}
      {/*  onNavigationStateChange={onNavigationStateChange}*/}
      {/*  onMessage={onMessage}*/}
      {/*  sharedCookiesEnabled*/}
      {/*/>*/}
      <WebView //8vmrgiqnfuqne2kokr2ma58saj581qnv50p1fl17d20j6nsu
        // incognito={true} // ios
        onLoadEnd={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log('nativeEvent', nativeEvent);
          if (
            nativeEvent.url === 'https://hemd.hudatascience.nl/mypractice/#/'
          ) {
            CookieManager.get('https://hemd.hudatascience.nl/mypractice/').then(
              res => {
                if (res) {
                  CookieManager.get('https://hemd.hudatascience.nl/mypractice/')
                    .then(response => {
                      // navigation.navigate('Main');
                      console.log(
                        'CookieManager.get =>',
                        response.PHPSESSID.value,
                      );
                    })
                    .catch(e => {
                      if (e) {
                        console.log('error', e);
                        // storeData('');
                      }
                    });
                }
              },
            );
          }
        }}
        source={{uri: 'https://hemd.hudatascience.nl/mypractice'}}
      />

      <View style={styles.btnLogin}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            CookieManager.clearAll(true).then(succcess => {
              console.log(
                'CookieManager.clearAll from webkit-view =>',
                succcess,
              );
            });
          }}>
          <Text style={styles.textLogin}>Clear cookie</Text>
        </TouchableOpacity>
      </View>
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

// <WebView
//   // incognito={true} // ios
//   onLoadEnd={syntheticEvent => {
//     const {nativeEvent} = syntheticEvent;
//     console.log('nativeEvent', nativeEvent);
//     if (nativeEvent.url === 'https://hemd.hudatascience.nl/mypractice/#/') {
//       CookieManager.get('https://hemd.hudatascience.nl/mypractice/').then(
//         res => {
//           if (res) {
//             CookieManager.get('https://hemd.hudatascience.nl/mypractice/')
//               .then(response => {
//                 // navigation.navigate('Main');
//                 console.log('CookieManager.get =>', response.PHPSESSID.value);
//               })
//               .catch(e => {
//                 if (e) {
//                   console.log('error', e);
//                   // storeData('');
//                 }
//               });
//           }
//         },
//       );
//     }
//   }}
//   source={{uri: 'https://hemd.hudatascience.nl/mypractice'}}
// />;
