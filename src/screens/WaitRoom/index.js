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

const pacientAva = 'https://reactnative.dev/img/tiny_logo.png';
const pacientList = [
  {
    photo: pacientAva,
    name: 'Maria Du Soleil',
    subTitle: 'Casus patient',
    id: Math.random().toString(),
  },
  {
    photo: 'https://unsplash.it/75/75?image=1',
    name: 'Jeroen Boeve',
    subTitle: 'Casus patient',
    id: Math.random().toString(),
  },
  {
    photo: pacientAva,
    name: 'Maria Du Soleil',
    subTitle: 'Casus patient',
    id: Math.random().toString(),
  },
];

const WaitRoomScreen = ({route, navigation}) => {
  const {height, width} = useWindowDimensions();

  const {sharedItem} = route.params;

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('GameMenu', {item})}>
      <View style={styles.pacientCard}>
        <SharedElement id={`item.${item.id}.photo`}>
          <View style={styles.pacientAva}>
            <FastImage
              style={{
                width: 75,
                height: 75,
              }}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: item.photo,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
            />
          </View>
        </SharedElement>

        <View style={styles.pacientTextInfo}>
          <SharedElement id={`item.${item.id}.name`}>
            <Text style={styles.nameStyle}>{item.name}</Text>
          </SharedElement>
          <SharedElement id={`item.${item.id}.subTitle`}>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </SharedElement>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <BackgroundImage>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.leftBall}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Dashboard')}>
              <SharedElement id={'leftMenuImage'}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 125,
                  }}
                  source={{uri: sharedItem.image}}
                />
              </SharedElement>
            </TouchableOpacity>
          </View>
          <View style={styles.userBlock}>
            <UserCard name="Andreas" userAva={pacientList[0].photo} />
          </View>
        </View>
      </View>
      <View style={styles.pacientList}>
        <FlatList
          data={pacientList}
          keyExtractor={item => item.id}
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
