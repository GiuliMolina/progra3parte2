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
console.log(db.collection("users").userName)
        return(
            <View>
                <Text>{db.collection("users").onSnapshot(docs => )}</Text>
            </View>
        )
    }
}

export default MiPerfil;