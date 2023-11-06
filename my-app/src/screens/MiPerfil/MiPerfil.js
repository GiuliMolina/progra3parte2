import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { auth, db } from '../../firebase/config';

class MiPerfil extends Component{

    constructor(){
        super();
        this.state ={
            algo : ""
        }
    }

    render(){

        return(
            <View>
                <Text> Mi perfil </Text>
            </View>
        )
    }
}

export default MiPerfil;