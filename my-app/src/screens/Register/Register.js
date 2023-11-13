import react, {Component} from "react";
import {auth, db} from "../../firebase/config";
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from "react-native";

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            userName: "",
            password: "",
            miniBio: "",
            urlImagen: "",
            errorMessage: ""
        }
    }

    register(email, pass, userName){
        if (email === "") {
            this.setState({
                errorMessage: "Tenes que ingresar un email"
            })
        } else if (!email.includes("@")) {
            this.setState({
                errorMessage: "Tu email debe contener un @"
            }) 
        } else if (!email.includes(".")) {
            this.setState({
                errorMessage: "Tu email debe contener un dominio, ej: .com"
            })
        } else if (pass === "") {
            this.setState({
                errorMessage: "Tenes que ingresar una contraseña"
            })
        }else if (pass.length < 6) {
            this.setState({
                errorMessage: "La contraseña tiene que tener por lo menos 6 caracteres"
            })
        }else{
            auth.createUserWithEmailAndPassword(email,pass)
            .then(response => {
    
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: this.state.userName, 
                    password: this.state.password,
                    miniBio: this.state.miniBio,
                    urlImagen: this.state.urlImagen,
                    createdAt: Date.now(),
                });
            })
            .then( (response)=>{
                this.setState({
                    email:"",
                    password:"",
                    userName:"",
                    miniBio:"",
                    urlImagen:""
                }),
                this.props.navigation.navigate("Login")
            })
            .catch(error => {
                console.log(error)
                if(error.code == 'auth/email-already-in-use'){
                    this.setState({ errorMessage: "El email ingresado ya existe"})
                }
            })
        }}


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

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName:text})}
                    placeholder = "user name"
                    keyBoardType="default"
                    value = {this.state.userName}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({miniBio:text})}
                    placeholder = "mini bio"
                    keyBoardType="default"
                    value = {this.state.miniBio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({urlImagen:text})}
                    placeholder = "foto de perfil"
                    keyBoardType="default"
                    value = {this.state.urlImagen}
                />

                <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email,this.state.password,this.state.userName)}>
                    <Text>Registrarse</Text>
                </TouchableOpacity>
                {this.state.errorMessage !== "" ?
                    <Text>{this.state.errorMessage}</Text>
                    : false
                }
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