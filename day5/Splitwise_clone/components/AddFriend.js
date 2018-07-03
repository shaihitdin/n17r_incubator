import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class AddFriend extends React.Component {
  state = {
    friendName: '',
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <Text>
          {'\n\n'}
          Write friend's name
        </Text>
        <TextInput value={this.state.friendName} style={{height: 40, borderColor: 'gray', borderWidth: 1}} underlineColorAndroid='transparent'
            placeholder="Type name" onChangeText={(text) => this.setState({friendName: text})} />
        <TouchableOpacity style={{height: 35, width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'gray', backgroundColor: '#6699ff'}}
          onPress={() => {this.state.friendName.length && this.props.onChangeFriends([...this.props.friends, {name: this.state.friendName, id: this.props.friends.length, balance: 0}]) }}>
          <Text style={{color: 'white'}}>
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
