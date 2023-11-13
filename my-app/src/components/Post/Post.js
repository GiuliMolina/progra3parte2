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
            usuarioLogueado:auth.currentUser.email,
            todosUsuarios:[]
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs =>{
              let papa = [];
              docs.forEach(doc=> {
                papa.push({
                id: doc.id,
                data: doc.data()
                })
              })
              this.setState({todosUsuarios: papa})
      
            }
          )
        }

    compararUsuarios(usuario){
        
    }

    comentar(comentario) {
        db.collection("posts").doc(this.props.dataPost.id).update({
            comentrarios: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(this.setState({ comentarioTexto: comentario }))
    }

    // likear(){
    //     db.collection('posts').doc(this.dataPost.id).update({
    //         likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    //     })
    //     .then(res => this.setState({
    //         like: true,
    //         cantidadLikes: this.props.dataPost.data.likes.length
    //     }))

    //     .catch(error => console.log(error))
    // }

    // unLike(){
    //     db.collection('posts').doc(this.props.dataPost.id).update({
    //         likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    //     })
    //     .then(res => this.setState({
    //         like: false,
    //         cantidadLikes: this.props.dataPost.data.likes.length
    //     }))
    //     .catch ( error => console.log(error))
    // }

    render() {

        return (
                  <View style={Styles.container}>
         <View style={Styles.header}>
           {/*  <Image
            style = {Styles.profileImage}
            source={{
              uri:"pepe"}}
            /> */}
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("MiPerfil")}>
              <Text style={Styles.username}>{this.props.dataPost.data.owner}</Text>
            </TouchableOpacity>
          </View> 
       <Image
        style = {Styles.postImage}
        source={{
          uri: this.props.dataPost.data.textPost}}
        />

            {/*     {
                    this.state.like ?
                        <TouchableOpacity

                            style={StyleSheet.button}
                            onPress={() => this.unLike()}>
                            <Text style={StyleSheet.textButton}> unLike</Text>

                        </TouchableOpacity>
                        :

                        <TouchableOpacity

                            style={StyleSheet.button}
                            onPress={() => this.unLike()}>

                            <Text style={StyleSheet.textButton}> Like</Text>

                        </TouchableOpacity>

                } */}

                <TextInput
                    style={Styles.input}
                    onPress={(texto) => this.setState({ comentarioTexto: texto })}
                    placeholder="Agregar comentario"
                    keyboardType="default"
                    value={this.state.comentarioTexto}
                />
                <TouchableOpacity style={Styles.button} onPress={() => this.comentar(this.state.comentarioTexto)}>
                    <Text> Agregar comentario</Text>
                </TouchableOpacity>
            </View>
        )
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

export default Post;