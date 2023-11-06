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
        
    }

    render(){
        return(
            <View>
                <Text> Detalles del Post</Text>
                <Text> Email: </Text>
                <Text> Texto:</Text>
                <Text> Likes: </Text>

                {this.state.like }

            </View>
        )
    }
}

export default Post;