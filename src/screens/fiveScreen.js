import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const fiveScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>fifth Screen</Text>
      <Button title="Btn" onPress={() => alert('click')} />
    </View>
  );
};

export default fiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#826b6b',
  },
});
