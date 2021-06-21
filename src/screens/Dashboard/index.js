import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './styles';
import {SharedElement} from 'react-navigation-shared-element';
import {
  getFromAsyncStorage,
  numberWithDot,
  usePrevious,
} from '../../helpers/helpersFunctions';
import {BackgroundImage, ProgressBar, TabBar, UserCard} from '../../components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {faClinicMedical, faMedal} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {getAssignedCasesTC} from '../../redux/reducers/case-reducer';

const image = 'https://reactnative.dev/img/tiny_logo.png';
const data = [
  {icon: faClinicMedical, id: '1'},
  {icon: faMedal, id: '2'},
];

const DashboardScreen = ({route, navigation}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // const {xp_earned} = useSelector(state => state.player);
  const {cases} = useSelector(state => state.case);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAssignedCasesTC());
    }
  }, [isLoggedIn, dispatch]);

  const {width, height} = useWindowDimensions();

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
        setPointsPerLvl(pointsPerLvl + earnedPoints); //!!!!!!!!!!!!!!!!
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

  const xp_earned = 250;
  //
  const [pointsPerLvl, setPointsPerLvl] = useState(xp_earned);
  // const [finalPoints, setFinalPoints] = useState(pointsPerLvl);
  const [lvlPoints, setLvlPoints] = useState(500);
  const [lvlData, setLvlData] = useState({
    currentLvl: 'Level 0',
    nextLvl: 'Level 1',
    prev_lvl_points: 0,
    current_lvl_points: 500,
    next_lvl_points: 1000,
  });

  useEffect(() => {
    let lvl;
    if (pointsPerLvl < 500) {
      lvl = {
        currentLvl: 'Level 0',
        nextLvl: 'Level 1',
        prev_lvl_points: 0,
        current_lvl_points: 500,
        next_lvl_points: 1000,
      };
    } else if (pointsPerLvl >= 500 && pointsPerLvl < 1000) {
      lvl = {
        currentLvl: 'Level 1',
        nextLvl: 'Level 2',
        prev_lvl_points: 500,
        current_lvl_points: 1000,
        next_lvl_points: 2000,
      };
    } else if (pointsPerLvl >= 1000 && pointsPerLvl < 2000) {
      lvl = {
        currentLvl: 'Level 2',
        nextLvl: 'Level 3',
        prev_lvl_points: 1000,
        current_lvl_points: 2000,
        next_lvl_points: 3000,
      };
    } else if (pointsPerLvl >= 2000 && pointsPerLvl < 3000) {
      lvl = {
        currentLvl: 'Level 3',
        nextLvl: 'Level 4',
        prev_lvl_points: 2000,
        current_lvl_points: 3000,
        next_lvl_points: 4000,
      };
    }
    setLvlData(lvl);
  }, [pointsPerLvl]);
  //
  // useEffect(() => {
  //   if (pointsPerLvl > lvlPoints) {
  //     const restPoints = pointsPerLvl % lvlPoints;
  //     // console.log(restPoints);
  //     setPointsPerLvl(lvlData.current_lvl_points); // set next lvl points
  //     setTimeout(() => {
  //       setPointsPerLvl(lvlData.prev_lvl_points);
  //       setLvlPoints(lvlData.next_lvl_points);
  //       setTimeout(() => {
  //         setPointsPerLvl(lvlData.current_lvl_points + restPoints);
  //         setFinalPoints(lvlData.current_lvl_points + restPoints);
  //       }, 500);
  //     }, 500);
  //   }
  // }, [lvlData, lvlPoints, pointsPerLvl]);

  const [displayScorePoints, setDisplayScorePoints] = useState({
    currentProcent: 0,
    allProcent: 100,
  });

  useEffect(() => {
    if (pointsPerLvl > lvlPoints) {
      setDisplayScorePoints({
        currentProcent: 100,
        allProcent: 100,
      });
      setTimeout(() => {
        setDisplayScorePoints({
          currentProcent: 0,
          allProcent: 100,
        });
        setTimeout(() => {
          const restPoints = pointsPerLvl % lvlData.current_lvl_points;
          const gap_between_levels =
            lvlData.next_lvl_points - lvlData.current_lvl_points;
          // console.log(lvlPoints);
          // console.log('lvlData', lvlData);
          // console.log('pointsPerLvl', pointsPerLvl);
          // console.log('restPoints', restPoints);
          setDisplayScorePoints({
            currentProcent: gap_between_levels / restPoints,
            allProcent: 100,
          });
          setLvlPoints(lvlData.next_lvl_points);
        }, 500);
      }, 500);
    } else {
      // console.log('pointsPerLvl');
      console.log(pointsPerLvl - lvlData.prev_lvl_points);
      console.log(
        'result',
        (pointsPerLvl - lvlData.prev_lvl_points) /
          ((lvlData.current_lvl_points - lvlData.prev_lvl_points) / 100),
      );
      setDisplayScorePoints({
        currentProcent:
          (pointsPerLvl - lvlData.prev_lvl_points) /
          ((lvlData.current_lvl_points - lvlData.prev_lvl_points) / 100),
        allProcent: 100,
      });
    }
  }, [lvlPoints, pointsPerLvl]);

  // setTimeout(() => {
  //   const resultProgress = pointsPerLvl / (lvlData.next_lvl_points / 100);
  //   console.log('resultProgress', resultProgress);
  //   setDisplayScorePoints({
  //     currentProcent: resultProgress,
  //     allProcent: 100,
  //   });
  // }, 500);

  const rightBallHandler = () => {
    setPointsPerLvl(prev => prev + 150);
    // const resultInDisplay = (pointsPerLvl + 150) / (lvlPoints / 100);
    // setDisplayScorePoints({currentProcent: resultInDisplay, allProcent: 100});
    // setFinalPoints(prev => prev + 150);

    // inPraktikAPI.checkLogin().then(res => console.log('tete', ));
    // CookieManager.clearAll().then(succcess => {
    //   console.log('CookieManager.clearAll from webkit-view =>', succcess);
    // });
  };

  return (
    <BackgroundImage
      source={require('../../../assets/backgrounds/Home-BG.jpg')}>
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
            <TouchableWithoutFeedback
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('WaitRoom', {sharedItem: data[0]})
              }>
              <SharedElement id={`item.${data[0].id}.icon`}>
                <View
                  style={{
                    width: 125,
                    height: 125,
                    borderRadius: 125,
                    backgroundColor: '#5466fc',
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      color: '#ffffff',
                      textAlign: 'center',
                      top: 30,
                    }}>
                    Wachtkamer
                  </Text>
                  <FontAwesomeIcon
                    icon={data[0].icon}
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      alignSelf: 'center',
                    }}
                    size={85}
                    color="#ffffff"
                  />
                </View>
              </SharedElement>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                rightBallHandler
                // () => setUserPoints(430)
                // navigation.push('FreePlay', {sharedItem: data[1]})
              }>
              <SharedElement id={'rightMenuImage'}>
                <View
                  style={{
                    width: 125,
                    height: 125,
                    borderRadius: 125,
                    backgroundColor: '#00084b',
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      color: '#ffffff',
                      textAlign: 'center',
                      top: 85,
                    }}>
                    Free Play
                  </Text>
                  <FontAwesomeIcon
                    icon={data[1].icon}
                    style={{
                      position: 'absolute',
                      top: -5,
                      alignSelf: 'center',
                    }}
                    size={85}
                    color="#ffffff"
                  />
                </View>
              </SharedElement>
            </TouchableWithoutFeedback>
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
                <Text style={styles.actualLvl}>{lvlData.currentLvl}</Text>
                <Text style={styles.nextLvl}>{lvlData.nextLvl}</Text>
              </View>
              <View style={styles.userProgress}>
                <ProgressBar
                  height={18}
                  step={displayScorePoints.currentProcent}
                  steps={displayScorePoints.allProcent}
                  backgroundColor={['#5466fc', '#5466fc']}
                  userLvl
                  setProgressBarWidth={setProgressBarWidth}
                />
              </View>
              <Text style={styles.pointsInLvl}>
                {pointsPerLvl}/{lvlPoints}
              </Text>
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
