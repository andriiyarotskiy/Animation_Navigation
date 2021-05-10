import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const foudScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Fourth Screen</Text>
      <Button title="Btn" onPress={() => alert('click')} />
    </View>
  );
};

export default foudScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f898c8',
  },
});
