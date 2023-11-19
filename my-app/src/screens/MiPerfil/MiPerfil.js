import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { deleteUser, updateProfile } from "firebase/auth";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, FlatList} from "react-native";
import Post from "../../components/Post/Post";



class MiPerfil extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            nuevaPassword:"",
            nombreDeUsuario: "",
            usuarioLogueado: auth.currentUser.email,
            posteos: [] 
        }
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", this.state.usuarioLogueado).onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    data: user,
                })
            }

        )

        db.collection("posts").where("owner", "==", this.state.usuarioLogueado).onSnapshot(
            docs =>{
              let posteosQuieroMostrar = [];
              docs.forEach(doc=> {
                posteosQuieroMostrar.push({
                    id: doc.id,
                    data: doc.data()
                })
              })
              this.setState({posteos: posteosQuieroMostrar})
            }
          )
    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login');
    }



    // deletePost(){
    //     db.collection('posts').doc().delete()
    // }

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
            <View style = {styles.conteiner}>
                 

                <FlatList
                  
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.info}>
                           <Text>{item.data.userName}</Text>
                           <Image style={styles.profileImage} source={{ uri: item.data.urlImage }} />
                           <Text>{this.state.usuarioLogueado} </Text>
                           <Text>{item.data.miniBio} </Text>
                           <Text> Cantidad de posteos: </Text>
                        </View>
                    )}
                />
                <Text> Mis posteos</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.conteiner}>
                           <Post dataPost={item} navigation={this.props.navigation}/>
                        </View>
                    )}
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



                <TouchableOpacity style= {styles.button} onPress={() => this.logout()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({

    conteiner : {
        flex: 1,
        justifyContent: 'center'
    },
    view: {
        flex: 1

    },
    info: {
        justifyContent: 'center'

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
})

export default MiPerfil;