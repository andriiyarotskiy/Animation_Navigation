import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FolderIcon from './icons/computer-folder-open.svg';
import MenuIcon from './icons/hamburger-menu.svg';
import StepIndicator from 'react-native-step-indicator';
import AnimatedBottomSheet from '../AnimatedBottomSheet';

const labels = ['One', 'Two', 'Three', 'Four', 'Five'];
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
            <MenuIcon width={40} height={40} fill={'#000'} />
            <Text style={styles.routeName}>Menu</Text>
          </View>
          <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
            <View style={styles.iconContainer}>
              <FolderIcon width={40} height={40} fill={'#000'} />
              <Text style={styles.routeName}>Dossier</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.listSection}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              onPress={step => setCurrentPosition(step)}
              renderLabel={({position, label}) => (
                <>
                  <View style={{bottom: 5}}>
                    <Text style={{fontSize: 12}}>{label}</Text>
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default GameTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aeaeae',
    height: height * 0.1, // 10% height
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {},
  routeName: {
    fontSize: 12,
    textAlign: 'center',
  },
  menuSection: {
    width: width * 0.35,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listSection: {
    backgroundColor: 'grey',
    paddingLeft: 50,
    paddingTop: 20,
    width: width * 2,
    justifyContent: 'center',
  },
  // Left Arrow
  leftArrowContainer: {
    width: width * 0.2,
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
