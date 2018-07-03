import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  List,
  ListItem,
} from 'react-native';



export default class FriendsList extends React.Component {

  calcBalance = (friend) => {
    let balanceBetweenTwo = 0
    this.props.events.map((event) => {
      if (event.paid === 0 && event.friendIds.filter(item => item === friend.id).length > 0) {
        balanceBetweenTwo += event.cost / event.friendIds.length
      }
      if (event.paid === friend.id && event.friendIds.filter(item => item === 0).length > 0) {
        balanceBetweenTwo -= event.cost / event.friendIds.length
      }
    })
    if(balanceBetweenTwo > 0)
      return <Text>owes you {balanceBetweenTwo}</Text>
    else
      return <Text>you owe him {-balanceBetweenTwo}</Text>
  }

  render() {
    return (
      <View style={{flex: 1}}>
            <Text>
              Friends List:
            </Text>
            <FlatList style={{flex: 1}} data={this.props.friends.filter(item => item.id !== 0)}  keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={() => this.props.onDisplayHistory(item)}>
                      <Text style={{borderWidth: 1}}>{item.name} {this.calcBalance(item)}</Text>
                    </TouchableOpacity>
                  )
              }}/>
      </View>
    );
  }
}
