import React from 'react';
import {Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

const CircleScoreBoard = ({progress}) => {
  return (
    <View>
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20}}>
          {progress}
        </Text>
      </View>
      <Progress.Pie
        progress={progress / 100}
        size={75}
        unfilledColor="#ffffff"
        color="#d5d9ff"
        borderColor="#000a42"
      />
    </View>
  );
};

export default CircleScoreBoard;
