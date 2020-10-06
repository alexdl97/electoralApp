
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {Router, Scene} from 'react-native-router-flux';
import Login from './auth/login';
import Home from './home';
import Partido_Politico from './politica/partido';
import Show_Partido_Politico from './politica/show';
import Bolivia_departamentos from './departamento/departamentos';
import Padron_Electoral from './padron/acta';
import Mesa from './padron/mesa';
import Show_mesa from './padron/show_mesa';
import ShowRecinto from './departamento/show_recinto';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Router>
          <Scene key="root" >
            <Scene key="login" component={Login} initial={true} hideNavBar />
            <Scene key="home" component={Home} hideNavBar />
            <Scene key="partido_politico" component={Partido_Politico} hideNavBar />
            <Scene key="bolivia_departamento" component={Bolivia_departamentos} hideNavBar />
            <Scene key="show_departamento" path={"/show_departamento/:iddepartamento/"} component={Bolivia_departamentos} hideNavBar />
            <Scene key="padron_electoral" component={Padron_Electoral} hideNavBar />
            <Scene key="mesa" path={"/mesa/:idrecinto/"} component={Mesa} hideNavBar />
            <Scene key="show_mesa" path={"/show_mesa/:idmesa/"} component={Show_mesa} hideNavBar />
            <Scene key="show_partido_politico" component={Show_Partido_Politico} hideNavBar />
            <Scene key="show_recinto" component={ShowRecinto} hideNavBar />
          </Scene>
        </Router>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBE9E8',
  },
});

