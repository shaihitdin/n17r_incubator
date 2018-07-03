import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class AddFriend extends React.Component {

  filtrate = (event) => {
    return (event.paid === 0 && event.friendIds.filter(id => id === this.props.friend.id))
    || (event.paid === this.props.friend.id && event.friendIds.filter(id => id === 0))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>
          {'\n\n'}
        </Text>
        <TouchableOpacity onPress={() => this.props.onChangeSnap('Menu')}>
          <Text style={{fontSize: 20, height: 40, width: 40, borderRadius: 40}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'gray', alignItems: 'center', justifyContent: 'center'
  },
})
