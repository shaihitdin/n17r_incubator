import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './menuComponents/Logo'
import TotalInfo from './menuComponents/TotalInfo'
import FriendsList from './menuComponents/FriendsList'
import AddFriendButton from './menuComponents/AddFriendButton'
import AddEventButton from './menuComponents/AddEventButton'

export default class Menu extends React.Component {

  changeSnap = (newSnap) => {
    return this.props.onChangeSnap(newSnap)
  }

  displayHistory = (item) => {
    return this.props.onDisplayHistory(item)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Logo />
        <TotalInfo events={this.props.events} friends={this.props.friends} />
        <FriendsList onDisplayHistory={this.displayHistory} events={this.props.events} friends={this.props.friends} />
        <AddFriendButton onChangeSnap={this.changeSnap} />
        <AddEventButton onChangeSnap={this.changeSnap} />

      </View>
    );
  }
}
