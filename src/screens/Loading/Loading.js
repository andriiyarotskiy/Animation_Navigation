import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import {ProgressBar} from '../../components';
import {storeData} from '../../helpers/helpersFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {checkIsLogedInTC} from '../../redux/reducers/auth-reducer';

const LoadingScreen = ({navigation}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const {height} = useWindowDimensions();

  const [showLogin, setShowLogin] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  /** Progress Bar Loader **/
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(checkIsLogedInTC());
  }, [dispatch]);

  useEffect(() => {
    if (index === 4 && !isLoggedIn) {
      setShowLogin(true);
    } else if (index === 5 && isLoggedIn) {
      navigation.navigate('Main');
    }

    const intervalID = setInterval(() => {
      if (index !== 5) {
        setIndex((index + 1) % (5 + 1));
      }
    }, 300);
    return () => {
      clearInterval(intervalID);
    };
  }, [index, isLoggedIn, navigation]);
  /** Progress Bar Loader **/

  const [indexLoad, setIndexLoad] = useState(0);

  useEffect(() => {
    if (webViewVisible && showLoader) {
      const interval = setInterval(() => {
        setIndexLoad((indexLoad + 1) % (5 + 1));
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }
  }, [indexLoad, showLoader, webViewVisible]);

  const onPressHandler = () => {
    setWebViewVisible(true);
  };
  /** Login **/

  const onLoadHandler = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    setShowLogin(true);
    setShowLoader(nativeEvent.loading);
    if (nativeEvent.url === 'https://hemd.hudatascience.nl/test/#/') {
      CookieManager.get('https://hemd.hudatascience.nl/test').then(res => {
        // console.log('res', res);
        storeData('cookie', res);
        if (res.PHPSESSID.value) {
          dispatch(checkIsLogedInTC());
          navigation.navigate('Main');
        }
      });
    }
  };
  /** Login **/

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <View style={styles.container}>
        {!showLogin && (
          <View style={styles.progress}>
            <ProgressBar step={index} steps={5} height={18} />
          </View>
        )}
        {showLogin && !webViewVisible && (
          <View style={styles.btnLogin}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressHandler}>
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {webViewVisible && (
        <WebView
          startInLoadingState={true}
          renderLoading={() => (
            <View style={{bottom: height * 0.4, marginHorizontal: 50}}>
              <ProgressBar step={indexLoad} steps={5} height={18} />
            </View>
          )}
          incognito={true}
          onLoadStart={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            setShowLogin(false);
          }}
          onLoadEnd={onLoadHandler}
          source={{uri: 'https://hemd.hudatascience.nl/test'}}
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

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
  },
  progress: {
    top: height * 0.6,
  },
  btnLogin: {
    top: height * 0.7,
    alignSelf: 'center',
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
