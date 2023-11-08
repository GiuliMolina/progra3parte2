import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { auth, db } from '../../firebase/config';

class MiPerfil extends Component{

    constructor(){
        super();
        this.state ={
            algo : "",
            data: []
        }
    }

    componentDidMount(){
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
                    data : user
                })
            }

        )
    }

    render(){
    console.log(this.state.data)
        return(
            <View>
                <Text> {this.state.data.userName}</Text>
            </View>
        )
    }
}

export default MiPerfil;