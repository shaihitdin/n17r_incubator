import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class AddEventButton extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'gray', alignItems: 'center', justifyContent: 'center',}} onPress={() => this.props.onChangeSnap('AddEvent')}>
          <Text style={{fontSize: 15}}>
            Add more events
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
