import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import Logo from './menuComponents/Logo'

export default class AddFriend extends React.Component {
  state = {
    participants: [0],
    paid: 0,
    description: '',
    cost: '',
  }



  handleClickParticipants = (item) => {
    this.setState ({
      participants: [...this.state.participants, item.id],
    })
  }
  handleClickPaid = (item) => {
    this.setState ({
      paid: item.id,
    })
  }

  isNumeric = (val) => {
    return Number(parseFloat(val)) == val
  }

  mergeIntoEvent = () => {
    const ids = this.state.participants.filter(item => this.state.participants.filter(it => it === item).length % 2 === 0 ? false : true)
    return {friendIds: ids, cost: Number(this.state.cost), description: this.state.description, paid: this.state.paid}
  }


  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior='padding'
      >
        <Logo />
        <Text style={{flex: 1}}>
          List of participated friends:
        </Text>
        <FlatList style={{flex: 10}} data={this.props.friends.filter(item => item.id !== 0)}  keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {
              const v1 = <Text style={styles.container}> {item.name} </Text>
              const v2 = <Text style={styles.container}> {item.name}✔️</Text>
              return (
                <TouchableOpacity onPress={() => this.handleClickParticipants(item)}>
                  {this.state.participants.filter(it => it === item.id).length % 2 === 0 ? v1 : v2}
                </TouchableOpacity>
              )
        }}/>
      <Text style={{flex: 1}}>
          Who paid:
        </Text>
        <FlatList style={{flex: 10}} data={this.props.friends}  keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {
                const v1 = <Text style={styles.container}> {item.name} </Text>
                const v2 = <Text style={styles.container}> {item.name}✔️</Text>
                return (
                  <TouchableOpacity onPress={() => this.handleClickPaid(item)}>
                    {this.state.paid !== item.id ? v1 : v2}
                  </TouchableOpacity>
                )
        }}/>


      <TextInput value={this.state.description} style={styles.input} underlineColorAndroid='transparent'
        placeholder="Type description" onChangeText={(text) => this.setState({description: text})} />
      <TextInput value={this.state.cost} style={styles.input} underlineColorAndroid='transparent'
          placeholder="Type cost" onChangeText={(text) => this.setState({cost: text})} />

        <TouchableOpacity style={{height: 35, width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'gray', backgroundColor: '#6699ff'}}
          onPress={() => {this.state.description.length > 0 && this.isNumeric(this.state.cost) && this.props.onAddEvent(this.mergeIntoEvent())}}>
          <Text style={{color: 'white'}}>
            Ok
          </Text>
        </TouchableOpacity>
        <View />

    </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'gray',
    height: 40,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  }
});
