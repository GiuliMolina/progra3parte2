import react, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image 
} from "react-native";
import { auth,db } from "../../firebase/config";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listaDePosteos: [],
      usuario: auth.currentUser.email,
      usuarios: [],
      foto:"",
      nombreDeUsuario:null,
      comentario:""
    }
  }
  comentarios(){
    db.collection("posts").add({
      
    })
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
    console.log(this.state.foto)
    return (
      <View style={Styles.container}>
        <Image styles={Styles.image} source={this.state.foto}/>
        <Text style={Styles.username}>{this.state.nombreDeUsuario}</Text>
        <Image
        style = {Styles.image}
        source={{
          uri: this.state.foto,}}
      />
        
        {
                    this.state.usuarios.length === 0
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.usuarios}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => {this.setState({foto: item.data.urlImagen,
                          nombreDeUsuario: item.data.userName}
                          )}
                     
                        
                       }
                    />
        }
          <TextInput
                    style={Styles.input}
                    onChangeText={(text)=>this.setState({comentario:text})}
                    placeholder = "Comentarios"
                    keyBoardType="default"
                    value = {this.state.comentario}
                />
                 <TouchableOpacity onPress={()=>this.logout()}>
                    <Text> Cerrar sesión</Text>
                    <Image styles={Styles.image} source={require("../../../assets/favicon.png")} resizeMode="center"/>
                </TouchableOpacity>
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
    width: 50,
    height: 50,
    borderRadius: 25, // Mitad del ancho o alto para hacerlo circular
    borderWidth: 2,
    borderColor: '#fff'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
}

})

export default Home;
