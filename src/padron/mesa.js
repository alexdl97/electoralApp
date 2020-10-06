
import React from 'react';

import 
    { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} 
from 'react-native';

import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ws from '../ws';
import configStyles from '../assets/styles';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Buscar Foto en Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const partidos = [
    {id: 1, nombre: 'Mesa:1',sigla: 'ABC'},
    {id: 2, nombre: 'Mesa:2',sigla: 'DEF'},
    {id: 3, nombre: 'Mesa:3',sigla: 'GHI'},
    {id: 4, nombre: 'Mesa:4',sigla: 'JKL'},
    {id: 5, nombre: 'Mesa:5',sigla: 'MNÑ'},
    {id: 6, nombre: 'Mesa:6',sigla: 'OPQ'},
    {id: 7, nombre: 'Mesa:7',sigla: 'RST'},
    {id: 8, nombre: 'Mesa:8',sigla: 'UVW'},
    {id: 9, nombre: 'Mesa:9',sigla: 'XYZ'},
];

export default class Mesa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_mesa:[], 
            recinto:''
        }
    }
    componentDidMount(){
        
        fetch(ws.recinto_get_mesa + '/' + this.props.idrecinto)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                array_mesa:result.data, 
                recinto:result.recinto.nombre
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    onPress() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
                console.warn(JSON.stringify(source));
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              
            }
          });
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
                            {this.state.recinto}
                        </Text>
                    </View>

                    <ScrollView style={styles.content}>
                        {this.state.array_mesa.map(
                            (data, key) => (
                                <TouchableHighlight key={key} onPress={()=>{Actions.show_mesa({ idmesa: data.id })}}>
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

                    <View style={configStyles.styleFooter}>
                         {/* <Icon onPress={this.onPress.bind(this)}
                            style={{marginLeft: 10, padding: 7,}}
                            name="camera"
                            color="white"
                            size={23}
                        /> */}
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
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#FB0B04',
    }
});