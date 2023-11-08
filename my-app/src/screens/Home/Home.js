import react, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";
import { auth,db } from "../../firebase/config";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listaDePosteos: [],
      usuario: auth.currentUser.email,
      usuarios: [],
      foto:""
    }
  }

  componentDidMount(){
    db.collection('users').where("owner","==",this.state.usuario).onSnapshot(
      docs =>{
        let ahoraUsuario = [];
        docs.forEach(doc=> {
          ahoraUsuario.push({
          id: doc.id,
			    data: doc.data()
          })
        })
        this.setState({usuarios: ahoraUsuario})

      }
    )}
     

  logout(){
    auth.signOut();
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.username}> Hola</Text>
        {/* {this.state.foto !== "" ? 
        <Img source={required(this.state.foto)} resizeMode="contain"></Img> : 
        false
        } */}
        
        {
                    this.state.usuarios.length === 0
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.usuarios}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => {this.setState({foto: item.data.urlImagen})}
                     
                        
                       }
                    />
                    // <Post infoPost = { item } />
        }
                 <TouchableOpacity onPress={()=>this.logout()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("Menu")}>
                    <Text> Ir a register</Text>
                </TouchableOpacity> */}
      </View>
    );
}}

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
