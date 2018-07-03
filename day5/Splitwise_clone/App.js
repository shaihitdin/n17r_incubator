import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './components/Menu'
import AddFriend from './components/AddFriend'
import AddEvent from './components/AddEvent'
import History from './components/History'

export default class App extends React.Component {
  state = {
    currentSnap: 'Menu',
    friends: [{name: 'You', id: 0, balance: 0}],
    events: [],
    friendToDisplay: {name: 'You', id: 0, balance: 0},
  }

  changeFriends = (newFriends) => {
    this.setState ({
      friends: newFriends,
      currentSnap: 'Menu',
    })
  };

  changeSnap = (newSnap) => {
    this.setState ({
      currentSnap: newSnap,
    })
  };

  displayHistory = (item) => {
    this.setState ({
      friendToDisplay: item,
      currentSnap: 'History',
    })
  }

  addEvent = (newEvent) => {
    this.setState ({
        events: [...this.state.events, newEvent],
        currentSnap: 'Menu',
    })
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.currentSnap === 'Menu' && <Menu friends={this.state.friends} onChangeFriends={this.changeFriends}  events={this.state.events}
        onDisplayHistory={this.displayHistory} onChangeSnap={this.changeSnap}  />}
        {this.state.currentSnap === 'AddFriend' && <AddFriend onChangeFriends={this.changeFriends} friends={this.state.friends} />}
        {this.state.currentSnap === 'AddEvent' && <AddEvent onAddEvent={this.addEvent} friends={this.state.friends} />}
        {this.state.currentSnap === 'History' && <History friend={this.state.friendToDisplay} events={this.state.events} onChangeSnap={this.changeSnap}  />}

      </View>
    );
  }
}
