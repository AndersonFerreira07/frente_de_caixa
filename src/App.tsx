import React from 'react';

import FrentePage from './Pages/Frente';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/Login'

import Entradas from './Pages/Entradas'
import Tranferencias from './Pages/Transferencia'
import Relatorio from './Pages/Relatorio'
import Config from './Pages/Config'
import Init from './Pages/Init'
import Saidas from './Pages/Saidas'
import Vendas from './Pages/Venda'
import VendasList from './Pages/VendasList'
import Pagamentos from './Pages/Pagamentos'

import RouteBackground from './components/RouteBackground'
import RouteBackground2 from './components/RouteBackground2'

function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <SnackbarProvider maxSnack={6}>
          <Router>
            <RouteBackground exact path="/" component={Init}/>
            <RouteBackground path="/entradas" component={Entradas}/>
            <RouteBackground path="/saidas" component={Saidas}/>
            <RouteBackground path="/transferencias" component={Tranferencias}/>
            <RouteBackground path="/relatorio" component={Relatorio}/>
            <RouteBackground2 path="/configuracoes" component={Config}/>
            {/* <RouteBackground path="/frentedecaixa" component={FrentePage}/> */}
            <RouteBackground path="/vendas" component={Vendas}/>
            <RouteBackground path="/listavendas" component={VendasList}/>
            <RouteBackground path="/pagamentos" component={Pagamentos}/>
            <Route path="/login" component={Login} />
          </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;