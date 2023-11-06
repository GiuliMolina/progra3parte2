import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {auth, db} from "../../firebase/config";


class FormPostear extends Component {

    constructor(props){
        super();
        this.state ={
            textPost: ""
        } 
        console.log(this.state.post)       
    }



    posteo(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            post: this.state.post,
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
                  keyboardType = 'default'
                  value = {this.state.textPost}
                  />
                <TouchableOpacity
                  style={ styles.button}
                  
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