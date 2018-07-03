import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class Logo extends React.Component {

  calcDebt = () => {
    let result = 0
    this.props.friends.map((friend) => {
      let balanceBetweenTwo = 0
      this.props.events.map((event) => {
        if (event.paid === 0 && event.friendIds.filter(item => item === friend.id).length > 0)
          balanceBetweenTwo += event.cost / event.friendIds.length
        if (event.paid === friend.id && event.friendIds.filter(item => item === 0).length > 0)
          balanceBetweenTwo -= event.cost / event.friendIds.length
      })
      result += Math.min(0, balanceBetweenTwo)
    })

    return -result
  }

  calcOwed = () => {
    let result = 0
    this.props.friends.map(friend => {
      let balanceBetweenTwo = 0
      this.props.events.map(event => {
        if (event.paid === 0 && event.friendIds.filter(item => item === friend.id).length > 0) {
          balanceBetweenTwo += event.cost / event.friendIds.length
        }
        if (event.paid === friend.id && event.friendIds.filter(item => item === 0).length > 0) {
          balanceBetweenTwo -= event.cost / event.friendIds.length
        }
      })
      result += Math.max(0, balanceBetweenTwo)
    })
    return result
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{flex: 1}}>
          Your Debt
          {'\n'}
          {this.calcDebt()}
        </Text>
        <Text style={{flex: 1}}>
          You are owed
          {'\n'}
          {this.calcOwed()}
        </Text>
        <Text style={{flex: 1}}>
          Total Balance
          {'\n'}
          {-this.calcDebt() +this.calcOwed()}
        </Text>
      </View>
    );
  }
}
