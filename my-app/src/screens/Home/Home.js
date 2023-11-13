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
      fotito:"",
      nombreDeUsuario:null,
      comentario:"",
      posteo:[]
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
    )

    db.collection("posts").where("owner", "==",this.state.usuario).onSnapshot(
      docs =>{
        let posteosQuieroMostarr = [];
        docs.forEach(doc=> {
          posteosQuieroMostarr.push({
          id: doc.id,
			    data: doc.data()
          })
        })
        this.setState({posteo: posteosQuieroMostarr})
      }
    )
  }

  comentario(){
    db.collection('posts').update({
        comentarios:this.state.comentario
        
    })
    .then(console.log('Posteado correctamente'))
    .catch(e => console.log(`Se ha producido un error : ${e}`))
}


     
  logout(){
    auth.signOut();
    this.props.navigation.navigate("Login")
  }

  render() {
    console.log(this.state.comentario)
    return (
      <View style={Styles.container}>
         <View style={Styles.header}>
        <Image
        style = {Styles.profileImage}
        source={{
          uri: this.state.foto}}
      />
     <TouchableOpacity onPress={()=>this.props.navigation.navigate("MiPerfil")}>
       <Text style={Styles.username}>{this.state.nombreDeUsuario}</Text>
      </TouchableOpacity>
       </View> 
       <Image
        style = {Styles.postImage}
        source={{
          uri: this.state.fotito}}
      />
        {
                    this.state.usuarios.length === 0
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.usuarios}
                        keyExtractor={ pepe => pepe.id }
                        renderItem={ ({item}) => {this.setState({foto: item.data.urlImagen,
                          nombreDeUsuario: item.data.userName}
                          )}
                     
                        
                       }
                    />
        }
          {
                    this.state.posteo.length === 0
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.posteo}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => {this.setState({fotito: item.data.textPost,
                          }
                          )}
                     
                        
                       }
                    />
        }
                <TextInput
                onChangeText={(text)=>this.setState({comentario:text})}
                placeholder="Agregar comentario"
                keyBoardType="default"
                value={this.state.comentario}
                />
                 <TouchableOpacity onPress={()=>this.logout()}>
                    <Text> Cerrar sesión</Text>
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10, 
  },
  postImage: {
    width: '100%', 
    height: 200,
  }

})

export default Home;
