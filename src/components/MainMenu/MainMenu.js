import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IronMan from './icons/ironMan.svg';
import HomeIcon from './icons/home.svg';
import HomeClinic from './icons/home-clinic.svg';
import ManInMask from './icons/face-mask-man.svg';
import MailIcon from './icons/mail.svg';

const renderTabIcons = (title, focused) => {
  switch (title) {
    case 'Home':
      return <HomeIcon width={50} height={50} fill={'#000'} />;
    case 'Wait Room':
      return <HomeClinic width={50} height={50} fill={'#000'} />;
    case 'Vrienden':
      return <ManInMask width={50} height={50} fill={'#000'} />;
    case 'Berichten':
      return (
        <MailIcon style={{bottom: -5}} width={50} height={50} fill={'#000'} />
      );
    case 'Free play':
      return <IronMan width={50} height={50} fill={'#000'} />;
    default:
      return null;
  }
};

const Tab = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconContainer}>
        {renderTabIcons(title)}
        <Text style={styles.routeName}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MainMenu = props => {
  const {navigation, sharedItem} = props;
  const routesState = [
    {nameScreen: 'Dashboard', label: 'Home'},
    {nameScreen: 'WaitRoom', label: 'Wait Room'},
    {nameScreen: 'TestScreen', label: 'Vrienden'},
    {nameScreen: 'TestAnimation', label: 'Berichten'},
    {nameScreen: 'FreePlay', label: 'Free play'},
  ];
  return (
    <View style={styles.container}>
      {routesState.map(tab => (
        <Tab
          key={Math.random().toString()}
          title={tab.label}
          onPress={() =>
            navigation.navigate(tab.nameScreen, {item: sharedItem})
          }
        />
      ))}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aeaeae',
    // flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    // backgroundColor: 'pink',
  },
  routeName: {
    fontSize: 10,
    textAlign: 'center',
  },
});
