import React from 'react';
import {Button, Text, View} from 'react-native';

const MedicalSecondScreen = ({navigation}) => {
  return (
    <View>
      <Text>Medical Second Screen</Text>
      <Button
        title="GameMenu"
        onPress={() => navigation.navigate('GameMenu')}
      />
    </View>
  );
};

export default MedicalSecondScreen;
