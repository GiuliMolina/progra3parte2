import react, {Component} from "react";
import {auth, db} from "../../firebase/config";
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from "react-native";

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            userName: "",
            password: ""
        }
    }

    register(email, pass, userName){
        if(email === null){
            <Text>Tenes que ingresar un email</Text>
        } else if (!email.includes("@")){
            <Text>Tu email debe contener un @</Text>
        } else if (!email.includes(".")){
            <Text>Tu email debe contener un dominio, ej: .com</Text>
        } else if (pass === null){
            <Text>Tenes que ingresar una contraseña</Text>
        } else if (userName === null){
            <Text>Tenes que ingresar una nombre de usuario</Text>
        } else{
            auth.createUserWithEmailAndPassword(email,pass)
            .then(response => {
                console.log("Registrando ok",response);
    
                db.collection("users").add({
                    owner: auth.currentUser.email,
                    userName: userName, 
                    createdAt: Date.now(),
                });
            })
            .then( res=>console.log(res))
            .catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email:text})}
                    placeholder = "email"
                    keyBoardType="email-adress"
                    value = {this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password:text})}
                    placeholder = "password"
                    keyBoardType="default"
                    secureTextEntry={true}
                    value = {this.state.password}
                />

                <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email,this.state.password,this.state.userName)}>
                    <Text>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text>Ya tengo cuenta. Ir a login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal: 10, 
        marginTop: 20, 
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
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }
})

export default Register;