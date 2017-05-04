import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';

const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} = ReactNative;

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { searching: false, ingredientsInput: '' }
  }

  searchPressed() {
    this.setState({ searching: true })
    this.props.fetchRecipes(this.state.ingredientsInput).then( (res) => {
      this.setState({ searching: false })
    });
  }

  recipes() {
    return Object.keys(this.props.searchedRecipes).map(key => this.props.searchedRecipes[key])
  }

  render() {
    return (
      <View style={styles.scene}>
      <View style={styles.searchSection}>
      <TextInput
      style={styles.searchInput}
      returnKeyType="search"
      placeholder="Ingredients (comma delimited)"
      onChangeText={(ingredientsInput) => this.setState({ ingredientsInput })}
      value={this.state.ingredientsInput}
      />
      <TouchableHighlight
      style={styles.searchButton}
      onPress={() => this.searchPressed()}
      >
      <Text>Fetch Recipes</Text>
      </TouchableHighlight>
      </View>
        <ScrollView style={styles.scrollSection}>
          {!this.state.searching && this.recipes().map((recipe) => {
            return (<View key={recipe.id} >
              <Image source={ { uri: recipe.image } } style={styles.resultImage} />
              <Text style={styles.resultText} >{recipe.title}</Text>
              </View>)
          })}
          {this.state.searching ? <Text>Searching...</Text> : null }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20
  },
  searchSection: {
    height: 30,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  scrollSection: {
    flex: 0.8
  },
  searchButton: {
    flex: 0.3,
  },
  searchInput: {
    flex: 0.7,
    color: '#000'
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  },
  resultImage: {
    height: 150,
  }
});

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes
  };
}

export default connect(mapStateToProps)(Home);
