import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
// FakeResponse & FakeRequest

const TestScreen = ({navigation}) => {
  const windowHeight = useWindowDimensions().height; // 760 height window

  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      <View style={{position: 'relative'}}>
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
          textStyle={{fontSize: 36}}
          showsText={true}
          color="#d5d9ff"
          borderColor="#000a42"
        />
      </View>
      {/*<AnimatedCircularProgress*/}
      {/*  size={120}*/}
      {/*  width={35}*/}
      {/*  rotation={0}*/}
      {/*  fill={progress}*/}
      {/*  tintColor="#00e0ff"*/}
      {/*  onAnimationComplete={() => console.log('onAnimationComplete')}*/}
      {/*  backgroundColor="#3d5875">*/}
      {/*  {fill => <Text style={{zIndex: 100}}>{fill}</Text>}*/}
      {/*</AnimatedCircularProgress>*/}
      {/*/!*<AnimatedCircularProgress*!/*/}
      {/*/!*  size={200}*!/*/}
      {/*/!*  width={3}*!/*/}
      {/*/!*  fill={40 / 100}*!/*/}
      {/*/!*  tintColor="#00e0ff"*!/*/}
      {/*/!*  backgroundColor="#3d5875">*!/*/}
      {/*/!*  {fill => <Text>{'some text'}</Text>}*!/*/}
      {/*/!*</AnimatedCircularProgress>*!/*/}
      <View>
        <Button
          title="change progress"
          onPress={() => setProgress(prevState => prevState + 5)}
        />
      </View>
    </View>
  );
};

export default TestScreen;

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
