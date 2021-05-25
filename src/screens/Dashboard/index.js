import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './styles';
import BackgroundImage from '../../components/BackgroundImage';
import MainMenu from '../../components/MainMenu/MainMenu';
import {SharedElement} from 'react-navigation-shared-element';
import ProgressBar from '../../components/ProgressBar';
import {numberWithDot} from '../../helpers/helpersFunctions';

const image = 'https://reactnative.dev/img/tiny_logo.png';
const data = [{image: image}, {image: image}];

const DashboardScreen = ({route, navigation}) => {
  const {width, height} = useWindowDimensions();

  return (
    <BackgroundImage>
      <View style={{marginHorizontal: 18}}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.appNameStyle}>InPraktijk</Text>
          </View>
          <View style={styles.user}>
            <Text style={styles.userName}>Andreas</Text>
            <Image
              style={{
                width: 32,
                height: 32,
                resizeMode: 'cover',
                borderRadius: 32,
              }}
              source={{uri: image}}
            />
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.rowOfBalls}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('WaitRoom', {item: data[0]})}>
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
            onPress={() => navigation.push('FreePlay', {item: data[1]})}>
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
        </View>
        <View style={styles.userLevelInfo}>
          <View style={styles.levelTextRow}>
            <Text style={styles.actualLvl}>Level 8</Text>
            <Text style={styles.nextLvl}>Level 9</Text>
          </View>
          <View style={styles.userProgress}>
            <ProgressBar
              height={18}
              step={430}
              steps={500}
              backgroundColor={['#5466fc', '#5466fc']}
            />
          </View>
          <Text style={styles.pointsInLvl}>430/500</Text>
          <Text style={styles.lvlDescr}>
            Hint: Next ability “Mystery Guest” at Level 10.
          </Text>
          <View>
            <Text style={styles.titleGroup}>Best Big Groep 1C</Text>
            <View style={styles.groupProgress}>
              <ProgressBar
                height={18}
                step={39810}
                steps={50000}
                backgroundColor={['#00084b', '#00084b']}
                borderColor={'#00084b'}
              />
            </View>
            <Text style={styles.pointsInLvl}>{numberWithDot(39810)}</Text>
          </View>
          <View style={styles.groupsRating}>
            <View style={styles.groupsTitles}>
              <Text style={styles.headerName}>BEST BIG</Text>
              <Text style={styles.headerName}>BEST UNI</Text>
            </View>
            <View>
              <View style={styles.rowInfoGroup}>
                <Text style={styles.contentName}>Groep 3B</Text>
                <Text style={styles.contentName}>Hogeschool Utrecht</Text>
              </View>
              <View style={styles.rowInfoGroup}>
                <Text style={styles.contentName}>Groep 1C</Text>
                <Text style={styles.contentName}>Hogeschool Enschede</Text>
              </View>
              <View style={styles.rowInfoGroup}>
                <Text style={styles.contentName}>Groep 8A</Text>
                <Text style={styles.contentName}>Hogeschool Eindhoven</Text>
              </View>
            </View>
          </View>
        </View>
        {/*<View style={styles.boxContainer} />*/}
        {/*<Button*/}
        {/*  title="Go Test"*/}
        {/*  onPress={() => navigation.navigate('TestScreen')}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  title="Test Shared"*/}
        {/*  onPress={() => navigation.navigate('TestShared')}*/}
        {/*/>*/}
      </View>
      <MainMenu navigation={navigation} sharedItem={data[0]} />
      {/*<GameMenu />*/}
    </BackgroundImage>
  );
};

export default DashboardScreen;
