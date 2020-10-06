
import React from 'react';

import 
    { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} 
from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ws from '../ws';
import configStyles from '../assets/styles';


const departamento = [
    {nombre: 'Santa Cruz de la Sierra',sigla: 'SC'},
    {nombre: 'Cochabamba',sigla: 'Cbba'},
    {nombre: 'La Paz',sigla: 'Lpz'},
    {nombre: 'Beni',sigla: 'Trinidad'},
    {nombre: 'Sucre',sigla: 'Chuquisaca'},
    {nombre: 'Pando',sigla: 'UCS'},
    {nombre: 'Tarija',sigla: 'FPV'},
    {nombre: 'Oruro',sigla: 'PAN.BOL'},
    {nombre: 'Potosi',sigla: 'PDC'},
];

export default class Bolivia_departamentos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_ciudad:[]
        }
    }
    componentDidMount(){
        console.log('FETCH DATA');
        fetch(ws.departamento_get_data)
        .then((response) => response.json())
        .then((result) => {
            // console.log('RESULT ', result);
            this.setState({
                array_ciudad: result.data
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
    on_departamentos() {
        Actions.show_bolivia_departamentos();
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
                            Departamentos
                        </Text>
                    </View>

                    <ScrollView style={styles.content}>
                        {this.state.array_ciudad.map(
                            (data, key) => (
                                <TouchableHighlight key={key} onPress={() => {
                                    // Actions.mesa({ idrecinto: data.id })
                                    Actions.show_recinto({ idciudad: data.id });

                                }}>
                                    <View 
                                        style={{width: '100%', height: 70, alignItems: 'center', 
                                            borderBottomColor: '#E8E8E8', borderBottomWidth: 1, flexDirection: 'row',
                                            position: 'relative', left: 0, padding: 8, paddingLeft: 15
                                        }}
                                    >
                                        <Image
                                            style={{width: 50, height: 50, borderRadius: 50}}
                                            source={require('../img/anonimo.png')}
                                        />
                                        <Text style={{fontWeight: '600', fontSize: 15, paddingLeft: 15,
                                                position: 'relative',
                                            }}
                                        >
                                            {data.nombre}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        )}
                    </ScrollView>

                    <View style={configStyles.styleFooter}></View>


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
