import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const FreePlayScreen = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'orange'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SharedElement id={'rightMenuImage'}>
          <Image
            style={{
              width: 125,
              height: 125,
              resizeMode: 'cover',
              borderRadius: 100,
            }}
            source={{uri: item.image}}
          />
        </SharedElement>
      </TouchableOpacity>
      <Text>Free Play Screen</Text>
      {/*<Button title={'Back'} onPress={() => navigation.goBack()} />*/}
    </View>
  );
};

export default FreePlayScreen;
