
const host = 'http://conteoweb.herokuapp.com/';
const prefix = '/api';

export default {
    recinto_get_data: host + prefix + '/movil/recinto/get_data',
    recinto_get_mesa: host + prefix + '/movil/recinto/get_mesa',
    ciudad_recintos: host + prefix + '/movil/recintos_ciudad',
    mesa_show_mesa: host + prefix + '/movil/mesa/show_mesa',
    departamento_get_data: host + prefix + '/movil/departamento/get_data',
    api_amazon: 'https://apiaws.herokuapp.com/api.php'
};