import React from 'react';
import {Button, Text, View} from 'react-native';

const MedicalScreen = ({navigation}) => {
  return (
    <View>
      <Text>Medical Screen</Text>
      <Button
        title={'to Game menu'}
        onPress={() => navigation.navigate('GameMenu')}
      />
    </View>
  );
};

export default MedicalScreen;
