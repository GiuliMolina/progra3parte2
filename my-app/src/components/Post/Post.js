import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firebase from 'firebase';
import { auth, db } from "../../firebase/config";

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false,
            cantidadLikes: '',
            comentarioTexto: "",
            comentarios: [],
            usuarioLogueado: auth.currentUser.email,
            todosUsuarios:[]
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs =>{
              let users = [];
              docs.forEach(doc=> {
                users.push({
                id: doc.id,
                data: doc.data()
                })
              })
              this.setState({todosUsuarios: users})
      
            }
          )
        }

    compararUsuarios(usuario){
        
    }

    comentar(comentario) {
        db.collection("posts").doc(this.props.dataPost.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(this.state.usuarioLogueado)
        })
            .then(this.setState({ comentarioTexto: comentario }))
    }

    like(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.state.usuarioLogueado)
        })
        .then(res => this.setState({
            like: true,
            cantidadLikes: this.props.dataPost.data.likes.length
        }))

        .catch(error => console.log(error))
    }

    unLike(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(this.state.usuarioLogueado)
        })
        .then(res => this.setState({
            like: false,
            cantidadLikes: this.props.dataPost.data.likes.length
        }))
        .catch ( error => console.log(error))
    }

    render() {

        return (
                <View style={styles.container}>
                <View style={styles.header}>
                  <Image
                    style = {styles.profileImage}
                    source={{
                    uri:this.props.dataPost.data.fotoDePerfil}}
                    /> 
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("MiPerfil")}>
                       <Text style={styles.username}>{this.props.dataPost.data.userName}</Text>
                    </TouchableOpacity>
                </View> 
                <Image
                   style = {styles.postImage}
                   source={{
                   uri: this.props.dataPost.data.urlPost}}
                />
                <View styles={styles.comentario}>
                    <Text style={styles.username}>{this.props.dataPost.data.userName}:</Text>
                    <Text>{this.props.dataPost.data.textPost}</Text>
                </View>

                {
                    this.state.like ?
                        <TouchableOpacity

                            style={styles.button}
                            onPress={() => this.unLike()}>
                            <Text style={styles.textButton}> Like</Text>

                        </TouchableOpacity>
                        :

                        <TouchableOpacity

                            style={styles.button}
                            onPress={() => this.like()}>

                            <Text style={styles.textButton}> unLike</Text>

                        </TouchableOpacity>

                }

                <TextInput
                    style={styles.input}
                    onPress={(texto) => this.setState({ comentarioTexto: texto })}
                    placeholder="Agregar comentario"
                    keyboardType="default"
                    value={this.state.comentarioTexto}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.comentar(this.state.comentarioTexto)}>
                    <Text> Agregar comentario</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
  },
  button: {
    backgroundColor: "purple",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
},
textButton: {
    color: 'white'
},
comentario:{
    flexDirection: 'row',
  alignItems: 'center',
}

})

export default Post;