import react, { Component } from "react";
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
                <View>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="email"
                    keyboardType="email-adress"
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder="password"
                    keyboardType="default"
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.login(this.state.email, this.state.password)}
                >
                    <Text
                        style={styles.button}
                    > Ingresar </Text>
                </TouchableOpacity>

                {this.state.errorMessage !== "" ?
                    <Text>{this.state.errorMessage}</Text>
                    : false
                }
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                    <Text> No tengo cuenta. Registrate.</Text>
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
        marginTop: 20
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },
    button: {
        backgroundColor: "blue",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    textButton: {
        color: "#fff"
    },
    textoLogin: {
        color: "red",
    }

});

export default Login;

