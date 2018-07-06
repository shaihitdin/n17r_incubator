import { Constants } from 'expo';
import { StyleSheet, View, FlatList } from 'react-native';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import React from 'react';
import {Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  ListSection,
  ListItem,
} from 'react-native-paper'

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View>
        <Card>
          <CardContent>
            <Title>
              {this.props.navigation.getParam('recipe', 'no recipe').title}
            </Title>
            <Paragraph>
              {this.props.navigation.getParam('recipe', 'no recipe').description}
            </Paragraph>
            <ListSection title="Instructions">
              <FlatList data={this.props.navigation.getParam('recipe', 'no recipe').instructions}
                keyExtractor={(item) => item}
                renderItem={(item) => { return (
                  <ListItem title={item.item} />
                )}}
                />
            </ListSection>
            <ListSection title="Ingredients">
              <FlatList data={this.props.navigation.getParam('recipe', 'no recipe').ingredients}
                keyExtractor={(item) => item}
                renderItem={(item) => { return (
                  <ListItem title={item.item} />
                )}}
                />
            </ListSection>

          </CardContent>
        </Card>
      </View>
    );
  }
}
