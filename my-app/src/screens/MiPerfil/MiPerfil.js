import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { updatePassword } from "firebase/auth";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, FlatList} from "react-native";



class MiPerfil extends Component {
    constructor() {
        super();
        this.state = {
            foto: "",
            data: [],
            nuevaPassword:"",
            nombreDeUsuario: "",
            usuarioLogueado: auth.currentUser.email,
            owners: [],
        }
        console.log(owner)
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
                    data: user,
                })
            }

        )

        db.collection("posts").where("owner", "==",auth.currentUser.email).onSnapshot(
            docs =>{
              let posteosQuieroMostrar = [];
              docs.forEach(doc=> {
                posteosQuieroMostrar.push({
                    id: doc.id,
                    data: doc.data()
                })
              })
              this.setState({posteo: posteosQuieroMostrar})
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
        console.log(this.state.data)
        console.log(this.state.usuarioLogueado)
        
        return (
            <View>
                <Text></Text>
            {
                this.state.data ==! this.state.usuarioLogueado
                ?
                <Text> Cargando...</Text>
                
                :

                <View> 
                
                <Text> {this.state.data.userName}</Text>
                <Text> {this.state.usuarioLogueado}</Text>
                {/* <Image style = {Styles.profileImage}
                    src={{uri: this.state.data.urlImage}}
                /> */}
                </View>
                

                
                
                // <FlatList 
                // data= {this.state.data}
                // keyExtractor={ user => user.id }
                // renderItem={ ({item}) => {this.setState({
                //     owners: item.data.owner})}
                // }
                // />

            }

            

            </View>
            
        )
    }
}

const styles = StyleSheet.create({

    conteiner : {
        flex: 1,
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