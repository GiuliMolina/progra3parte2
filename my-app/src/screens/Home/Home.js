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
    this.state = {listaDePosteos: 0

    };
  }

  render() {
    return (
      <View>
        <Text>HOME</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text> Ir a login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                    <Text> Ir a register</Text>
                </TouchableOpacity>
        <Text>Posteos</Text>
        {
                    this.state.listaDePosteos === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }
      </View>
    );
  }
}

export default Home;
