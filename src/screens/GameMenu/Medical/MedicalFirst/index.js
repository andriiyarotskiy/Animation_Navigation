import React from 'react';
import {Button, Text, View} from 'react-native';

const MedicalFirstScreen = ({navigation}) => {
  return (
    <View>
      <Text>Medical First Screen</Text>
      <Button
        title="to Second"
        onPress={() => navigation.navigate('MedicalSecond')}
      />
      <Button title="go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MedicalFirstScreen;
