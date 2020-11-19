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

import RouteBackground from './components/RouteBackground'

function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <SnackbarProvider maxSnack={6}>
          <Router>
            <RouteBackground exact path="/" component={Init}/>
            <RouteBackground path="/entradas" component={Entradas}/>
            <RouteBackground path="/transferencias" component={Tranferencias}/>
            <RouteBackground path="/relatorio" component={Relatorio}/>
            <RouteBackground path="/configuracoes" component={Config}/>
            <RouteBackground path="/frentedecaixa" component={FrentePage}/>
            <Route path="/login" component={Login} />
          </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;