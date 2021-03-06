import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firstScreen from '../screens/firstScreen';
import secondScreen from '../screens/secondScreen';
import thirdScreen from '../screens/thirdScreen';
import fourScreen from '../screens/fourScreen';
import fiveScreen from '../screens/fiveScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="firstScreen"
        component={firstScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text>FIRST</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="secondScreen" component={secondScreen} />
      <Tab.Screen name="thirdScreen" component={thirdScreen} />
      <Tab.Screen name="fourScreen" component={fourScreen} />
      <Tab.Screen name="fiveScreen" component={fiveScreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
