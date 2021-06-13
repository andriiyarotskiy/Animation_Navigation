import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './styles';
import {SharedElement} from 'react-navigation-shared-element';
import {numberWithDot, usePrevious} from '../../helpers/helpersFunctions';
import {BackgroundImage, ProgressBar, TabBar, UserCard} from '../../components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const image = 'https://reactnative.dev/img/tiny_logo.png';
const data = [{image: image}, {image: image}];

const DashboardScreen = ({route, navigation}) => {
  const {width, height} = useWindowDimensions();

  const [userPoints, setUserPoints] = useState(250);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const isGameOver = route.params?.gameOver;
  const earnedPoints = route.params?.earnedPoints;

  /** Animations **/

  const offsetUser = useSharedValue(0);
  const opacityTitle = useSharedValue(1);
  const offsetUserProgressBar = useSharedValue(0);
  const offsetPoints = useSharedValue(-380); // height window / 2
  const scalePoints = useSharedValue(0);
  const opacityPoints = useSharedValue(1);
  const offsetBallsFromTop = useSharedValue(0);
  const offsetContentFromBottom = useSharedValue(0);
  const offsetMenuFromBottom = useSharedValue(0);

  useEffect(() => {
    if (isGameOver) {
      opacityTitle.value = 0;
      offsetUser.value = -200;
      offsetUserProgressBar.value = 760;
      offsetPoints.value = -380; // height window / 2
      scalePoints.value = 0;
      opacityPoints.value = 1;

      offsetBallsFromTop.value = -760;
      offsetContentFromBottom.value = 760;
      offsetMenuFromBottom.value = 760;

      offsetUser.value = withSpring(0, {damping: 16});
      opacityTitle.value = withTiming(1, {duration: 500});
      offsetUserProgressBar.value = withSpring(0, {damping: 16});

      offsetPoints.value = withDelay(
        500,
        withSequence(
          withTiming(-20, {duration: 1000}),
          withDelay(500, withTiming(20, {duration: 500})),
          withTiming(50, {duration: 500}),
        ),
      );
      scalePoints.value = withDelay(
        500,
        withSequence(
          withTiming(2.8, {duration: 1000}), // 3
          withDelay(
            500,
            withTiming(1, {duration: 500}, isFinished => {
              if (isFinished) {
                opacityPoints.value = withTiming(0, {duration: 500});
              }
            }),
          ),
        ),
      );

      offsetBallsFromTop.value = withDelay(3000, withSpring(0, {damping: 16}));

      offsetContentFromBottom.value = withDelay(
        3000,
        withSpring(0, {
          damping: 16,
        }),
      );
      offsetMenuFromBottom.value = withDelay(
        3000,
        withSpring(0, {
          damping: 16,
        }),
      );

      navigation.setParams({gameOver: false});
    }
  }, [isGameOver]);

  const styleUserAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetUser.value}],
    };
  });
  const styleTitleAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacityTitle.value,
    };
  });
  const styleUserProgressAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetUserProgressBar.value}],
    };
  });
  const stylePointsAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetPoints.value}, {scale: scalePoints.value}],
      opacity: opacityPoints.value,
    };
  });
  const styleFromTopBallsAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetBallsFromTop.value}],
    };
  });
  const styleFromBottomAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetContentFromBottom.value}],
    };
  });
  const styleFromBottomMenuAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetMenuFromBottom.value}],
    };
  });

  const prevValue = usePrevious(progressBarWidth);

  const scaleYUserProgress = useSharedValue(0);
  const offsetXUserProgress = useSharedValue(0);

  useEffect(() => {
    if (isGameOver) {
      scaleYUserProgress.value = 0;
      offsetXUserProgress.value = progressBarWidth - 1;
      scaleYUserProgress.value = withDelay(
        2000,
        withSequence(
          withTiming(1.5, {duration: 500}),
          withDelay(500, withTiming(0.95, {duration: 500})),
        ),
      );
      offsetXUserProgress.value = withDelay(
        2000,
        withTiming(progressBarWidth, {duration: 500}),
      );

      setTimeout(() => {
        setUserPoints(userPoints + earnedPoints);
      }, 2500);
    }
    if (prevValue !== progressBarWidth) {
      offsetXUserProgress.value = withTiming(progressBarWidth, {
        duration: prevValue > progressBarWidth ? 550 : 450,
      });
    }
  }, [prevValue, progressBarWidth, isGameOver]);

  const styleHeightProgressAnim = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: scaleYUserProgress.value}],
      width: offsetXUserProgress.value,
    };
  });
  /** Animations **/

  return (
    <BackgroundImage>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Animated.View style={styleTitleAnimation}>
              <Text style={styles.appNameStyle}>InPraktijk</Text>
            </Animated.View>
            <View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  right: -5,
                  minWidth: 200,
                  alignItems: 'flex-end',
                },
              ]}>
              <Animated.View style={styleUserAnimation}>
                <UserCard name="Andreas" userAva={image} />
              </Animated.View>
            </View>
          </View>
        </View>
        <View style={styles.mainContent}>
          {/**/}
          <Animated.View style={[styles.rowOfBalls, styleFromTopBallsAnim]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('WaitRoom', {sharedItem: data[0]})
              }>
              <SharedElement id={'leftMenuImage'}>
                <Image
                  style={{
                    width: 125,
                    height: 125,
                    resizeMode: 'cover',
                    borderRadius: 125,
                  }}
                  source={{uri: data[0].image}}
                />
              </SharedElement>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => setUserPoints(430)
                // navigation.push('FreePlay', {sharedItem: data[1]})
              }>
              <View style={styles.item}>
                <SharedElement id={'rightMenuImage'}>
                  <Image
                    style={{
                      width: 125,
                      height: 125,
                      resizeMode: 'cover',
                      borderRadius: 125,
                    }}
                    source={{uri: data[1].image}}
                  />
                </SharedElement>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.userLevelInfo}>
            <Animated.Text style={[styles.pointsText, stylePointsAnimation]}>
              {earnedPoints} Punten
            </Animated.Text>
            <Animated.View
              style={[styles.animProgressUser, styleHeightProgressAnim]}
            />
            <Animated.View style={styleUserProgressAnim}>
              <View style={styles.levelTextRow}>
                <Text style={styles.actualLvl}>Level 8</Text>
                <Text style={styles.nextLvl}>Level 9</Text>
              </View>
              <View style={styles.userProgress}>
                <ProgressBar
                  height={18}
                  step={userPoints}
                  steps={500}
                  backgroundColor={['#5466fc', '#5466fc']}
                  userLvl
                  setProgressBarWidth={setProgressBarWidth}
                />
              </View>
              <Text style={styles.pointsInLvl}>{userPoints}/500</Text>
            </Animated.View>
            {/**/}
            <Animated.View style={styleFromBottomAnim}>
              <Text style={styles.lvlDescr}>
                Hint: Next ability “Mystery Guest” at Level 10.
              </Text>
              <View>
                <Text style={styles.titleGroup}>Best Big Groep 1C</Text>
                <View style={styles.groupProgress}>
                  <ProgressBar
                    height={18}
                    step={39810}
                    steps={50000}
                    backgroundColor={['#00084b', '#00084b']}
                    borderColor={'#00084b'}
                  />
                </View>
                <Text style={styles.pointsInLvl}>{numberWithDot(39810)}</Text>
              </View>
              <View style={styles.groupsRating}>
                <View style={styles.groupsTitles}>
                  <Text style={styles.headerName}>BEST BIG</Text>
                  <Text style={styles.headerName}>BEST UNI</Text>
                </View>
                <View>
                  <View style={styles.rowInfoGroup}>
                    <Text style={styles.contentName}>Groep 3B</Text>
                    <Text style={styles.contentName}>Hogeschool Utrecht</Text>
                  </View>
                  <View style={styles.rowInfoGroup}>
                    <Text style={styles.contentName}>Groep 1C</Text>
                    <Text style={styles.contentName}>Hogeschool Enschede</Text>
                  </View>
                  <View style={styles.rowInfoGroup}>
                    <Text style={styles.contentName}>Groep 8A</Text>
                    <Text style={styles.contentName}>Hogeschool Eindhoven</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
            {/**/}
          </View>
          {/**/}
        </View>
      </ScrollView>
      <Animated.View style={styleFromBottomMenuAnim}>
        <TabBar navigation={navigation} sharedItem={data[0]} />
      </Animated.View>
      {/**/}
      {/*<GameTabBar />*/}
    </BackgroundImage>
  );
};

export default DashboardScreen;
