import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

const UserCard = ({userAva, name}) => {
  return (
    <View style={styles.user}>
      <Text style={styles.userName}>{name}</Text>
      <Image
        style={{
          width: 32,
          height: 32,
          resizeMode: 'cover',
          borderRadius: 32,
        }}
        source={{uri: userAva}}
      />
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    color: '#00084b',
    marginRight: 10,
  },
});
