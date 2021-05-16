import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const secondScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Second screen</Text>
      <Button title="Btn" onPress={() => alert('click')} />
    </View>
  );
};

export default secondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1ccf8',
  },
});
