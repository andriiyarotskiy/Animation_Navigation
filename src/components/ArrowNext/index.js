import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const ArrowNext = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.arrow}>
        <View style={styles.mainLine}>
          <View style={styles.topLine} />
          <View style={styles.bottomLine} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArrowNext;

const styles = StyleSheet.create({
  arrow: {
    width: 42,
    height: 50,
    backgroundColor: '#2130b1',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  mainLine: {
    width: 20,
    height: 2,
    backgroundColor: '#ffffff',
  },
  topLine: {
    position: 'absolute',
    right: -2,
    top: -3,
    transform: [{rotate: '45deg'}],
    width: 10,
    height: 2,
    backgroundColor: '#ffffff',
  },
  bottomLine: {
    position: 'absolute',
    width: 10,
    height: 2,
    right: -2,
    bottom: -3,
    transform: [{rotate: '-45deg'}],
    backgroundColor: '#ffffff',
  },
});
