import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  LayoutAnimation,
  LogBox,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  useDerivedValue,
  interpolateColor,
} from 'react-native-reanimated';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {ArrowNext, BackgroundImage, GameTabBar} from '../../../../components';

LogBox.ignoreAllLogs(true);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomAnimation = {
  duration: 1000,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    duration: 700,
  },
};
// const layoutAnimConfig = {
//   duration: 700,
//   update: {
//     type: LayoutAnimation.Types.easeInEaseOut,
//   },
// };

const DifDiagnoseFirstScreen = ({navigation}) => {
  const {height} = useWindowDimensions();
  const [selectedAnswers, setSelectedAnswers] = useState(null);

  const [data, setData] = useState(dataAnswers);
  const [header, setHeader] = useState({
    title: 'Differentiaal\nDiagnose',
    subTitle: 'Kies de meest waarschijnlijke differentiaal diagnoses.',
  });
  const [isNext, setIsNext] = useState(null);
  const [checkAnswer, setCheckAnswer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  // data.map(el => console.log(el.disable));

  useEffect(() => {
    const addOrderData = data.map((item, i) => ({
      ...item,
      order: i,
      disable: false,
    }));
    setData(addOrderData);
  }, []);

  /** Data force update so that the buttons are blocked until the animation ends **/
  useEffect(() => {
    if (isDisabled) {
      const timeID = setTimeout(() => {
        setIsDisabled(false);
        setData(prevData => prevData.map(obj => ({...obj, disable: false})));
      }, 500); // duration in custom animation Layout
      return () => {
        clearTimeout(timeID);
      };
    }
  }, [data, isDisabled]);
  /** Choice of answer **/

  const selectAnswer = id => {
    setIsDisabled(true);
    offsetArrow.value = withTiming(0, {duration: 700});

    const answers = data.map((obj, i, arr) => {
      if (obj.id === id) {
        return !obj.selected
          ? {...obj, selected: true, disable: true}
          : {...obj, selected: false, disable: true};
      } else {
        return {...obj, disable: true};
      }
    });
    //sort list
    const selected = answers.filter(el => el.selected);
    const unSelected = answers
      .filter(el => !el.selected)
      .sort((a, b) => (a.order > b.order ? 1 : -1));

    setData([...selected, ...unSelected]);
    setSelectedAnswers(selected);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    LayoutAnimation.configureNext(CustomAnimation);
  };
  /** Next Step **/
  const offsetArrow = useSharedValue(100);
  const styleArrowAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetArrow.value}],
    };
  });
  const nextStepHandler = () => {
    setIsNext(true);
    if (!isNext) {
      offsetHeader.value = withSequence(
        withTiming(-(height / 2), {duration: 500}),
        withTiming(0, {duration: 500}),
      );
      setTimeout(() => {
        const filteredData = data.filter(obj => obj.selected);
        setData(filteredData);

        setHeader({
          title: 'Diagnose waarschijnlijkheid',
          subTitle:
            'Zet de differentiaal diagnoses in de juiste volgorde naar waarschijnlijkheid.',
        });
      }, 500);
    }

    if (isNext) {
      setCheckAnswer(true);
      // setTimeout(() => {
      //   navigation.navigate('GameMenu');
      // }, 3000);
    }
    LayoutAnimation.configureNext(CustomAnimation);
  };

  /** Update Header FlatList **/
  const offsetHeader = useSharedValue(0);
  const styleHeaderAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetHeader.value}],
    };
  });

  /** Render Item FlatList **/
  const renderItem = useCallback(
    ({item, index, drag}) => {
      const someElementSelected = data.some(el => el.selected);
      const isFirstUnSelectedElement =
        data.filter(el => !el.selected).slice(0, 1)[0]?.id === item.id;

      let bgColorAnswer;
      if (item.selected && !isNext) {
        bgColorAnswer = '#00084b';
      } else if (!isNext && !item.selected) {
        bgColorAnswer = '#5466fc';
      } else if (isNext && !checkAnswer) {
        bgColorAnswer = '#00084b';
      } else if (isNext && checkAnswer && item.isCorrect) {
        bgColorAnswer = '#60ba45';
      } else {
        bgColorAnswer = '#fc5454';
      }

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={item.disable}
          onPress={!isNext ? () => selectAnswer(item.id) : () => {}}
          onPressIn={isNext ? drag : () => {}}
          delayPressIn={100}>
          <Animated.View
            style={[
              {
                ...styles.answer,
                backgroundColor: bgColorAnswer,
                height: item.selected ? 45 : 50,
                marginTop:
                  isFirstUnSelectedElement && isNext
                    ? height
                    : isFirstUnSelectedElement && someElementSelected
                    ? 50
                    : isNext
                    ? 25
                    : 10,
              },
              {},
            ]}>
            <Text style={styles.answerText}>{item.title}</Text>
          </Animated.View>
        </TouchableOpacity>
      );
    },
    [checkAnswer, data, height, isNext],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackgroundImage
        source={require('../../../../../assets/backgrounds/Basic-BG.jpg')}>
        <Animated.View style={[styles.nextBtn, styleArrowAnim]}>
          <ArrowNext onPress={nextStepHandler} />
        </Animated.View>
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={{height: 175}}>
              <Animated.View
                style={[styles.listHeaderStyle, styleHeaderAnimation]}>
                <Text style={styles.headerTitle}>{header.title}</Text>
                <Text style={styles.headerSubTitle}>{header.subTitle}</Text>
              </Animated.View>
            </View>
          }
          renderItem={renderItem}
          onDragEnd={({data}) => {
            setData(data);
          }}
          ListFooterComponent={<View style={{height: 25}} />}
        />
      </BackgroundImage>
      <View>
        <GameTabBar />
      </View>
    </SafeAreaView>
  );
};

export default DifDiagnoseFirstScreen;

const styles = StyleSheet.create({
  listHeaderStyle: {
    marginHorizontal: 45,
    marginTop: 25,
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    color: '#000',
  },
  headerSubTitle: {
    marginTop: 15,
    // marginBottom: 45,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000',
  },
  answer: {
    marginHorizontal: 40,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5466fc',
    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  answerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  nextBtn: {
    position: 'absolute',
    zIndex: 100,
    top: 50,
    right: 0,
  },
});

const dataAnswers = [
  {title: 'Caries profunda', id: '1', selected: false, isCorrect: true},
  {
    title: 'pijnlijke irreversibele pulpitis',
    id: '2',
    selected: false,
    isCorrect: true,
  },
  {
    title: 'Niet-pijnlijke pulpitis',
    id: '3',
    selected: false,
    isCorrect: false,
  },
  {
    title: 'pijnlijke parodontitis apicalis',
    id: '4',
    selected: false,
    isCorrect: true,
  },
  {
    title: 'niet-pijnlijke parodontitis apicalis',
    id: '5',
    selected: false,
    isCorrect: false,
  },
  // {
  //   title: 'myogene TMD',
  //   id: '6',
  //   selected: false,
  //   isCorrect: false,
  // },
  // {
  //   title: 'myogene TMD2',
  //   id: '7',
  //   selected: false,
  //   isCorrect: false,
  // },
  // {
  //   title: 'myogene TMD3',
  //   id: '8',
  //   selected: false,
  //   isCorrect: false,
  // },
];
