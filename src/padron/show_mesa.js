
import React from 'react';

import { StyleSheet, 
    Text, 
    View, 
    Image, 
    ScrollView, 
    TouchableHighlight, 
    ActivityIndicator
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Card, Button, Overlay  } from 'react-native-elements';

import { Modal, Portal, Provider  } from 'react-native-paper';
import ws from '../ws';
import configStyles from '../assets/styles';

const options = {
    title: 'Seleccionar una foto',
    takePhotoButonTitle: 'Tomar una Foto',
    chooseFromLibraryButtonTitle: 'Elegir de la Galeria',
    cancelButtoTitle: 'cancelar',
    privateDirectory: true,
    customButtons: [{ name: 'fb', title: 'Buscar Foto en Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}



export default class Show_mesa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_delegado: [],
            array_voto: [],
            mesa: {},
            cantidad_voto: 0,
            imagen: '',
            avatarSource: '',
            visible: false,
            isLoading: false,
            resultado_general: [
                {
                    partido: "CC",
                    id: "4",
                    cantidad: 33
                },
                {
                    partido: "FPV",
                    id: "6",
                    cantidad: 0
                },
                {
                    partido: "MTS",
                    id: "8",
                    cantidad: 0
                },
                {
                    partido: "UCS",
                    id: "5",
                    cantidad: "9"
                },
                {
                    partido: "MAS",
                    id: "2",
                    cantidad: 30
                },
                {
                    partido: "PDC",
                    id: "7",
                    cantidad: 14
                },
                {
                    partido: "MNR",
                    id: "1",
                    cantidad: 10
                },
                {
                    partido: "PAN-BOL",
                    id: "9",
                    cantidad: 0
                },
                {
                    partido: "Bolivia Dijo No",
                    id: "3",
                    cantidad: 0
                }
            ],
        }
    }
    componentDidMount() {
        
        fetch( ws.mesa_show_mesa + '/' + this.props.idmesa)
            .then((response) => response.json())
            .then((result) => {
                console.warn(result)
                var cantidad_voto = 0;
                for (let i = 0; i < result.votos.length; i++) {
                    cantidad_voto = cantidad_voto + parseInt(result.votos[i].cantidad);
                }
                this.setState({
                    array_delegado: result.delegado,
                    array_voto: result.votos,
                    mesa: result.mesa,
                    cantidad_voto: cantidad_voto,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    onGenerateResultadoImagen() {

        this.setState({
            isLoading: true
        });
        fetch(ws.api_amazon, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                idReciento: '1',
                numeroMesa: '2',
                foto: this.state.imagen.data,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            // console.warn(result);
            this.setState({
                visible: true,
                resultado_general: result.resultado,
                isLoading: false,
                avatarSource: ''
            });
        })
        .catch((error) => {
            this.setState({
                isLoading: false
            });
            console.log(error.message);
            console.error(error);
            
        });
    }
    onPress() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response1 = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };
                //console.warn(JSON.stringify(source));
                //console.warn(JSON.stringify(response));
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    imagen: response,
                });
            }
        });
    }
    componentResultadoVoto() {
        var cantidad = (this.state.array_voto.length == 0) ? 0 : 100 / (this.state.array_voto.length + 1);
        if (cantidad > 0) {
            var array = [];
            array.push(
                <View style={{
                    width: cantidad.toString() + '%', borderColor: 'bue', borderWidth: 1,
                    height: '100%', flexDirection: 'column'
                }}>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>100%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>90%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>80%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>70%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>60%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>50%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>40%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>30%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>20%</Text>
                    </View>
                    <View style={{ width: '100%', height: '10%', borderBottomColor: 'blue', borderBottomWidth: 1, position: 'relative' }}>
                        <Text style={{ position: 'absolute', top: -2, right: 4, fontSize: 10 }}>10%</Text>
                    </View>
                </View>
            );
            this.state.array_voto.map(
                (data, key) => {
                    var porcentaje = (parseInt(data.cantidad) / this.state.cantidad_voto) * 100;
                    array.push(
                        <View key={key} style={{
                            width: cantidad.toString() + '%', borderColor: data.color, borderWidth: 1,
                            height: '100%', flexDirection: 'column',
                        }}>
                            <View style={{ width: '100%', height: (100 - porcentaje).toString() + '%', backgroundColor: 'white' }}></View>
                            <View style={{ width: '100%', height: porcentaje.toString() + '%', backgroundColor: data.color, position: 'relative' }}>
                                <Text style={{ position: 'absolute', top: -15, fontSize: 9, left: 3 }}>
                                    {parseFloat(porcentaje).toFixed(2) + '%'}
                                </Text>
                            </View>
                        </View>
                    );
                }
            );
            return array;
        }
        return null;
    }
    componentResultadosigla() {
        var cantidad = (this.state.array_voto.length == 0) ? 0 : 100 / (this.state.array_voto.length + 1);
        if (cantidad > 0) {
            var array = [];
            array.push(
                <View style={{
                    width: cantidad.toString() + '%', borderColor: 'bue', borderWidth: 1,
                    height: 'auto', flexDirection: 'column'
                }}>
                </View>
            );
            this.state.array_voto.map(
                (data, key) => {
                    var sigla = data.sigla.split('');
                    array.push(
                        <View key={key} style={{
                            width: cantidad.toString() + '%', borderColor: data.color, borderWidth: 1,
                            height: 'auto', flexDirection: 'column',
                        }}>
                            {sigla.map(
                                (data, key) => (
                                    <View key={key} style={{ width: '100%', height: 14, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, }}>{data}</Text>
                                    </View>
                                )
                            )}
                        </View>
                    );
                }
            );
            return array;
        }
        console.warn(cantidad)
        return null;
    }
    render() {

        let { resultado_general } = this.state;

        return (
            <View style={styles.contenido}>
                <Overlay 
                    isVisible={this.state.visible}
                    // isVisible={true}
                    // width="500"
                    // height="auto"
                    overlayStyle={{
                        width: '80%',
                        height: '50%'
                    }}
                    onBackdropPress={() => this.setState({ visible: false })}
                >
                    <View
                        style={{
                            height: '100%'
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Text 
                                style={{
                                    fontSize: 24
                                }}
                            >
                                Resultados
                            </Text>
                        </View>
                        <ScrollView>
                            {
                                resultado_general.map((partido, key) => {
                                    return (
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 10,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#E1E0DE',
                                            // width: 500
                                        }}>
                                                <Text>{partido.partido}</Text>
                                                <Text>{partido.cantidad}</Text>
                                            </View>
                                    );
                                })
                            }
                        </ScrollView>
                        {/* <View>
                        </View>   */}
                    </View>
                </Overlay>
                <View style={styles.container}>

                    <View style={[configStyles.styleHeader, styles.center,]}>
                        <Icon onPress={() => Actions.pop()}
                            style={{ marginLeft: 10, padding: 7, }}
                            name="chevron-left"
                            color="white"
                            size={23}
                        />
                        <Text style={[configStyles.styleHeaderTitle, { marginRight: 20 }]}>
                            {this.state.mesa.nombre}
                        </Text>
                    </View>

                    <ScrollView style={styles.content}>
                        <Card
                            title={this.state.mesa.recinto}
                            >
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:10,color:'red'}}>
                                    {'Detalle mesa:  '}
                                </Text>
                                <Text style={{marginRight:10,color:'blue'}}>
                                    {this.state.mesa.nro}
                                </Text>
                                <Text>
                                    {this.state.mesa.nombre}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:10,color:'red'}}>
                                    {'Ubicacion:  '}
                                </Text>
                                <Text>
                                    {this.state.mesa.ubicacion}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:10,color:'red'}}>
                                    {'Ciudad:  '}
                                </Text>
                                <Text>
                                    {this.state.mesa.ciudad}
                                </Text>
                            </View>
                            {this.state.array_delegado.map(
                                (data, key) => (
                                    <View key={key} style={{flexDirection:'row'}}>
                                        <Text style={{marginRight:10,color:'blue'}}>
                                            {'Delegado:  '}
                                        </Text>
                                        <Text style={{marginRight: 10}}>
                                            {data.nombre + ' ' + data.apellido}
                                        </Text>
                                        <Text>
                                            {(data.genero == 'F')?'Femenino':'Masculino'}
                                        </Text>
                                    </View>
                                )
                            )}
                           
                        </Card>
                        {/* <View style={{
                            width: '100%', height: 250, marginTop: 5,
                            borderColor: '#E8E8E8', borderWidth: 1, padding: 5,
                            flexDirection: 'row',
                        }}
                        >
                            {this.componentResultadoVoto()}
                        </View>
                        <View style={{
                            width: '100%', height: 'auto', marginTop: 5,
                            borderColor: '#E8E8E8', borderWidth: 1, padding: 1,
                            flexDirection: 'row'
                        }}
                        >
                            {this.componentResultadosigla()}
                        </View> */}
                        <View style={{width: '100%', marginTop: 10}}></View>
                        
                        {(this.state.avatarSource == '') ? null 
                            :
                            <View style={{width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Image 
                                    style={{width: 300, height: 250, borderRadius: 5, 
                                        margin: 'auto'
                                    }}
                                    source={this.state.avatarSource}
                                />
                                <View style={{width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                                {
                                    this.state.isLoading
                                    ? <ActivityIndicator 
                                        color={configStyles.primaryColor}
                                        size='large'
                                       />
                                    : <Button onPress={this.onGenerateResultadoImagen.bind(this)}
                                            buttonStyle={{
                                                borderRadius: 0, marginLeft: 0, 
                                                marginRight: 0, marginBottom: 0, 
                                                backgroundColor: configStyles.primaryColor
                                            }}
                                            title='Procesar' 
                                        />
                                }
                                
                                </View>
                            </View>
                        }
                        
                        <View style={{width: '100%', marginTop: 10, marginBottom: 20,}}></View>
                    </ScrollView>

                    <View style={configStyles.styleFooter}>
                        <Icon onPress={this.onPress.bind(this)}
                            style={{ marginLeft: 10, padding: 7, }}
                            name="camera"
                            color="white"
                            size={23}
                        />
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