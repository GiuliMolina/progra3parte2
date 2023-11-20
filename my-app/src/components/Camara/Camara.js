import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, storage } from '../../firebase/config';

class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permisos: false,
            photoUrl: '',
            showCamera: true,
        }
        this.metodosDeCamera = '';
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permisos: true,
                })
            })
            .catch(error => console.log(error))
    }

    takePhoto() {
        console.log('Sacando foto')
        this.metodosDeCamera
            .takePictureAsync()
            .then(photo => {
                this.setState({
                    photoUrl: photo.uri,
                    showCamera: false,
                })
            })
            .catch(e => console.log(e))
    }

    decline() {
        console.log('Cancelando')
        this.setState({
            photoUrl: '',
            showCamera: true,
        })
    }

    accept() {
        fetch(this.state.photoUrl)
            .then(res => res.blob())
            .then(img => {
                const route = storage.ref(`photos/${Date.now()}.jpg`)
                route.put(img)
                    .then(() => {
                        route.getDownloadURL().then(url => { this.props.onImageUpload(url) })
                    })
                    .then(() => {
                        this.setState({
                            photoUrl: '',
                            showCamera: false,
                        })
                    });

            })
            .catch(e => console.log(e))


    }

    render() {
        return (
            <>
                {
                    this.state.permisos ?
                        this.state.showCamera ?
                            <View style={styles.container}>
                                <Camera
                                    type={Camera.Constants.Type.front}
                                    ref={(metodosDeCamera) => (this.metodosDeCamera = metodosDeCamera)}
                                >
                                    <View>
                                        <TouchableOpacity style={styles.button}
                                            onPress={() => this.takePhoto()}>
                                            <Text style={styles.textButton}> Sacar foto </Text>
                                        </TouchableOpacity>
                                    </View>
                                </Camera>
                            </View>
                            :
                            <View style={styles.buttonnn}>
                                <Image
                                    source={{ uri: this.state.photoUrl }}
                                />

                                <TouchableOpacity style={styles.button2}
                                    onPress={() => this.decline()}>
                                    <Text style={styles.textButton} > Cancelar </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button2}
                                    onPress={() => this.accept()}>
                                    <Text style={styles.textButton} > Aceptar </Text>
                                </TouchableOpacity>

                            </View>
                        :
                        <Text> Necesita aceptar los permisos de la cámara </Text>

                }
            </>


        )
    }
}


const styles = StyleSheet.create({
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
        height: `60vh`,
        widht: `100vw`,
        justifyContent: 'center',
    },
    camera: {
        widht: '100%',
        height: '100%',
    },
    buttonnn:{
        flexDirection:'row',
        justifyContent:'center',
    },
    button: {
        backgroundColor: "rgb(99 71 239)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    button2: {
        backgroundColor: "rgb(99 71 239)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
        width: '30%',
        
    } ,
    textButton: {
        color: 'white',
        textAlign: 'center',
    },
})

export default Camara;
