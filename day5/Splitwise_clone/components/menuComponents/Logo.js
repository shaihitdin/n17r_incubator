import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class Logo extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
          There should be your logo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    alignItems: 'center',
    backgroundColor: 'pink',
    justifyContent: 'center',
  },

})
