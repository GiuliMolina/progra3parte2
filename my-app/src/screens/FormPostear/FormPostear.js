import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {auth, db} from "../../firebase/config";


class FormPostear extends Component {

    constructor(props){
        super();
        this.state ={
            post: ""
        } 
        console.log(this.state.post)       
    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate("Login");
    }

    posteo(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            post: this.state.post,
            likes: [],
            createdAt: Date.now()
        })
        .then(console.log('Posteado correctamente'))
        .catch(e => console.log(`Se ha producido un error : ${e}`))
    }

    render(){
        return(
            <View>
                <Text> Posteo </Text>
                <TextInput
                  style= {styles.input}
                  onChangeText ={(texto) => this.setState({ post: texto})}
                  placeholder = 'postea'
                  keyboardType = "default"
                  value = {this.state.post}
                  />
                <TouchableOpacity
                  style={ styles.button}
                  onPress = {() => this.postear()}
                >
                    <Text style = {styles.textButton}> Postear </Text>
                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create ({
    container: {
        paddingHorizontal: 10,
    },
    input: {
        height: 20,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: 'purple'
    },
    textButton: {
        color: 'purple'
    }
})

export default FormPostear;