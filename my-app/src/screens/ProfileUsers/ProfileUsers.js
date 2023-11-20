import React, { Component } from "react";
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
import firebase from "firebase";
import Post from "../../components/Post/Post";

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
            <View style={styles.container}>
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={unUsuario => unUsuario.id}
                    renderItem={({ item }) =>
                        <View style={styles.containerUsuario}>
                             <Image
                                style={styles.profileImage}
                                source={{
                                    uri: item.data.urlImagen
                                }} />
                            <Text>{item.data.userName} </Text>
                        </View>
                    }
                />
                {
                    this.state.listaDePosteos.length == 0 ?

                        <Text> Este usuario no tiene nigun posteo</Text> :
                        <View>
                        <Text>POSTEOS:</Text>
                        <FlatList
                            data={this.state.listaDePosteos}
                            keyExtractor={unPost => unPost.id}
                            renderItem={({ item }) =>
                                <Post dataPost={item} navigation={this.props.navigation}/>
                            }
                        />
                        </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerUsuario:{
        flexDirection: 'row',
            alignItems: 'start',
marginBottom: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    container: {
        backgroundColor: "#F5F5DC",
        borderRadius: 8,
        margin: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
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