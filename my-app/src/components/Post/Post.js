import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firebase from 'firebase';
import { auth, db } from "../../firebase/config";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";


class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      like: true,
      cantidadLikes:'',
      comentarioTexto:"",
      comentarios: [],
      usuarioLogueado: auth.currentUser.email,
      todosUsuarios: [],
      mostrarComentarios: false
    }
  }

  componentDidMount() {
    db.collection('users').onSnapshot(
      docs => {
        let users = [];
        docs.forEach(doc => {
          users.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({ todosUsuarios: users })
      }
    )
  }


  compararUsuarios(usuario) {

  }

  comentar(comentario) {
    const elUsuario = this.props.dataPost.data.userName;

    const nuevoComentario = {
      usuario: elUsuario,
      comentario:comentario,
    };

    const postRef = db.collection("posts").doc(this.props.dataPost.id);

    postRef.update({
      comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
    });
  }

  like() {
    db.collection('posts').doc(this.props.dataPost.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(this.state.usuarioLogueado)
    })
      .then(res => this.setState({
        like: false,
        cantidadLikes: this.props.dataPost.data.likes.length
      }))

      .catch(error => console.log(error))
  }

  unLike() {
    db.collection('posts').doc(this.props.dataPost.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(this.state.usuarioLogueado)
    })
      .then(res => this.setState({
        like: true,
        cantidadLikes: this.props.dataPost.data.likes.length
      }))
      .catch(error => console.log(error))
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{
              uri: this.props.dataPost.data.fotoDePerfil
            }}
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate("MiPerfil")}>
            <Text style={styles.username}>{this.props.dataPost.data.userName} </Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.postImage}
          source={{
            uri: this.props.dataPost.data.photo
          }}
        />
        <View styles={styles.comentario}>
          <Text><Text style={styles.username}>{this.props.dataPost.data.userName}</Text> {this.props.dataPost.data.textPost}</Text>
        </View>
        {
          this.state.like ?
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.like()}>
               <Text style={styles.textButton}> <BiSolidLike style={styles.iconoLike}/> </Text> 

            </TouchableOpacity>
            :

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.unLike()}>

              <Text> <BiSolidDislike style={styles.iconoLike}/></Text>

            </TouchableOpacity>
        }
        {
          this.props.dataPost.data.likes ?
            <Text>Cantidad de likes: {this.props.dataPost.data.likes.length}</Text> : false
        }
        <TextInput
          style={styles.input}
          onChangeText={(texto) => this.setState({ comentarioTexto: texto })}
          placeholder="Comentario..."
          keyboardType="default"
          value={this.state.comentarioTexto}
        />
        <TouchableOpacity style={styles.botonComentario} onPress={() => this.comentar(this.state.comentarioTexto)}>
          <Text style={styles.textButton}> Agregar comentario </Text>
        </TouchableOpacity>
        {
          this.props.dataPost.data.comentarios ?
            <Text> Cantidad de comentarios: {this.props.dataPost.data.comentarios.length}</Text> :
            <Text> No hay comentarios en este posteo</Text>
        }

       


        <TouchableOpacity onPress={() => this.setState({ mostrarComentarios: !this.state.mostrarComentarios })}>
          <Text style={styles.masComentarios}>
            {this.state.mostrarComentarios ? 'Ocultar Comentarios' : 'Mostrar Comentarios ultimos 4 comentarios'}
          </Text>
        </TouchableOpacity>
        {this.state.mostrarComentarios === true && this.props.dataPost.data.comentarios.length > 0 ?
          <FlatList
            data={this.props.dataPost.data.comentarios.slice(-4)}
            keyExtractor={(pepe) => pepe.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View styles={styles.comentario}>
                  <Text><Text style={styles.username}>{item.usuario}:</Text>{item.comentario}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          :
          false
        }


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5DC",
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
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: 6,
    marginVertical: 10,
    width: "40%"
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
  },
  button: {
    marginTop: '3%',
    height: '5%',
    textAlign: "left",
    width: "10%",
    
  },
  botonComentario: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    width: "30%",
    borderColor: "rgb(99 71 239)",
    backgroundColor: "rgb(99 71 239)",
    flex:1,
    alignItems: "center",
    marginBottom:"10px"
  },
  textButton: {
    color: 'white', 
    textAlign: "center"
  },
  comentario: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconoLike:{
    color: "black",
    fontSize: "20px",
  },
  textoComentario:{
    textAlign: "center"
  },
  masComentarios:{
    color:"#999999"
  },

 })

export default Post;