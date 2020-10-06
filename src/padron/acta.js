
import React from 'react';

import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight }
    from 'react-native';

import { Actions } from 'react-native-router-flux';
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
    { id: 1, nombre: 'Recinto:Col. Japones:1', sigla: 'ABC' },
    { id: 2, nombre: 'Recinto:Esc. Rene Barrientos:2', sigla: 'DEF' },
    { id: 3, nombre: 'Recinto:Esc. 15 de Septiembre:3', sigla: 'GHI' },
    { id: 4, nombre: 'Recinto:Col. Rene Barrientos Ortuños:4', sigla: 'JKL' },
    { id: 5, nombre: 'Recinto: UAGRM:5', sigla: 'MNÑ' },
    { id: 6, nombre: 'Recinto:Esc. 23 de Marzo:6', sigla: 'OPQ' },
    { id: 7, nombre: 'Recinto:Col. Don Bosco:7', sigla: 'RST' },
    { id: 8, nombre: 'Recinto:Col. Castulo Chavez:8', sigla: 'UVW' },
    { id: 9, nombre: 'Recinto:Col. Carmen Retor:9', sigla: 'XYZ' },
];

export default class Padron_Electoral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_recinto: [],
        }
    }
    componentDidMount() {
        fetch(ws.recinto_get_data)
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    array_recinto: result.data

                });
                console.log('=======', result.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }
    on_acta() {
        Actions.show_padron_electoral();
    }

    async onPress() {

        fetch(ws.api_amazon, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                foto: this.state.imagen.data,
            })
        })
        .then(response => response.json())
        .then(resp => {
            console.warn(resp.data);
        })
        .catch(error => {
            console.log("ERROR ==> ", error);
            alert("Error no se pudo conectar con el servidor");
        });
    }
    onPress = () => {
        const options = {
            title: 'opciones ',
            takePhotoButonTitle: 'Tomar una Foto',
            chooseFromLibraryButtonTitle: 'Elegir de la Galeria',
            cancelButtoTitle: 'cancelar',
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.warn('respt = ', response);
            if (response.didCancel) {
                console.warn('Seleccion Cancelada');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                this.setState({ Image: response });
                console.warn(Image);
                // console.warn(JSON.stringify(response));
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    }
    render() {
        return (
            <View style={styles.contenido}>
                <View style={styles.container}>

                    <View style={[configStyles.styleHeader, styles.center,]}>
                        <Icon onPress={() => Actions.pop()}
                            style={{ marginLeft: 10, padding: 7, }}
                            name="chevron-left"
                            color="white"
                            size={23}
                        />
                        <Text style={[configStyles.styleHeaderTitle, { marginRight: 20 }]}>
                            Padron Electoral
                        </Text>
                    </View>

                    <ScrollView style={styles.content}>
                        {this.state.array_recinto.map(
                            (data, key) => (
                                <TouchableHighlight key={key} onPress={() => { Actions.mesa({ idrecinto: data.id }) }}>
                                    <View
                                        style={{
                                            width: '100%', height: 70, alignItems: 'center',
                                            borderBottomColor: '#E8E8E8', borderBottomWidth: 1, flexDirection: 'row',
                                            position: 'relative', left: 0, padding: 8, paddingLeft: 15
                                        }}
                                    >
                                        <Image
                                            style={{ width: 50, height: 50, borderRadius: 50 }}
                                            source={require('../img/anonimo.png')}
                                        />
                                        <Text style={{
                                            fontWeight: '600', fontSize: 15, paddingLeft: 15,
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
                            style={{ marginLeft: 10, padding: 7, }}
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
    container: {
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
    center: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 15,
    },

    content: {
        width: "100%",
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FB0B04',
    }
});