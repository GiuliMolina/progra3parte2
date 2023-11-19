import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { storage } from '../../firebase/config';

class Camara extends Component{
    constructor(props){
        super(props);
        this.state = {
            permisos : false,
            photoUrl: '',
            showCamera: true,
        }
        this.metodosCamera = ''
    }
    
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(() => {
           this.setState({
            permisos : true,
           })
        })
        .catch(error => console.log(error))
    }

    takePhoto(){
        console.log('Sacando foto')
        this.metodosCamera.takePictureAsync()
        .then(photo => {
            this.setState({
                photoUrl: photo.uri,
                showCamera: true
            })
        })
        .catch(e => console.log(e))
    }

    decline(){
        console.log('Cancelando')
        this.setState({
            photoUrl: '',
            showCamera: false,
        })
    }

    accept(){
        fetch(this.state.photoUrl)
        .then(res => res.blob())
        .then(img => {
           const route = storage.ref(`photo/${Date.now()}.jpg`)
           route.put(img)
           .then( () => {
            route.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url);
                this.setState({
                    photoUrl: '',
                })
            }
            )
        })
        })
        .catch(e => console.log(e))
        

    }

    render(){

        //console.log(this.state.photoUrl)

        return(
           <View style={styles.container}>
            {
               this.state.permisos === true ?
                this.state.showCamera === true ?

                <React.Fragment>
                    <Image
                    source = {{uri: this.state.photoUrl}}
                    />

                 <View>
                    <TouchableOpacity style={styles.button}
                    onPress={()=> this.decline()}>
                        <Text> Cancelar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={ () => this.accept()}>
                        <Text> Aceptar </Text>
                    </TouchableOpacity>

                 </View>
                    
                
                </React.Fragment>

                :

                <React.Fragment>
                    <Camera
                    type= {Camera.Constants.Type.front}
                    ref = {metodosCamera => this.metodosCamera = metodosCamera}
                    />

                    <TouchableOpacity style={styles.button}
                    onPress={ ()=> this.takePhoto()}>
                        <Text> Sacar Foto </Text>
                    </TouchableOpacity> 

                </React.Fragment>

                :
                <Text> Necesita aceptar los permisos de la cámara </Text>
            }
           </View>

            
                
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

export default Camara;
