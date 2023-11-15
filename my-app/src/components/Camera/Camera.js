import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {Text, Touchable, TouchableOpacity} from 'react-native';
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




    render(){

        console.log(this.state.photo)

        return(
            <>

            {/* {this.state.permisos ?
            this.state.showCamera ?

            <View>
                <Camera type= {Camera.Constants.Type.front}
                ref ={metodosCamera => this.metodosCamera = metodosCamera}/>

                <TouchableOpacity 
                onPress={() => this.takePhoto}>
                    <Text>Take photo </Text>
                </TouchableOpacity>
            </View>

            :
            <View>
                <Text> Not permisos</Text>
            </View>
        
            } */}
            </>
        )
    }
}

export default Camera;

