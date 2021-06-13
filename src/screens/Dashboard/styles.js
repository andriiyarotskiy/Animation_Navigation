import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  header: {
    marginHorizontal: 18,
    marginTop: 15,
  },
  headerContent: {},
  appNameStyle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 32,
    lineHeight: 32,
    color: '#00084b',
  },
  mainContent: {
    flex: 1,
    marginHorizontal: 47,
  },
  rowOfBalls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 62,
    // marginBottom: 44, // !!!!!!!!!!!!!!
  },
  // leftBall: {
  //   height: 125,
  //   width: 125,
  //   borderRadius: 100,
  //   justifyContent: 'center',
  //   backgroundColor: '#4649ad',
  // },
  rightBall: {
    height: 125,
    width: 125,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'brown',
  },
  userLevelInfo: {},
  levelTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  actualLvl: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#00084b',
  },
  nextLvl: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#00084b',
  },
  animProgressUser: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#5466fc',
    height: 18,
    borderRadius: 4,
    zIndex: 1,
  },
  userProgress: {
    marginVertical: 5,
  },
  pointsInLvl: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0,
    marginBottom: 10,
    color: '#00084b',
  },
  lvlDescr: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Ubuntu-Medium',
    letterSpacing: 0,
    color: '#00084b',
    marginBottom: 40,
  },
  titleGroup: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#00084b',
  },
  groupProgress: {
    marginVertical: 5,
  },
  groupsRating: {},
  groupsTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  // bestGroups: {
  //
  // },
  rowInfoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerName: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#00084b',
  },
  contentName: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    color: '#00084b',
    marginBottom: 8,
  },
  pointsText: {
    // top: 20,
    zIndex: 2, // zIndex: 1 have user ProgressBar
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    color: '#00084b',
    lineHeight: 26,
  },
});
