import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  BackgroundImage,
  GameTabBar,
  MessageAnswer,
  MessageQuestion,
  QuestionBox,
} from '../../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import QuestionAngle from './icon/questionAngle.svg';

// FakeResponse & FakeRequest
const FakeQuestions = [
  {
    message: 'Heb je de medicatie genomen zoals voorgeschreven?',
    id: '1',
    selected: false,
  },
  {message: 'Some question 2', id: '2', selected: false},
  {message: 'Some question 3', id: '3', selected: false},
  {
    message: 'Some question 4',
    id: '4',
    selected: false,
  },
  {message: 'Some question 5', id: '5', selected: false},
];
const FakeQuestionsFromBackEnd = [
  {
    message: 'Heb je de medicatie genomen zoals voorgeschreven?',
    id: '6',
    selected: false,
  },
  {message: 'Snoep jij veel tussendoor?', id: '7', selected: false},
  {message: 'Heb je een baan en zo ja waar werk je?', id: '8', selected: false},
  {
    message: 'Eet je anders dan voorheen nu je weet dat je diabetes hebt?',
    id: '9',
    selected: false,
  },
  {
    message: 'Ben je sneller moe?',
    id: Math.random().toString(),
    selected: false,
  },
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

const PsychoSocScreen = ({navigation}) => {
  const {top} = useSafeAreaInsets(); // высота челки

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

  const [isActiveScrool, setIsActiveScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewQuestions, setIsNewQuestions] = useState(false);
  const [newAnswerMessage, setNewAnswerMessage] = useState(false);

  useEffect(() => {
    if (isLoading) {
      getResponseOnQuestion()
        .then(res => {
          setState(s => [...s, res]);
          setNewAnswerMessage(true);
          flatlistRef.current?.scrollToEnd({animating: true});
          questionsBlock.value = withDelay(4000, withSpring(0));
        })
        .finally(() => {
          setIsLoading(false);
        });

      setTimeout(() => {
        flatlistRef.current?.scrollToEnd({animating: true});
      }, 6000); // 6000 = questionsBlock.value(4000) + resolve promise(2000)
      // return () => {
      //   clearTimeout(timeOutID);
      // };
    }

    if (isNewQuestions) {
      getNewQuestions().then(res => {
        setFakeQuestions(res);
      });
    }
    if (!isActiveScrool) {
      const timeOutID = setTimeout(() => {
        setIsActiveScroll(true);
      }, 2000);
      return () => {
        clearTimeout(timeOutID);
      };
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
    setIsActiveScroll(false);

    questionsBlock.value = withTiming(windowHeight, {duration: 750});
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
        withTiming(height, {duration: 0}),
        withTiming(
          questionPosition ? questionPosition.top - (100 + top) : 0,
          {
            duration: 500,
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
          duration: 500,
        }),
      ),
      opacity: withSequence(
        withTiming(questionPosition ? 1 : 0, withTiming(1, {duration: 500})),
        withDelay(1000, withTiming(0, {duration: 1000})),
      ),
    };
  });

  const flatlistRef = useRef(null);

  return (
    <View style={styles.container}>
      <BackgroundImage
        source={require('../../../../assets/backgrounds/Psychosocial-BG.jpg')}
        borderBottomRadius={17}>
        <View style={styles.main}>
          <FlatList
            ref={flatlistRef}
            // onContentSizeChange={() =>
            //   flatlistRef.current.scrollToEnd({animated: true})
            // }
            data={state}
            keyExtractor={item => item.id}
            scrollEnabled={isActiveScrool}
            style={{flex: 1}}
            ListHeaderComponent={
              <View style={styles.listHeaderStyle}>
                <Text style={styles.headerTitle}>Psychosociale Anamnese</Text>
                <Text style={styles.headerSubTitle}>
                  Kies de alleen de vragen die volgens jouw belangrijk zijn.
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
                  />
                );
              } else {
                return (
                  <MessageAnswer
                    key={item.id}
                    text={item.message}
                    isLoading={isLoading}
                    newAnswerMessage={newAnswerMessage}
                  />
                );
              }
            }}
            ListFooterComponent={
              <Animated.View
                style={[styles.boxContainer, animateQuestionsBlock]}>
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
            }
          />
          {userChoises?.selected && measure?.top && (
            <Animated.View style={[{position: 'absolute'}, animateStyle]}>
              <View style={[styles.selectQuestion]}>
                <Text style={styles.textQuestion}>{userChoises.message}</Text>
                <QuestionAngle
                  style={{position: 'absolute', bottom: -11, right: -6}}
                  width={20}
                  height={20}
                />
              </View>
            </Animated.View>
          )}
        </View>
      </BackgroundImage>
      <GameTabBar />
    </View>
  );
};

export default PsychoSocScreen;

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    // backgroundColor: '#635f5f',
    flex: 1,
    // paddingHorizontal: 45,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
  },
  mainContent: {},
  boxContainer: {
    marginTop: 30,
    marginHorizontal: 45,
  },

  listHeaderStyle: {
    marginHorizontal: 45,
    marginTop: 25,
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    color: '#ffffff',
  },
  headerSubTitle: {
    marginTop: 15,
    marginBottom: 25,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
  },

  // selected item

  selectQuestion: {
    backgroundColor: '#00084b',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    maxWidth: 288,
    alignSelf: 'flex-end',

    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#5466fc',
  },
  textQuestion: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
  },
});
