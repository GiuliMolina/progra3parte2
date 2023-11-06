import react, { Component } from "react";
import { auth } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        };
    }

    componentDidMount() { //remember me 
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Home")
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
                console.log(error);
            });
        } 
    }


    render() {
        return (
            <View style={styles.formContainer}>
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

