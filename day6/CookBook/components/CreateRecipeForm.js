
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
    Paragraph} from 'react-native-paper'

const CREATE_RECIPE = gql`
  mutation addRecipe($title: String!, $description: String!, $instructions: [String!]!, $ingredients: [String!]!) {
    createRecipe(title: $title, description: $description, instructions: $instructions, ingredients: $ingredients) {
      id
    }
  }
`;

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
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={64} >
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
                    <FlatList data={this.state.ingredients} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {return (
                        <TextInput
                          value={item.text}
                          onChangeText={writtenText => this.setState({ ingredients: [...this.state.ingredients.slice(0, item.id), {text: writtenText, id: item.id}, ...this.state.ingredients.slice(item.id + 1, this.state.ingredients.length)], })}
                        />
                    )}} />
                  </ListSection>
                  <ListSection style={{flex: 1}} title='Instructions'>
                    <FlatList data={this.state.instructions} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => {return (
                        <TextInput
                          value={item.text}
                          onChangeText={writtenText => this.setState({ instructions: [...this.state.instructions.slice(0, item.id), {text: writtenText, id: item.id}, ...this.state.instructions.slice(item.id + 1, this.state.instructions.length)], })}
                        />
                    )}} />
                  </ListSection>

                </CardContent>
                <CardActions>
                  <Button raised onPress={() => {this.setState({ingredients: [...this.state.ingredients, {text: '', id: this.state.ingredients.length}]})}}>
                    Add ingredient
                  </Button>
                  <Button raised onPress={() => {this.setState({instructions: [...this.state.instructions, {text: '', id: this.state.instructions.length}]})}}>
                    Add instruction
                  </Button>
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
          </KeyboardAvoidingView>
        )}
      </Mutation>
    );
  }
}
