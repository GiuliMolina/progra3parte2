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
import Post from "../../components/Post/Post";

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
      comentario: [],
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
          this.setState({usuarios: ahoraUsuario})
        })
        

      }
    )

    db.collection("posts").orderBy("createdAt","desc").onSnapshot(
      docs =>{
        let posteosQuieroMostar = [];
        docs.forEach(doc=> {
          posteosQuieroMostar.push({
          id: doc.id,
			    data: doc.data()
          })
        })
        this.setState({listaDePosteos: posteosQuieroMostar})
      }
    )
  }

     
  logout(){
    auth.signOut();
    this.props.navigation.navigate("Login")
  }


  render() {

    return (
      <View style={Styles.container}>

          {
                    this.state.listaDePosteos.length === 0
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList style = {Styles.container}
                        data= {this.state.listaDePosteos}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post dataPost={item} navigation={this.props.navigation}/>
                        }
                     
                        
                       
                    />
        }
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
    flex:1
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
  input: {
    height: 20, 
    paddingVertical: 15, 
    paddingHorizontal:10,
    borderWidth: 1, 
    borderColor: "#ccc",
    borderStyle: 6, 
    marginVertical: 10, 
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
