import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase';
import {auth, db} from "../../firebase/config";

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false,
            cantidadLikes: ''
        }
    }

    componentDidMount(){
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }

    }

    likear(){
        db.collection('post').doc(this.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(res => this.setState({
            like: true,
            cantidadLikes: this.props.dataPost.datos.likes.length
        }))

        .catch(error => console.log(error))
    }

    unLike(){
        db.collection('post').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(res => this.setState({
            like: false,
            cantidadLikes: this.props.dataPost.datos.likes.length
        }))
        .catch ( error => console.log(error))
    }

    render(){
        console.log(this.props)
        return(
            <View>
                <Text> Detalles del Post</Text>
                <Text> Email: </Text>
                <Text> Texto:</Text>
                <Text> Likes: </Text>

                {
                    this.state.like ?
                     <TouchableOpacity
                     
                     style= {StyleSheet.button}
                     onPress={() => this.unLike()}>
                        <Text style = {StyleSheet.textButton}> unLike</Text>

                    </TouchableOpacity>
                    :

                    <TouchableOpacity 

                    style= {StyleSheet.button}
                    onPress={() => this.unLike()}>

                        <Text style = {StyleSheet.textButton}> Like</Text>

                    </TouchableOpacity>
                    
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    input:{
        height: 20
    },
    button: {
        backgroundColor: 'purple'
    },
    textButton: {
        color: 'black'
    }
})


export default Post;