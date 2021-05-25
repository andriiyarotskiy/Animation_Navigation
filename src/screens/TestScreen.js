import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import MessageAnswer from '../components/MessageAnswer';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import QuestionBox from '../components/QuestionBox';
import MessageQuestion from '../components/MessageQuestion';

// FakeResponse & FakeRequest
const FakeQuestions = [
  {message: 'Some question 1'.repeat(5), id: '1', selected: false},
  {message: 'Some question 2'.repeat(5), id: '2', selected: false},
  {message: 'Some question 3', id: '3', selected: false},
  {message: 'Some question 4', id: '4', selected: false},
  {message: 'Some question 5', id: '5', selected: false},
];
const FakeQuestionsFromBackEnd = [
  {message: 'Other question 1'.repeat(5), id: '6', selected: false},
  {message: 'Some question 2'.repeat(5), id: '7', selected: false},
  {message: 'Some question 3'.repeat(5), id: '8', selected: false},
  {message: 'Some question 4', id: '9', selected: false},
  {message: 'Some question 5', id: '10', selected: false},
];
const getResponseOnQuestion = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(),
          message: 'Answer From Back-end'.repeat(10),
        });
      }, 2000);
    });
  } catch (e) {
    console.log(e);
  }
};
const getNewQuestions = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(FakeQuestionsFromBackEnd);
      }, 2000);
    });
  } catch (e) {
    console.log(e);
  }
};

const TestScreen = ({navigation}) => {
  const windowHeight = useWindowDimensions().height; // 760 height window

  /** Initial Value for Animations**/
  const questionsBlock = useSharedValue(0);
  const positionSelectQuestion = useSharedValue({top: 0, left: 0});
  const opacitySelectQuestion = useSharedValue(0);

  /** Initial component Value**/
  const [state, setState] = useState([]);
  const [fakeQuestions, setFakeQuestions] = useState(FakeQuestions);
  const [userChoises, setUserChoises] = useState(null);

  const [measure, setMeasure] = useState(null);
  const [questionPosition, setQuestionPosition] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isNewQuestions, setIsNewQuestions] = useState(false);
  const [newAnswerMessage, setNewAnswerMessage] = useState(false);

  useEffect(() => {
    if (isLoading) {
      getResponseOnQuestion()
        .then(res => {
          setState(s => [...s, res]);
          setNewAnswerMessage(true);
          flatlistRef.current.scrollToEnd({animating: true});
          questionsBlock.value = withDelay(4000, withSpring(0));
        })
        .finally(() => {
          setIsLoading(false);
        });

      setTimeout(() => {
        flatlistRef.current.scrollToEnd({animating: true});
      }, 6000); // 6000 = questionsBlock.value(4000) + resolve promise(2000)
    }

    if (isNewQuestions) {
      getNewQuestions().then(res => {
        setFakeQuestions(res);
      });
    }
  }, [isNewQuestions, isLoading]);

  useEffect(() => {
    if (questionPosition) {
      positionSelectQuestion.value = {
        top: questionPosition.top,
        left: questionPosition.left,
      };
      // opacitySelectQuestion.value = withTiming(1, {duration: 500});
    }
  }, [positionSelectQuestion, questionPosition]);

  const addQuestion = id => {
    const selected = fakeQuestions.map(obj =>
      obj.id === id ? {...obj, selected: true} : obj,
    );
    const selectedQuestion = selected.find(obj => obj.id === id);

    setFakeQuestions(selected);
    setUserChoises(selectedQuestion);
    setState([...state, selectedQuestion]);
    setIsLoading(true);
    setIsNewQuestions(true);

    questionsBlock.value = withTiming(windowHeight, {duration: 1000});
  };

  /** Animate question Question Box **/
  const animateQuestionsBlock = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: questionsBlock.value,
        },
      ],
    };
  });

  /** Animate question message from Question Box **/
  const animateStyle = useAnimatedStyle(() => {
    return {
      top: withSequence(
        withTiming(measure ? measure.top : 0, {duration: 0}),
        withTiming(
          questionPosition ? questionPosition.top : 0,
          {
            duration: 1000,
          },
          isFinished => {
            if (isFinished && !!userChoises) {
              // Do something on end animation after user selected question
              // opacitySelectQuestion.value = 0;
            }
          },
        ),
      ),
      left: withSequence(
        withTiming(measure ? measure.left : 0, {duration: 0}),
        withTiming(questionPosition ? questionPosition.left : 0, {
          duration: 1000,
        }),
      ),
      opacity: withSequence(
        withTiming(questionPosition ? 1 : 0, withTiming(1, {duration: 500})),
        withDelay(1000, withTiming(0, {duration: 300})),
      ),
    };
  });

  const flatlistRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList
          ref={flatlistRef}
          data={state}
          keyExtractor={item => item.id}
          style={{flex: 1}}
          ListHeaderComponent={
            <View style={{marginVertical: 30}}>
              <Text style={{fontSize: 25, color: '#FFF'}}>
                Psychosociale Anamnese
              </Text>
              <Text style={{color: '#fff'}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
                veniam!
              </Text>
            </View>
          }
          renderItem={({item, index}) => {
            if (!(index % 2)) {
              return (
                <MessageQuestion
                  key={item.id}
                  text={item.message}
                  selected={item.selected}
                  setQuestionPosition={setQuestionPosition}
                  bottom={state[state.length - 1].id === item.id ? 150 : 0}
                />
              );
            } else {
              return (
                <MessageAnswer
                  key={item.id}
                  text={item.message}
                  isLoading={isLoading}
                  newAnswerMessage={newAnswerMessage}
                  bottom={state[state.length - 1].id === item.id ? 150 : 0}
                />
              );
            }
          }}
        />
        <Animated.View style={[styles.boxContainer, animateQuestionsBlock]}>
          {fakeQuestions.map((el, index) => (
            <QuestionBox
              key={el.id}
              questionsArray={state}
              id={el.id}
              selected={el.selected}
              question={el.message}
              addQuestion={addQuestion}
              setMeasure={setMeasure}
            />
          ))}
        </Animated.View>
        {userChoises?.selected && measure?.top && (
          <Animated.View style={[{position: 'absolute'}, animateStyle]}>
            <View style={[styles.selectQuestion]}>
              <Text style={{fontSize: 16, color: '#ffffff'}}>
                {userChoises.message}
              </Text>
              <View style={styles.rightArrow} />
              <View style={styles.rightArrowOverlap} />
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default TestScreen;

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe6e6',
    flex: 1,
  },
  main: {
    backgroundColor: '#635f5f',
    flex: 0.85,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  boxContainer: {},

  // selected item

  selectQuestion: {
    backgroundColor: '#0078fe',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10, // marginBottom should be the same as QuestionBox.box
    maxWidth: 300,
    alignSelf: 'flex-end',
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    width: 10,
    height: 30,
    bottom: -20,
    right: 0,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#635f5f',
    width: 10,
    height: 25,
    bottom: -25,
    borderTopRightRadius: 50,
    right: 0,
  },
});

// <ScrollView ref={flatlistRef}>
//   <View style={{marginVertical: 30}}>
//     <Text style={{fontSize: 25, color: '#FFF'}}>
//       Psychosociale Anamnese
//     </Text>
//     <Text style={{color: '#fff'}}>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
//       veniam!
//     </Text>
//   </View>
//   {state.map((item, index) => {
//     if (!(index % 2)) {
//       return (
//         <MessageQuestion
//           key={item.id}
//           text={item.message}
//           selected={item.selected}
//           setQuestionPosition={setQuestionPosition}
//           bottom={state[state.length - 1].id === item.id ? 150 : 0}
//         />
//       );
//     } else {
//       return (
//         <MessageAnswer
//           key={item.id}
//           text={item.message}
//           isLoading={isLoading}
//           newAnswerMessage={newAnswerMessage}
//           bottom={state[state.length - 1].id === item.id ? 150 : 0}
//         />
//       );
//     }
//   })}
// </ScrollView>
