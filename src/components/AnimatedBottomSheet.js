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
        <Text>{content ? content : 'Swipe down to close'}</Text>
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
    backgroundColor: 'green',
    width: '40%',
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: (width / 100) * 3,
    opacity: 0.8,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  content: {
    backgroundColor: 'pink',
    padding: 16,
    height: '100%',
    borderTopRightRadius: 10,
    marginHorizontal: (width / 100) * 3,
    opacity: 0.8,
  },
});
