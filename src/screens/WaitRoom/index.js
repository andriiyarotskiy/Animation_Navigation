import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './style';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';
import {BackgroundImage, TabBar, UserCard} from '../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {getSectionsTC} from '../../redux/reducers/section-reducer';

const pacientAva = 'https://reactnative.dev/img/tiny_logo.png';

const WaitRoomScreen = ({route, navigation}) => {
  const {cases} = useSelector(state => state.case);
  const dispatch = useDispatch();

  const {height, width} = useWindowDimensions();

  const {sharedItem} = route.params;

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(getSectionsTC(item.uid));
        navigation.navigate('GameMenu', {item});
      }}>
      <View style={styles.pacientCard}>
        <SharedElement id={`item.${item.uid}.photo`}>
          <View style={styles.pacientAva}>
            <FastImage
              style={{
                width: 75,
                height: 75,
              }}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: item.patient.profile_image_url,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
            />
          </View>
        </SharedElement>

        <View style={styles.pacientTextInfo}>
          <SharedElement id={`item.${item.uid}.name`}>
            <Text style={styles.nameStyle}>{item.patient.display_name}</Text>
          </SharedElement>
          <SharedElement id={`item.${item.uid}.subTitle`}>
            <Text style={styles.subTitle}>{item.patient.display_surname}</Text>
          </SharedElement>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <BackgroundImage
      source={require('../../../assets/backgrounds/Home-BG.jpg')}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.leftBall}>
            <TouchableWithoutFeedback
              activeOpacity={0.9}
              onPress={() => navigation.goBack()}>
              <SharedElement id={`item.${sharedItem.id}.icon`}>
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: '#5466fc',
                    width: 100,
                    height: 100,
                    overflow: 'hidden',
                  }}>
                  <FontAwesomeIcon
                    icon={sharedItem.icon}
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      alignSelf: 'center',
                    }}
                    size={70}
                    color="#ffffff"
                  />
                </View>
              </SharedElement>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.userBlock}>
            <UserCard name="Andreas" userAva={pacientAva} />
          </View>
        </View>
      </View>
      <View style={styles.pacientList}>
        <FlatList
          data={cases}
          keyExtractor={item => item.patient_uid}
          ListHeaderComponentStyle={styles.listHeader}
          ListHeaderComponent={
            <View>
              <Text style={styles.listTitle}>Wachtkamer</Text>
              <Text style={styles.listSubtitle}>
                Per dag kun je 3 patienten behandelen uit je wachtkamer. Open
                vanaf 8.30u.
              </Text>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{marginBottom: 15}} />}
          renderItem={renderItem}
        />
      </View>
      <TabBar navigation={navigation} sharedItem={sharedItem} />
    </BackgroundImage>
  );
};

export default WaitRoomScreen;
