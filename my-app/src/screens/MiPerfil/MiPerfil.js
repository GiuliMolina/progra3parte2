import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { updatePassword } from "firebase/auth";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";



class MiPerfil extends Component {
    constructor() {
        super();
        this.state = {
            algo: "",
            data: [],
            nuevaPassword:"",
            nombreDeUsuario: ""
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    data: user
                })
            }

        )
    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    // cambiarPass() {
    //    auth
    //    .updatePassword(user, newPassword)
    //    .then(() => {
    //     this.setState({
    //         newPassword: this.state.nuevaPassword
    //     })
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });
    // }

    render() {
        
        return (
            <View>
                <Text>{this.state.nombreDeUsuario}</Text>
                <FlatList 
                        data= {this.state.data}
                        keyExtractor={ pepe => pepe.id }
                        renderItem={ ({item}) => {this.setState({
                            nombreDeUsuario: item.data.userName}
                          )}
                     
                        
                       }
                    />
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({nuevaPassword:text})}
                    placeholder = "password"
                    keyBoardType="default"
                    value = {this.state.nuevaPassword}
                />  */}
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.cambiarPass()}
                ></TouchableOpacity> */}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({

    conteiner : {
        height: 200
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

    input: {
        height: 20, 
        paddingVertical: 15, 
        paddingHorizontal:10,
        borderWidth: 1, 
        borderColor: "#ccc",
        borderStyle: 6, 
        marginVertical: 10, 
    },
    button: {
        backgroundColor: "blue",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
})

export default MiPerfil;