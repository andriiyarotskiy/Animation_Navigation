import React from 'react';
import {Dimensions, ScrollView, Text, View, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

const {width, height} = Dimensions.get('window');

const AnimatedBottomSheet = ({sheetRef, content}) => {
  const renderHeader = () => (
    <View style={styles.headerStyle}>
      <Text style={styles.headerText}>Dossier</Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.content}>
      <ScrollView>
        <Text style={styles.contentText}>
          {content ? content : 'Swipe down to close'}
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <BottomSheet
      initialSnap={1}
      ref={sheetRef}
      snapPoints={['80%', 0, 0]}
      renderContent={renderContent}
      renderHeader={renderHeader}
      enabledInnerScrolling={true}
      enabledContentGestureInteraction={false}
    />
  );
};
export default AnimatedBottomSheet;

const styles = StyleSheet.create({
  headerStyle: {
    bottom: -0.8,
    width: '35%',
    height: 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: (width / 100) * 3,
    opacity: 0.95,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#00000029',
    shadowOpacity: 1,
    elevation: 4,
    backgroundColor: '#ffffff', // invisible color
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    color: '#00084b',
    paddingTop: 7,
  },
  content: {
    padding: 16,
    height: '100%',
    borderTopRightRadius: 8,
    marginHorizontal: (width / 100) * 3,
    opacity: 0.95,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#00000029',
    shadowOpacity: 1,
    elevation: 4,
    backgroundColor: '#ffffff', // invisible color
  },
  contentText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: '#00084b',
    lineHeight: 24,
  },
});
