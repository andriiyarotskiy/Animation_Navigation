import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const thirdScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Third Screeb</Text>
      <Button title="Btn" onPress={() => alert('click')} />
    </View>
  );
};

export default thirdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71fdcf',
  },
});
