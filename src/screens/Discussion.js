import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Received from '../components/Received';
import Sent from '../components/Sent';
import LinearGradient from 'react-native-linear-gradient';

const arrTest = [0, 1, 2, 3, 4, 5];

const only2 = arrTest.map(el => !(el % 2));
// console.log(only2);

const FakeState = [
  {
    id: 1,
    message: 'Wuz Up! Lorem ipsum is simply dummy text of',
  },
  {
    id: 2,
    message: 'How are you ? =)',
  },
  {
    id: 3,
    message:
      'It has servived not only five centuries but also the leap of electronic type setting',
  },
  {
    id: 4,
    message: 'Contrary to popular beleif . Lorem ipsum is not random text  ',
  },
  {
    id: 5,
    message: 'Hi, i want to see you!',
  },
];

const Discussion = ({route, navigation}) => {
  // const {itemName, itemPic} = route.params;

  const [state, setState] = useState(FakeState);
  const [isLoad, setIsLoad] = useState(false);

  const [inputMessage, setMessage] = useState('');

  const dialogArray = state.map((m, i) => {
    if (!(i % 2)) {
      return <Received key={Math.random().toString()} message={m.message} />;
    } else {
      return <Sent key={Math.random().toString()} message={m.message} />;
    }
  });

  const send = () => {
    const fakeText = {
      id: Math.random().toString(),
      message:
        'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    };
    setState([...state, fakeText]);
    // Data.push({id: inputMessage, message: inputMessage});
    // setMessage('');
  };
  // var newMessage = [];
  // for (var i = 5; i < Data.length; i++) {
  //   newMessage.push(<Sent key={Data[i].id} message={Data[i].message} />);
  // }
  // console.log('Data', Data);

  const getResponse = async () => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({id: 123, message: 'Answer From Back-end'});
        }, 1500);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLoad) {
      getResponse().then(res => {
        setIsLoad(false);
        setState(s => [...s, res]);
      });
    }
  }, [isLoad]);

  const messageFromBackEnd = () => {
    setIsLoad(true);
  };

  return (
    <LinearGradient
      colors={['#f26a50', '#f26a50', '#f20045']}
      style={styles.container}>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <Text>Left</Text>
            </View>
          </TouchableOpacity>
          {/*<Text style={styles.username}>{itemName}</Text>*/}
          {/*<Image source={{uri: itemPic}} style={styles.avatar} />*/}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dialogArray}
          {isLoad ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : null}
          {/*<LastWatch checkedOn="Yesterday" />*/}
          {/*<Received message={Data[0].message} />*/}
          {/*<Sent message={Data[1].message} />*/}
          {/*<Received message={Data[2].message} />*/}
          {/*<Sent message={Data[3].message} />*/}
          {/*/!*<LastWatch checkedOn="Today" />*!/*/}
          {/*<Received message={Data[4].message} />*/}
          {/*<View>{newMessage}</View>*/}
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title={'Send(From Back-end)'} onPress={messageFromBackEnd} />
        <Button title={'Send(User)'} onPress={send} />
      </View>
      {/*<Input*/}
      {/*  inputMessage={inputMessage}*/}
      {/*  setMessage={inputMessage => setMessage(inputMessage)}*/}
      {/*  onSendPress={send}*/}
      {/*/>*/}
    </LinearGradient>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  main: {
    backgroundColor: '#FFF',
    height: '88%',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#000119',
    // fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
