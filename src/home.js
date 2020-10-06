

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Buscar Foto en Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
import React from 'react';

import 
    { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button,} 
from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import configStyles from './assets/styles';


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
        }
    }
    index_partido() {
        Actions.partido_politico();
    }
    index_departamentos() {
        Actions.bolivia_departamento();
    }
    index_acta() {
        Actions.padron_electoral();
    }


    render() {
        return (
            <View style={styles.contenido}>
                <View style={styles.container}>

                    <View style={[configStyles.styleHeader, styles.center]}>
                        <Text style={configStyles.styleHeaderTitle}>
                            App Electoral
                        </Text>
                    </View>


                    <ScrollView style={styles.content}>

                        <TouchableOpacity onPress={this.index_partido}>
                            <View style={styles.row}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.imgoption}>
                                        <Image style={
                                                {position: 'absolute', width: '100%', 
                                                    height: '100%', borderRadius: 100,}
                                            }
                                            source={require('./img/partidopolitico.jpeg')}
                                        />
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '700'}}>
                                        Partidos Políticos
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.index_departamentos} >
                            <View style={styles.row}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {/* <View style={styles.imgoption}>
                                        <Image style={
                                                {position: 'absolute', width: '100%', 
                                                    height: '100%', borderRadius: 100,}
                                            }
                                            source={require('./img/departamento.jpg')}
                                        />
                                    </View> */}
                                    <View style={{
                                        padding: 20
                                    }}>
                                        <Icon
                                            name="search"
                                            size={50}
                                        />
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '700'}}>
                                        Busca tu Departamento
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.index_acta} >
                            <View style={styles.row}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {/* <View style={styles.imgoption}>
                                        <Image style={
                                                {position: 'absolute', width: '100%', 
                                                    height: '100%', borderRadius: 100,}
                                            }
                                            source={require('./img/padron.jpg')}
                                        />
                                    </View> */}
                                    <View style={{
                                        padding: 20
                                    }}>
                                        <Icon
                                            name="search"
                                            size={50}
                                        />
                                    </View>
                                    <Text style={{fontSize: 18, fontWeight: '700'}}>
                                        Busca tu Colegio
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>


                    {/* <View style={styles.footer}></View> */}


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    contenido: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EBE9E8',
        position: 'relative'
    },


    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#FB0B04',
    },
    center:{
        position: 'relative',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    }, 
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 15,
    },


    content:{
        width:"100%",
        backgroundColor: "white",
        flex: 3
    },

    row: {
        width: '100%',
        height: 150,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    imgoption: {
        position: 'relative',
        width: 140,
        height: 130,
        borderRadius: 100,
        borderColor: '#E8E8E8',
        borderWidth: 2,
        marginRight: 20,
    },


    footer: {
        width: '100%',
        height: 60,
        backgroundColor: '#FB0B04',
    }
});
