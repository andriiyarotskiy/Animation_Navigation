import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const firstScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>First Screeb</Text>
      <Button title="Btn" onPress={() => alert('click')} />
    </View>
  );
};

export default firstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccf3a4',
  },
});
