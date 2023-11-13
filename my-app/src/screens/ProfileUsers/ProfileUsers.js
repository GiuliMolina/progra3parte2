import react, { Component } from "react";
import { auth, db } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

class ProfileUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            listaDePosteos: []
        };
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", this.props.route.params).onSnapshot(
            docs => {
                let ahoraUsuario = [];
                docs.forEach(doc => {
                    ahoraUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({ usuarios: ahoraUsuario })

            })

        db.collection("posts").where("owner", "==", this.props.route.params).onSnapshot(
            docs => {
                let posteosQuieroMostar = [];
                docs.forEach(doc => {
                    posteosQuieroMostar.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({ listaDePosteos: posteosQuieroMostar })
            }
        )

    }

    render() {
        console.log(this.state.listaDePosteos)
        return (
            <View>
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={unUsuario => unUsuario.id}
                    renderItem={({ item }) =>
                        <View>
                            <Text>Email:{item.data.owner}</Text>
                            <Text>Nombre de usuario: {item.data.userName} </Text>
                            <Image
                                style={styles.postImage}
                                source={{
                                    uri: item.data.urlImagen
                                }} />
                        </View>
                    }
                />
                {
                    this.state.listaDePosteos ==0 ?
                    <Text> Este usuario no tiene nigun posteo</Text> :
                        <FlatList
                            data={this.state.listaDePosteos}
                            keyExtractor={unPost => unPost.id}
                            renderItem={({ item }) =>
                                <View>
                                    <Text> {item.data.textPost} </Text>
                                    <Text> {item.data.owner}</Text>
                                </View>
                            }
                        />  
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: 6,
        marginVertical: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
    }
})

export default ProfileUsers