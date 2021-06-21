import {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const numberWithDot = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// Write to Async Storage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

// Get from Async Storage
export const getFromAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const parseValue = JSON.parse(value);
    if (parseValue !== null) {
      // value previously stored
      return parseValue;
    }
  } catch (e) {
    // error reading value
  }
};
