import { Constants } from 'expo';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import React from 'react';
import {Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph} from 'react-native-paper'

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
          </CardContent>
        </Card>
      </View>
    );
  }
}
