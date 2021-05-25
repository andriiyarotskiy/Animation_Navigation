import React from 'react';
import {
  Image, SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './style';
import {SharedElement} from 'react-navigation-shared-element';
import MainMenu from '../../components/MainMenu/MainMenu';

const WaitRoomScreen = ({route, navigation}) => {
  const {height} = useWindowDimensions();

  const {item} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: '#aeaeae'}}>
      <View style={styles.leftBall}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <SharedElement id={'leftMenuImage'}>
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: 'cover',
                borderRadius: 90,
              }}
              source={{uri: item.image}}
            />
          </SharedElement>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.pacientList}>
          <View style={styles.pacientCard}>
            <View style={styles.pacientAva} />
            <View style={styles.pacientTextInfo}>
              <Text style={styles.nameStyle}>Some Text</Text>
            </View>
          </View>
          <View style={styles.pacientCard}>
            <View style={styles.pacientAva} />
            <View style={styles.pacientTextInfo}>
              <Text style={styles.nameStyle}>Some Text</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <MainMenu navigation={navigation} sharedItem={item} />
    </View>
  );
};

export default WaitRoomScreen;
