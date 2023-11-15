import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {View, Text, TouchableOpacity} from 'react-native';
import {Storage} from '../firebase/config';

class Camera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permisos : false,
            photo: '',
            showCamera: true,
        }
    }
    
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(res => {
            if(res.granted === true){
                this.setState({
                    permisos : true,
                })
            }
        })
        .catch(error => console.log(error))
    }

    takePhoto(){
        this.metodosCamera.takePictureAsync()
        .then(photo => {
            this.setState({
                photo: photo.uri,
                showCamera: false
            })
        })
        .catch(e => console.log(e))
    }

    decline(){
        this.setState({
            showCamera: true,
        })
    }

    accept(){
        fetch(this.state.photo)
        .then(res => res.blob())
        .then(img => {
           const ref = Storage.ref(`photo/${Date.now()}.jpg`)
           ref.put(img)
           .then( () => {
            ref.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url)
            }
            )
        })
        })
        .catch(e => console.log(e))
        

    }




    render(){

        console.log(this.state.photo)

        return(
            <>

            {this.state.permisos ?
            this.state.showCamera ?

                <View style = {styles.container}>
                   <Camera type= {Camera.Constants.Type.front}
                    ref ={metodosCamera => this.metodosCamera = metodosCamera}/>

                   <TouchableOpacity 
                    onPress={() => this.takePhoto}>
                       <Text>Take photo </Text>
                    </TouchableOpacity>
                </View>

            :
                <View style= {styles.container}>
                    
                </View>
            :
            <Text> Aceptar permisos </Text>
        
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

export default Camera;
