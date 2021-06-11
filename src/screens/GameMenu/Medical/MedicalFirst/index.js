import React, {useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {ArrowNext} from '../../../../components';

const dataAnswers = [
  {title: 'Caries profunda', id: '1', selected: false, isCorrect: true},
  {
    title: 'pijnlijke irreversibele pulpitis',
    id: '2',
    selected: false,
    isCorrect: false,
  },
  {
    title: 'pijnlijke parodontitis apicalis',
    id: '3',
    selected: false,
    isCorrect: false,
  },
  {
    title: 'Niet-pijnlijke pulpitis',
    id: '4',
    selected: false,
    isCorrect: false,
  },
];

const MedicalFirstScreen = ({navigation}) => {
  const [data, setData] = useState(dataAnswers);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const selectAnswer = id => {
    const selectedAnswers = data.map(obj =>
      obj.id === id ? {...obj, selected: true} : {...obj, selected: false},
    );
    setData(selectedAnswers);
    setSelectedAnswer(data.find(el => el.id === id));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => selectAnswer(item.id)}>
        <SharedElement id={`answer.${item.id}`}>
          <View
            style={[
              styles.answer,
              {backgroundColor: item.selected ? '#60ba45' : '#00084b'},
            ]}>
            <Text style={styles.answerText}>{item.title}</Text>
          </View>
        </SharedElement>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<Text>Medical First Screen</Text>*/}
      {/*<Text>Choise answer</Text>*/}
      <View style={styles.nextBtn}>
        <ArrowNext
          onPress={() =>
            navigation.navigate('MedicalSecond', {answer: selectedAnswer})
          }
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.listHeaderStyle}>
            <Text style={styles.headerTitle}>Diagnose Uitsluiten</Text>
            <Text style={styles.headerSubTitle}>
              Welke differentiaal diagnoses is juist?
            </Text>
          </View>
        }
        renderItem={renderItem}
      />

      {/*<Button*/}
      {/*  title="to Second"*/}
      {/*  onPress={() => navigation.navigate('MedicalSecond')}*/}
      {/*/>*/}
      <Button title="go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default MedicalFirstScreen;

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
    marginBottom: 25,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000',
  },
  answer: {
    // backgroundColor: '#00084b',
    marginHorizontal: 40,
    height: 56,
    marginBottom: 8,
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
