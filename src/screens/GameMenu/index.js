import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';
import {
  AnimatedBottomSheet,
  BackgroundImage,
  GameTabBar,
} from '../../components';

const GameMenuScreen = ({navigation, route}) => {
  const {item} = route.params;

  /** Animated Bottom Sheet **/
  const sheetRef = React.useRef(null);
  /** Animated Bottom Sheet **/

  return (
    <BackgroundImage>
      {/*Pacient Card*/}
      <View style={styles.pacientCard}>
        <SharedElement id={`item.${item.id}.photo`}>
          <View style={styles.pacientAva}>
            <FastImage
              style={{
                width: 75,
                height: 75,
              }}
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: item.photo,
                priority: FastImage.priority.low,
                cache: FastImage.cacheControl.cacheOnly,
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
        <View style={styles.timerStyle}>
          <Text style={styles.countText}>15</Text>
        </View>
      </View>
      {/*Pacient Card*/}
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Maria Du Soleil is je volgende patient.
        </Text>
        <Text style={styles.headerSubtitle}>
          Je doorloopt onderstaande stappen om tot een diagnose en behandeling
          te komen.
        </Text>
      </View>
      {/*Header*/}
      {/*Game Menu*/}
      <View style={styles.menuList}>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Dossier</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GameStack', {screen: 'PsychoSoc'})
          }>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Psychosociale Anamnese</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('GameStack', {screen: 'Medical'})}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Medische Anamnese</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/*Game Menu*/}
      <AnimatedBottomSheet sheetRef={sheetRef} content={'Lorem'.repeat(30)} />
      <GameTabBar />
      {/*<Button*/}
      {/*  title="Psycho Screen"*/}
      {/*  onPress={() => navigation.navigate('GameStack', {screen: 'PsychoSoc'})}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="Medical Screen"*/}
      {/*  onPress={() => navigation.navigate('GameStack', {screen: 'Medical'})}*/}
      {/*/>*/}
    </BackgroundImage>
  );
};

export default GameMenuScreen;

const styles = StyleSheet.create({
  // PACIENT CARD
  pacientCard: {
    backgroundColor: '#aeaeae',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '90%',
    height: 100,
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pacientAva: {
    borderRadius: 75,
    overflow: 'hidden',
  },
  pacientTextInfo: {
    alignSelf: 'center',
    marginLeft: 12,
  },
  nameStyle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#000a42',
  },
  subTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#000a42',
  },
  timerStyle: {
    position: 'absolute',
    right: 0,
    width: 73,
    height: 73,
    borderWidth: 1,
    borderColor: '#000a42',
    borderRadius: 75,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#000a42',
  },
  // PACIENT CARD
  header: {
    marginTop: 100,
    paddingTop: 25,
    paddingBottom: 50,
    marginHorizontal: 40,
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    color: '#00084b',
  },
  headerSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#00084b',
    letterSpacing: 0,
    marginTop: 10,
  },
  // Menu Buttons
  menuList: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  menuItem: {
    backgroundColor: '#5466fc',
    marginHorizontal: 40,
    height: 56,
    marginBottom: 8,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2130b1',
    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  menuText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  // Menu Buttons
});
