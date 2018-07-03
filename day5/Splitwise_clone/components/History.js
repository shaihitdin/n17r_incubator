import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';


export default class AddFriend extends React.Component {

  side = (item) => {
    return (item.paid === 0) ? -1 : 1
  }


  render() {
    console.disableYellowBox = true
    return (
      <View style={{flex: 1}}>
        <Text>
          {'\n\n'}
        </Text>
        <TouchableOpacity onPress={() => this.props.onChangeSnap('Menu')}>
          <Text style={[{fontSize: 20, height: 40, width: 60, borderRadius: 40, borderWidth: 2}]}>
            Back
          </Text>
        </TouchableOpacity>
        <FlatList style={{flex: 1}}
          data={this.props.events.filter(item => ((item.paid === 0 && item.friendIds.filter(friend => friend === this.props.friend.id).length > 0)
            || (item.paid === this.props.friend.id && item.friendIds.filter(friend => friend === 0).length > 0 )))}
          renderItem={({item}) => {
              return (
                  <Text style={styles.container}>{item.description} {this.side(item) * (item.cost / item.friendIds.length)}</Text>
              )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'gray', alignItems: 'center', justifyContent: 'center'
  },
})
