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
    this.state = {listaDePosteos: 1

    };
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.username}>Mateo</Text>
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
        <Text></Text>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text> Ir a login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                    <Text> Ir a register</Text>
                </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
    container: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
}

})

export default Home;
