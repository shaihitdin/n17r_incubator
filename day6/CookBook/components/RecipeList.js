import { Constants } from 'expo';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Button, ListItem, ListSection, Text, FAB } from 'react-native-paper';

const GET_ALL_RECIPES = gql`
{
  allRecipes {
    id
    title
    description
    instructions
    ingredients
  }
}
`;

export default class RecipeList extends React.Component {
  static navigationOptions = {
    title: 'CookBook',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    state = {
      refreshing: false,
    }
    return (
      <View style={{flex: 1}}>
          <Query query={GET_ALL_RECIPES}>
            {({loading, data, error, refetch}) => (
                loading
                  ? <ActivityIndicator />
                  : (
                      <FlatList
                      keyExtractor={item => item.id}
                      data={data.allRecipes}
                      refreshing={loading}
                      onRefresh={() => refetch()}
                      renderItem={({item}) => { return (
                          <ListItem title={item.title} description={item.description} onPress={() => this.props.navigation.push('DetailsScreenSnap', {recipe: item})}/>
                      )}}
                    />
                  )
            )}
          </Query>
        <FAB
          small
          icon="add"
          style={{flexDirection: 'row',
            alignItems:'center',
            justifyContent:'center',
            position: 'absolute',
            bottom: 20,
            right: 10,
            width:75,
            height:75,
            borderRadius: 75,
          }}
          dark onPress={() => this.props.navigation.push('CreateRecipeFormSnap', {})} />
      </View>
    );
  }
}
