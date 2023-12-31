import React, { Component } from "react";
import { auth } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            buscandoSesion: undefined
        };
    }

    componentDidMount() { //remember me 
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Menu")
                this.setState({
                    buscandoSesion: false
                })
            }  else{
                this.setState({
                    buscandoSesion: true
                })
            }
        });
    }

    login(email, pass) {
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
        }else if (pass < 6) {
            this.setState({
                errorMessage: "La contraseña tiene que tener por lo menos 6 caracteres"
            })
        }else{
            auth
            .signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({
                    email: "",
                    password: "",
                })
                this.props.navigation.navigate("Menu")
            })
            .catch((error) => {
                console.log(error.code)
                if(error.code == 'auth/internal-error'){
                    this.setState({ errorMessage: "El email o la contraseña ingresado no existe"})
                } else if (error.code =='auth/invalid-email'){
                    this.setState({ errorMessage: "El email es invalido "})
                }else if(error.code == "auth/too-many-requests"){
                    this.setState({ errorMessage: "Esta haciendo muchos pedidos"})
                }
            });
        } 
    }


    render() {
        return (
            <View style={styles.formContainer}>
            {
                this.state.cargando == true  ? 
                <ActivityIndicator size="large" color="purple"/> : 
                <View style={styles.container}>
                <Text style={styles.textoLogin}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="Email"
                    keyboardType="email-adress"
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder="Contraseña"
                    keyboardType="default"
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.login(this.state.email, this.state.password)}
                >
                    <Text style={styles.textButton}
                    > Ingresar </Text>
                </TouchableOpacity>

                {this.state.errorMessage !== "" ?
                    <Text>{this.state.errorMessage}</Text>
                    : false
                }
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.texto3}>No tengo cuenta.  <Text style={styles.texto2}>Registrate</Text></Text>
                </TouchableOpacity>
            </View>
            }
            

            </View>
        );
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
        maxHeight: "60%",
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
        marginTop: "30px"
    },
    textButton: {
        color: "#fff"
    },
    textoLogin: {
        fontSize: "25px",
        marginBottom: "30px",
    },
    texto2:{
        marginTop: "20px",
        color: "blue",
        textDecorationColor:"blue",
        textDecorationLine: "underline"
    },
    texto3:{
        marginTop: "20px",
        
    }

});

export default Login;

