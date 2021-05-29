import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import MessageQuestion from '../MessageQuestion';

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
    <View style={{}}>
      {selected ? (
        <View
          ref={questionInListRef}
          style={[styles.containerChoise, {opacity: selected ? 0.5 : 1}]}>
          <MessageQuestion text={question} />
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            addQuestion(id);
          }}>
          <View style={styles.box}>
            <Text style={styles.textQuestion}>{question}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#5466fc',

    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2130b1',
    borderRadius: 8,
  },
  textQuestion: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
  },
});
