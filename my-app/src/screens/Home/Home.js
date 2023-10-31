import react, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>HOME</Text>
        <Text>Pagina principal</Text>
      </View>
    );
  }
}

export default Home;
