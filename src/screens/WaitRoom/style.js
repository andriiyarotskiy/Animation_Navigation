import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  // PACIENT CARD
  pacientCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  // PACIENT CARD
  header: {
    marginHorizontal: 18,
    marginTop: 15,
  },
  headerContent: {},
  leftBall: {
    position: 'absolute',
    top: -45,
    left: -5,
  },
  // menuImage: {
  //   width: 100,
  //   height: 100,
  //   resizeMode: 'cover',
  //   borderRadius: 100,
  // },
  userBlock: {
    position: 'absolute',
    top: 0,
    right: -5,
    minWidth: 200,
    alignItems: 'flex-end',
  },
  pacientList: {
    top: 75,
    marginBottom: 75,
    marginHorizontal: 25,
    flex: 1,
  },
  listHeader: {
    marginTop: 10,
    marginBottom: 20,
  },
  listTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    color: '#00084b',
  },
  listSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#00084b',
    letterSpacing: 0,
    marginTop: 10,
  },
});
