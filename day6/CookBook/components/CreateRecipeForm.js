
import {View, ActivityIndicator, ScrollView, Text, FlatList, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import React from 'react';
import {TextInput,
    Button,
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    ListSection,
    ListItem,
    Paragraph} from 'react-native-paper'

const CREATE_RECIPE = gql`
  mutation addRecipe($title: String!, $description: String!, $instructions: [String!]!, $ingredients: [String!]!) {
    createRecipe(title: $title, description: $description, instructions: $instructions, ingredients: $ingredients) {
      id
    }
  }
`;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class CreateRecipeForm extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    name: '',
    description: '',
    instructions: [{text: '', id: 0}],
    ingredients: [{text: '', id: 0}],
  }
  render() {
    return (
      <Mutation mutation={CREATE_RECIPE}>
        {(createRecipe, {data, loading, error}) => (
          <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} extraHeight={50} extraScrollHeight={50}>
            <View style={{flex: 1}}>
              <Card style={{flex: 1}}>
                  <CardContent style={{flex: 1}}>
                    <TextInput
                      label='Recipe name'
                      value={this.state.name}
                      onChangeText={text => this.setState({ name: text })}
                    />
                    <TextInput
                      label='Recipe description'
                      value={this.state.description}
                      onChangeText={text => this.setState({ description: text })}
                    />
                  <ListSection style={{flex: 1}} title='Ingredients'>
                    <FlatList style={{flex: 1}} data={this.state.ingredients.filter((item) => item.id !== this.state.ingredients.length - 1)} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {return (
                      <ListItem
                        title={item.text}
                      />
                    )}} />
                    <TextInput
                      style={{flex: 1}}
                      value={this.state.ingredients[this.state.ingredients.length - 1].text}
                      onChangeText={writtenText => this.setState({ ingredients: [...this.state.ingredients.slice(0, this.state.ingredients[this.state.ingredients.length - 1].id),
                        {text: writtenText, id: this.state.ingredients[this.state.ingredients.length - 1].id},
                        ...this.state.ingredients.slice(this.state.ingredients[this.state.ingredients.length - 1].id + 1, this.state.ingredients.length)], })}
                    />
                  </ListSection>


                  <Button raised onPress={() => {this.setState({ingredients: [...this.state.ingredients, {text: '', id: this.state.ingredients.length}]})}}>
                    Add ingredient
                  </Button>

                  <ListSection style={{flex: 1}} title='Instructions'>
                    <FlatList style={{flex: 1}} data={this.state.instructions.filter((item) => item.id !== this.state.instructions.length - 1)} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {return (
                      <ListItem
                        title={item.text}
                      />
                    )}} />
                    <TextInput
                      style={{flex: 1}}
                      value={this.state.instructions[this.state.instructions.length - 1].text}
                      onChangeText={writtenText => this.setState({ instructions: [...this.state.instructions.slice(0, this.state.instructions[this.state.instructions.length - 1].id),
                        {text: writtenText, id: this.state.instructions[this.state.instructions.length - 1].id},
                        ...this.state.instructions.slice(this.state.instructions[this.state.instructions.length - 1].id + 1, this.state.instructions.length)], })}
                    />

                  </ListSection>
                  <Button raised onPress={() => {this.setState({instructions: [...this.state.instructions, {text: '', id: this.state.instructions.length}]})}}>
                    Add instruction
                  </Button>


                </CardContent>
                <CardActions>
                  {loading
                    ? <ActivityIndicator />
                    : (
                      <Button raised onPress={() => {
                          createRecipe({
                            variables: {
                              title: this.state.name,
                              description: this.state.description,
                              ingredients: this.state.ingredients.map(item => item.text),
                              instructions: this.state.instructions.map(item => item.text),
                            }
                          })
                          this.props.navigation.goBack()
                        }}>
                        Add recipe
                      </Button>
                    )
                  }
                </CardActions>
              </Card>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Mutation>
    );
  }
}
