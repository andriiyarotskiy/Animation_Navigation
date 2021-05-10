import React from 'react';
import {Button, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Animation1 = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value * 255}],
    };
  });

  return (
    <View style={{flex: 1, marginTop: 50}}>
      <Text style={{fontSize: 40, textAlign: 'center'}}> Animation </Text>

      <Animated.View
        style={[
          {width: 100, height: 100, backgroundColor: 'red'},
          animatedStyles,
        ]}
      />
      <Button
        onPress={() =>
          (offset.value = withSpring(Math.random(), {}, () => {
            console.log('test4');
          }))
        }
        title="Move Test"
      />
    </View>
  );
};

export default Animation1;
