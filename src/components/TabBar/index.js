import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClinicMedical, faMedal} from '@fortawesome/free-solid-svg-icons';
import HomeIcon from './icons/AI_home.svg';
import UserAI from './icons/AI_user.svg';
import MailIcon from './icons/AI_mail.svg';

const renderTabIcons = (label, focused) => {
  switch (label) {
    case 'Home':
      return <HomeIcon width={35} height={35} />;
    case 'Wait Room':
      return (
        <FontAwesomeIcon icon={faClinicMedical} size={35} color="#2130b1" />
      );
    // return <Test width={50} height={50} fill={'#000'} />;
    case 'Vrienden':
      return <UserAI width={35} height={35} />;
    case 'Berichten':
      return <MailIcon style={{bottom: -5}} width={35} height={35} />;
    case 'Free play':
      return <FontAwesomeIcon icon={faMedal} size={25} color="#2130b1" />;
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

const TabBar = props => {
  const {navigation, sharedItem} = props;
  const routesState = [
    {nameScreen: 'Dashboard', label: 'Home'},
    {nameScreen: 'WaitRoom', label: 'Wait Room'},
    {nameScreen: 'Test', label: 'Vrienden'},
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
            navigation.navigate(tab.nameScreen, {sharedItem: sharedItem})
          }
        />
      ))}
    </View>
  );
};

export default TabBar;

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
