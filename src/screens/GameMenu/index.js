import React, {useEffect} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';
import {
  AnimatedBottomSheet,
  BackgroundImage,
  CircleScoreBoard,
  GameTabBar,
} from '../../components';
import {useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const routeSwitch = sectionType => {
  switch (sectionType) {
    case 'Psychosociale_Anamnese':
      return 'PsychoSoc';
    case 'Differentiaal_Diagnose_1':
      return 'DifDiagnose';
    case 'Differentiaal_Diagnose_2':
      return 'Medical';
  }
};

const GameMenuScreen = ({navigation, route}) => {
  const {item} = route.params;

  const {sections} = useSelector(state => state.section);

  const newSections = useSharedValue(760);

  /** Animations **/
  useEffect(() => {
    if (sections.length) {
      newSections.value = withSpring(0, {damping: 16});
    }
  }, [sections.length]);

  const sectionsStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: newSections.value}],
    };
  });
  /** Animations **/

  /** Animated Bottom Sheet **/
  const sheetRef = React.useRef(null);
  /** Animated Bottom Sheet **/

  return (
    <BackgroundImage
      source={require('../../../assets/backgrounds/Home-BG.jpg')}>
      {/*Pacient Card*/}
      <View style={styles.pacientWrapper}>
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
                  priority: FastImage.priority.low,
                  cache: FastImage.cacheControl.cacheOnly,
                }}
              />
            </View>
          </SharedElement>
          <View style={styles.pacientTextInfo}>
            <SharedElement id={`item.${item.uid}.name`}>
              <Text style={styles.nameStyle}>{item.patient.display_name}</Text>
            </SharedElement>
            <SharedElement id={`item.${item.uid}.subTitle`}>
              <Text style={styles.subTitle}>
                {item.patient.display_surname}
              </Text>
            </SharedElement>
          </View>
          <View style={styles.scoreBoard}>
            <CircleScoreBoard progress={10} />
          </View>
        </View>
      </View>

      {/*Pacient Card*/}
      {/*Header*/}
      <ScrollView>
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
          <Animated.View style={sectionsStyleAnim}>
            {sections.map(section => (
              <TouchableOpacity
                key={section.uid}
                onPress={() =>
                  navigation.navigate('GameStack', {
                    screen: routeSwitch(section.type),
                  })
                }>
                <View style={styles.menuItem}>
                  <Text style={styles.menuText}>{section.display_name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </ScrollView>
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
  pacientWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    height: 100,
  },
  pacientCard: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '90%',
    alignSelf: 'center',
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
  scoreBoard: {
    position: 'absolute',
    right: 0,
  },
  // PACIENT CARD
  header: {
    paddingTop: 25,
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
    paddingTop: 50,
    flex: 1,
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
