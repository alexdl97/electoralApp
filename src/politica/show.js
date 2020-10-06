
import React from 'react';

import 
    { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} 
from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import configStyles from '../assets/styles';


const partidos = [
    {nombre: 'Carlos Diego',apellido:' De Mesa Gisbert',edad:'58',
    rol:'Candidato a la presidencia',estado:'casado',telefono:'75578978'},
    {nombre: 'Oscar Migueñ',apellido:'Ortiz Antelo',edad:'46',
    rol:'Candidato a la presidencia',estado:'casado',telefono:'76045178'},
    {nombre: 'Evo',apellido:' Morales Ayma',Edad:'51',
    rol:'Candidato a la presidencia',estado:'cholero',telefono:'7428936'},
];

export default class Show_Partido_Politico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
        }
    }
    
    render() {
        return (
            <View style={styles.contenido}>
                <View style={styles.container}>

                    <View style={[configStyles.styleHeader, styles.center, ]}>
                        <Icon onPress={() => Actions.pop()}
                            style={{marginLeft: 10, padding: 7,}}
                            name="chevron-left"
                            color="white"
                            size={23}
                        />
                        <Text style={[configStyles.styleHeaderTitle, {marginRight: 20}]}>
                            UrnApp
                        </Text>
                    </View>

                    <ScrollView style={styles.content}>
                        
                    </ScrollView>

                    <View style={configStyles.styleFooter}>
                        <Text style={{fontSize: 17}}>Partido Seleccionado</Text>
                    </View>
                    
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
        height: 70,
        backgroundColor: '#FB0B04',
    },
    center:{
        position: 'relative',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    }, 
    title:{
        fontSize: 25,
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
