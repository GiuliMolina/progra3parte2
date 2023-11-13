import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {Text} from 'react-native';
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


    render(){

        return(
            <Text>

            </Text>
        )
    }
}

export default Camera;

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