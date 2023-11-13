import react, { Component } from "react";
import { auth } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        console.log(this.props)
        return(
            <View>
                {/* <Text> Email:{this.props.dataUsuario.data.owner}</Text> */}
                <Text style={styles.username}> Nombre de usuario:{this.props.dataUsuario.data.userName}</Text>
                {/* <Image style = {styles.postImage} source={{uri: this.props.dataUsuario.data.urlImagen}}/> */}
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
        paddingHorizontal:10,
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

export default  OtherProfile