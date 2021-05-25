import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import MessageQuestion from './MessageQuestion';

const QuestionBox = ({id, question, selected, addQuestion, setMeasure}) => {
  const questionInListRef = useRef(null);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        questionInListRef.current.measureInWindow((x, y, pageX, pageY) => {
          setMeasure({left: x, top: y});
        });
      }, 0);
    }
  }, [selected]);

  // const onLayout = event => {
  //   const {x, y, height, width} = event.nativeEvent.layout;
  //   console.log('x:', x, 'y:', y, 'height', height, 'width', width);
  // };

  return (
    <View style={{alignItems: 'center'}}>
      {selected ? (
        <View
          ref={questionInListRef}
          style={[styles.containerChoise, {opacity: selected ? 0 : 1}]}>
          <MessageQuestion text={question} />
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            addQuestion(id);
          }}>
          <View style={styles.box}>
            <Text>{question}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default QuestionBox;

const styles = StyleSheet.create({
  containerChoise: {},
  box: {
    padding: 10,
    justifyContent: 'center',
    marginBottom: 10,
    maxWidth: 300,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});
