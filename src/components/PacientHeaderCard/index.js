import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const PacientHeaderCard = ({photo, name, subTitle, ...props}) => {
  return (
    <View style={styles.pacientCard}>
      <View style={styles.pacientAva}>
        <FastImage
          style={{
            width: 75,
            height: 75,
          }}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: photo,
            priority: FastImage.priority.low,
            cache: FastImage.cacheControl.immutable,
          }}
        />
      </View>
      <View style={styles.pacientTextInfo}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.timerStyle}>
        <Text style={styles.countText}>15</Text>
      </View>
    </View>
  );
};

export default PacientHeaderCard;

const styles = StyleSheet.create({
  // PACIENT CARD
  pacientCard: {
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
});
