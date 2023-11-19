import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { auth, db } from "../../firebase/config";
import Camara from '../../components/Camara/Camara';


class FormPostear extends Component {

    constructor(props) {
        super();
        this.state = {
            textPost: "",
            urlPost: '',
            usuario: auth.currentUser.email,
            usuarios: [],
            showCamera: true,
        }
        console.log(this.state.textPost)
    }


    componentDidMount() {
        db.collection('users').where("owner", "==", this.state.usuario).onSnapshot(
            docs => {
                let ahoraUsuario = [];
                docs.forEach(doc => {
                    ahoraUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({ usuarios: ahoraUsuario })
                })
            }
        )
    }


    posteo() {
        const userName = this.state.usuarios.length > 0 ? this.state.usuarios[0].data.userName : ''
        const fotoPerfil = this.state.usuarios.length > 0 ? this.state.usuarios[0].data.urlImagen : '';

        db.collection('posts').add({
            userName: userName,
            fotoDePerfil: fotoPerfil,
            owner: auth.currentUser.email,
            textPost: this.state.textPost,
            comentarios: {
                usuario: "",
                comentario: ""
            },
            photo: this.state.urlPost,
            createdAt: Date.now()
        })
            .then((response) => {
                this.setState({
                    textPost: "",
                })
            })
            .catch(e => console.log(`Se ha producido un error : ${e}`))
    }

    onImageUpload(url){
        this.setState({urlPost: url , showCamera: false});
      }

    render() {
        console.log(this.state.usuarios)
        return (
            <View style={styles.container}>
    
                {this.state.showCamera ? <Camara style={styles.camera} onImageUpload={(urlPost) => this.onImageUpload(urlPost)} /> :

                    <>
                        <TextInput
                            style={styles.input}
                            onChangeText={(texto) => this.setState({ textPost: texto })}
                            placeholder='Escribir caption'
                            keyBoardType='default'
                            value={this.state.textPost}
                        />
                        <></>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.posteo();
                                this.props.navigation.navigate('Home');
                                this.setState({ showCamera: true });
                            }}
                        >
                            <Text style={styles.textButton}> Postear </Text>
                        </TouchableOpacity>
                    </>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 20,
        paddingVertical: 10,
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
        color: 'white',
    }
})

export default FormPostear;