import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CircleScoreBoard from '../CircleScoreBoard';

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
      <View style={styles.scoreBoard}>
        <CircleScoreBoard progress={props?.score || 15} />
      </View>
    </View>
  );
};

export default PacientHeaderCard;

const styles = StyleSheet.create({
  // PACIENT CARD
  pacientCard: {
    // backgroundColor: 'grey',
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
  scoreBoard: {
    position: 'absolute',
    right: 0,
  },
  // PACIENT CARD
});
