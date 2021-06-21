import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FolderIcon from './icons/dossier.svg';
import StepIndicator from 'react-native-step-indicator';
import AnimatedBottomSheet from '../AnimatedBottomSheet';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

// const labels = ['One', 'Two', 'Three', 'Four', 'Five'];
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  stepIndicatorCurrentColor: '#5466fc',
  stepStrokeCurrentColor: 'transparent', // border color current step
  stepStrokeFinishedColor: '#5466fc',
  stepStrokeUnFinishedColor: '#5466fc',
  separatorFinishedColor: '#5466fc',
  stepIndicatorFinishedColor: '#5466fc',
  separatorUnFinishedColor: '#2130b1',
  stepIndicatorUnFinishedColor: '#2130b1',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  labelColor: '#FFF',
  currentStepLabelColor: '#FFF',
};
const {width, height} = Dimensions.get('window');

const GameTabBar = () => {
  const sections = useSelector(state =>
    state.section.sections.map(s => s.display_name),
  );

  /** Animations **/
  const offsetStepIndicator = useSharedValue(width);

  const styleStepAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetStepIndicator.value}],
    };
  });

  useEffect(() => {
    if (sections.length) {
      offsetStepIndicator.value = withSpring(0, {damping: 16});
    }
  }, [sections.length]);

  /** Animations **/
  const [currentPosition, setCurrentPosition] = useState(0);

  /** Animated Bottom Sheet **/
  const sheetRef = React.useRef(null);
  /** Animated Bottom Sheet **/

  return (
    <View>
      <AnimatedBottomSheet sheetRef={sheetRef} content={'Lorem '.repeat(500)} />
      <View style={styles.container}>
        <View style={styles.menuSection}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faBars} size={25} color="#2130b1" />
            {/*<GameMenuIcon width={25} height={25} />*/}
            <Text style={styles.routeName}>Menu</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
              <FolderIcon
                width={27}
                height={21}
                style={{
                  marginVertical: 2,
                  alignSelf: 'center',
                }}
              />
              <Text style={[styles.routeName]}>Dossier</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*<LinearGradient*/}
        {/*  style={{*/}
        {/*    paddingLeft: 0,*/}
        {/*    width: 25,*/}
        {/*    height: 65,*/}
        {/*    position: 'absolute',*/}
        {/*    zIndex: 2,*/}
        {/*    // left: -6,*/}
        {/*    // right: 0,*/}
        {/*  }}*/}
        {/*  locations={[0, 0, 1]}*/}
        {/*  start={{x: 0, y: 0}}*/}
        {/*  end={{x: 1, y: 0}}*/}
        {/*  colors={['#fff', 'red', '#fff']}*/}
        {/*/>*/}

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View
            style={[
              styles.listSection,
              {width: width * sections.length * 0.4},
            ]}>
            <Animated.View style={styleStepAnim}>
              <StepIndicator
                stepCount={sections.length ? sections.length : 3}
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={sections}
                onPress={step => setCurrentPosition(step)}
                renderLabel={({position, label, stepStatus}) => (
                  <>
                    <View style={{bottom: 6}}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontSize: 9,
                          color:
                            stepStatus === 'unfinished' ? '#2130b1' : '#5466fc',
                        }}>
                        {label}
                      </Text>
                    </View>
                    {position === 0 && (
                      <>
                        <View style={styles.leftArrowContainer}>
                          <View style={styles.topLineArrow} />
                          <View style={styles.bottomLineArrow} />
                        </View>
                      </>
                    )}
                  </>
                )}
              />
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default GameTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 65, // 10% height
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: '100%',
    alignItems: 'center',
  },
  routeName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 10,
    color: '#2130b1',
    textAlign: 'center',
  },
  menuSection: {
    paddingLeft: 25,
    paddingVertical: 10,
    width: width * 0.35,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  listSection: {
    paddingLeft: 50,
    paddingTop: 8,
    justifyContent: 'center',
  },
  // Left Arrow
  leftArrowContainer: {
    width: width * 0.2 + 15,
    height: 2,
    backgroundColor: '#5466fc',
    position: 'absolute',
    left: -15,
    top: -20,
    zIndex: -1,
  },
  topLineArrow: {
    top: -5,
    left: -2,
    width: 15,
    height: 2,
    backgroundColor: '#5466fc',
    transform: [{rotate: '-45deg'}],
  },
  bottomLineArrow: {
    top: 3,
    left: -3,
    width: 15,
    height: 2,
    backgroundColor: '#5466fc',
    transform: [{rotate: '45deg'}],
  },
});
