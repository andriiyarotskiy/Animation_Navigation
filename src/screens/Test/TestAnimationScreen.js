import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const state = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];

const image = 'https://reactnative.dev/img/tiny_logo.png';

const data = [{image: image}, {image: image}];

const TestAnimationScreen = ({navigation, route}) => {
  const [position, setPosition] = useState(null);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (testChildRef.current && testParentRef.current) {
  //     testChildRef.current.measureLayout(
  //       testParentRef.current,
  //       (left, top, width, height) => {
  //         setPosition({left, top, width, height});
  //       },
  //     );
  //   }
  // }, [position]);

  // const myRef = useRef();
  //
  // const showRefPosition = () => {
  //   console.log('button clicked, set focus and log position');
  //   // this works and shows that i am using the ref correctly
  //   myRef.current.measureInWindow((x, y, pageX, pageY) => {
  //     console.log('Component x is: ' + x);
  //     console.log('Component y is: ' + y);
  //     console.log('Component pageX is: ' + pageX);
  //     console.log('Component pageY is: ' + pageY);
  //   });
  // };
  //
  // const addItem = () => {
  //   showRefPosition();
  //   setData([...data, new Date().toLocaleDateString()]);
  //   flatlistRef.current.scrollToEnd({animating: true});
  // };
  //
  // const flatlistRef = useRef(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'pink',
        // justifyContent: 'center',
        marginHorizontal: 15,
      }}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Left', {item: data[0]})}>
          <SharedElement id={'leftMenuImage'}>
            <Image
              style={{
                width: 125,
                height: 125,
                resizeMode: 'cover',
                borderRadius: 150,
              }}
              source={{uri: data[0].image}}
            />
          </SharedElement>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Right', {item: data[1]})}>
          <View style={styles.item}>
            <SharedElement id={'rightMenuImage'}>
              <Image
                style={{
                  width: 125,
                  height: 125,
                  resizeMode: 'cover',
                  borderRadius: 100,
                }}
                source={{uri: data[1].image}}
              />
            </SharedElement>
          </View>
        </TouchableOpacity>
        {/*</View>*/}
        {/*<View style={styles.circle}>*/}
        {/*  <TouchableOpacity onPress={() => console.log('icon press 2')}>*/}
        {/*    <IronMan*/}
        {/*      style={{alignSelf: 'center'}}*/}
        {/*      height={100}*/}
        {/*      width={100}*/}
        {/*      fill={'#FFF'}*/}
        {/*    />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </View>

      {/*<View style={{marginTop : 15}}>*/}
      {/*  <Button title={'Back'} onPress={() => navigation.goBack()} />*/}
      {/*  <Button*/}
      {/*    title={'Left'}*/}
      {/*    onPress={() => navigation.push('Left', {item: data[0]})}*/}
      {/*  />*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};

export default TestAnimationScreen;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 200,
    // position: 'relative',
  },
  circle: {
    backgroundColor: '#528bff',
    width: 125,
    height: 125,
    borderRadius: 150,
    justifyContent: 'center',
  },
  item: {
    // backgroundColor: 'red',
    // zIndex: 100,
  },
});

// <FlatList
//   ref={flatlistRef}
//   data={data}
//   keyExtractor={(item, index) => index.toString()}
//   // ListHeaderComponent={
//   //   <View
//   //     style={{height: 200, width: '100%', backgroundColor: 'purple'}}
//   //   />
//   // }
//   // ListEmptyComponent={<View style={{minHeight: '30%'}} />}
//   renderItem={({item, index}) => {
//     if (index % 2) {
//       return (
//         <View
//           style={{
//             width: 100,
//             height: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//             alignSelf: 'flex-start',
//             marginLeft: 30,
//             backgroundColor: '#fff',
//             // marginBottom: 10,
//           }}>
//           <Text>{item}</Text>
//         </View>
//       );
//     } else {
//       return (
//         <View
//           style={{
//             width: 100,
//             height: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 30,
//             alignSelf: 'flex-end',
//             backgroundColor: '#aeaeae',
//             // marginBottom: 10,
//           }}>
//           <Text>{item}</Text>
//         </View>
//       );
//     }
//   }}
//   ListFooterComponent={
//     <View
//       style={{
//         height: 200,
//         width: '100%',
//         backgroundColor: 'grey',
//         alignItems: 'flex-start',
//         justifyContent: 'space-between',
//       }}>
//       <TouchableWithoutFeedback onPress={addItem}>
//         <View
//           ref={myRef}
//           style={{width: 100, height: 50, backgroundColor: '#FFF'}}>
//           <Text>Add ITEM 1</Text>
//         </View>
//       </TouchableWithoutFeedback>
//       <TouchableWithoutFeedback onPress={addItem}>
//         <View style={{width: 100, height: 50, backgroundColor: '#FFF'}}>
//           <Text>Add ITEM 2</Text>
//         </View>
//       </TouchableWithoutFeedback>
//       <TouchableWithoutFeedback onPress={addItem}>
//         <View style={{width: 100, height: 50, backgroundColor: '#FFF'}}>
//           <Text>Add ITEM 3</Text>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   }
//   ListFooterComponentStyle={{paddingBottom: 100}}
// />
