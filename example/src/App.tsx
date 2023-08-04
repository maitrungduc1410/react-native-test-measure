import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TestMeasureView } from 'react-native-test-measure';

export default function App() {
  return (
    <View style={styles.container}>
      <TestMeasureView
        renderTemplate={() => (
          <View>
            <Text>Tooltip content</Text>
          </View>
        )}
      >
        <Text>Tooltip anchor</Text>
      </TestMeasureView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
