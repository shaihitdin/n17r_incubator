import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class AddFriendButton extends React.Component {

  render() {
    return (
      <View style={{flex: 0.4}}>
        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'gray', alignItems: 'center', justifyContent: 'center',}} onPress={() => this.props.onChangeSnap('AddFriend')}>
          <Text style={{fontSize: 15}}>
            Add more friends
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
