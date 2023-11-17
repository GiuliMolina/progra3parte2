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
                <View style={styles.container}>
                <Text style={styles.textoRegister}>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email:text})}
                    placeholder = "Email"
                    keyBoardType="email-adress"
                    value = {this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password:text})}
                    placeholder = "Contraseña"
                    keyBoardType="default"
                    secureTextEntry={true}
                    value = {this.state.password}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName:text})}
                    placeholder = "Nombre de usuario"
                    keyBoardType="default"
                    value = {this.state.userName}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({miniBio:text})}
                    placeholder = "Mini biografía"
                    keyBoardType="default"
                    value = {this.state.miniBio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({urlImagen:text})}
                    placeholder = "Foto de perfil"
                    keyBoardType="default"
                    value = {this.state.urlImagen}
                />

                <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email,this.state.password,this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                {this.state.errorMessage !== "" ?
                    <Text>{this.state.errorMessage}</Text>
                    : false
                }
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                <Text style={styles.texto3}>Ya tengo cuenta.  <Text style={styles.texto2}>Ir a login</Text></Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
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
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "70%",
        width: "40%"
      },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        height: "10%",
        width: "90%"
    },
    button: {
        backgroundColor: "rgb(99 71 239)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "purple",
        marginTop: "20px"
    },
    textButton: {
        color: "#fff"
    },
    textoRegister: {
        fontSize: "25px",
        marginBottom: "20px",
        marginTop: "20px"
    },
    texto2:{
        marginTop: "10px",
        color: "blue",
        textDecorationColor:"blue",
        textDecorationLine: "underline"
    },
    texto3:{
        marginTop: "10px",
        
    }
})

export default Register;