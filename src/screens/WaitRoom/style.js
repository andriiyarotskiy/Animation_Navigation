import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  leftBall: {
    top: -(height * 0.04),
    left: width * 0.03,
    justifyContent: 'center',
  },
  pacientList: {
    marginHorizontal: (width / 100) * 5,
  },
  pacientCard: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    marginBottom: 15,
  },
  pacientAva: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: 'brown',
  },
  pacientTextInfo: {
    alignSelf: 'center',
    marginLeft: 15,
  },
  nameStyle: {
    fontSize: 25,
  },
});
