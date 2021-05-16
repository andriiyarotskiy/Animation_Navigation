import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

const Input = ({inputMessage, onSendPress, setMessage}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Some text"
        value={inputMessage}
        onChangeText={setMessage}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSendPress}>
        <Text style={{color: "#ffffff"}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '85%',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  input: {
    // fontFamily: 'Montserrat_600SemiBold',
    fontSize: 11,
    color: '#fff',
    paddingHorizontal: 10,
    flex: 1,
  },
});
