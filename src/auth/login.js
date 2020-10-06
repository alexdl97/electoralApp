
import React from 'react';

import 
    { StyleSheet, Text, View, TextInput, TouchableOpacity} 
from 'react-native';

import {Actions} from 'react-native-router-flux';

const usuarios = [
    {nombre: 'angelica', apellido: 'rodriguez', usuario: 'angelica', password: '123456'},
    {nombre: 'alondra', apellido: 'avalos', usuario: 'alondra', password: '123456'},
    {nombre: 'jandira', apellido: 'vargas', usuario: 'jandira', password: '123456'},
];

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            validacionuser: true,
            validacionpass: true,
        }
    }
    saveData() {
        Actions.home();
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Ingresar usuario ..."
                    placeholderTextColor = "#002f6c"
                    selectionColor="#002f6c"
                    onChangeText={(usuario) => 
                        this.setState({
                            usuario
                        })
                    }
                    onSubmitEditing={()=> this.password.focus()}
                />
                <TextInput style={styles.inputBox}
                    onChangeText={(password) => 
                        this.setState({
                            password
                        })
                    }
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Ingresar password ..."
                    secureTextEntry={true}
                    placeholderTextColor = "#002f6c" 
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button} onPress={this.saveData}> 
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBE9E8',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 15,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    error: {
        borderColor: 'red',
        borderWidth: 2,
    }
});
