import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

const LeftScreen = ({navigation, route}) => {
  const {item} = route.params;
  // console.log('LeftScreen', route.params);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SharedElement id={'leftMenuImage'}>
          <Image
            style={{
              width: 75,
              height: 75,
              resizeMode: 'cover',
              borderRadius: 50,
            }}
            source={{uri: item.image}}
          />
        </SharedElement>
      </TouchableOpacity>

      <Text>DetailScreen</Text>
      {/*<Button title={'Back'} onPress={() => navigation.goBack()} />*/}
    </View>
  );
};

export default LeftScreen;
