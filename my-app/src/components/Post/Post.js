import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import {auth, db} from "../../firebase/config";

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <View></View>
        )
    }
}

export default Post;