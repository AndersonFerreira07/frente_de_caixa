import React, { useRef, useEffect, createContext, useReducer, } from 'react';

import FrentePage from './Pages/Frente';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Login from './Pages/Login'

import Entradas from './Pages/Entradas'
import Tranferencias from './Pages/Transferencia'
import Relatorio from './Pages/Relatorio'
import Config from './Pages/Config'
import Init from './Pages/Init'
import Saidas from './Pages/Saidas'
import Vendas from './Pages/Venda'
import Compras from './Pages/Compra'
import VendasList from './Pages/VendasList'
import Pagamentos from './Pages/Pagamentos'
import Teste from './Pages/Teste'

import RouteBackground from './components/RouteBackground'
import RouteBackground2 from './components/RouteBackground2'
import ConfigSessao from './Pages/ConfigSessao'

import DialogoLogout from './components/DialogoLogout'
import { logout } from './services/alth';
import api from './services/api'
import { getCaixaId } from './services/config'
import Ws from '@adonisjs/websocket-client'
import reducer from './reducer'

export type AppType = {
  saldoCaixa: number;
};

export type AppContextType = {
  app: AppType;
  dispatch: (data: any) => void;
};

export const AppContext = createContext<AppContextType>({
  app: {
    saldoCaixa: 0
  },
  dispatch: (data: any) => {
    console.log('dispach velho');
  },
});

let ws;

function App() {

  /* const history = useHistory();

  type CountdownHandle = React.ElementRef<typeof DialogoLogout>;
  const dialogoLogoutRef = useRef<CountdownHandle>(null);

  function handleLogout() {
    console.log('clicou ')
    if (dialogoLogoutRef.current) dialogoLogoutRef.current.handleOpen()
  }

  function handleTransferenciaFinal() {
    logout();
  }

  function handleFechouImpressão() {
    history.push('/login');
  } */
  const [app, dispatch] = useReducer(reducer, {
    saldoCaixa: 0
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ws = Ws(process.env.REACT_APP_HOST_WS)
    ws.connect()
    ws.on('open', () => {
      ws.subscribe('gerente')
    })
    return () => ws.close();
  }, [])

  async function callGerente() {
    const data = await api.get(`/caixasfisicos/${getCaixaId()}`)
    ws.getSubscription('gerente').emit('notificaGerente', {
      nomeCaixa: data.data.nome,
    });
    enqueueSnackbar('O gerente foi notificado, e já deve estar a caminho!', { 
      variant: 'info',
    });
  }

  return (
    <AppContext.Provider value={{ app, dispatch }}>
      <Router>
        <RouteBackground exact path="/" component={Init} callGerente={callGerente}/>
        <RouteBackground path="/entradas" component={Entradas} callGerente={callGerente}/>
        <RouteBackground path="/saidas" component={Saidas} callGerente={callGerente}/>
        <RouteBackground path="/transferencias" component={Tranferencias} callGerente={callGerente}/>
        <RouteBackground path="/relatorio" component={Relatorio} callGerente={callGerente}/>
        <RouteBackground2 path="/configuracoes" component={Config}/>
        {/* <RouteBackground path="/frentedecaixa" component={FrentePage}/> */}
        <RouteBackground path="/vendas" component={Vendas} callGerente={callGerente}/>
        <RouteBackground path="/compras" component={Compras} callGerente={callGerente}/>
        {/* <RouteBackground path="/configuracoesessao" component={ConfigSessao} callGerente={callGerente}/> */}
        <RouteBackground path="/listavendas" component={VendasList} callGerente={callGerente}/>
        <RouteBackground path="/pagamentos" component={Pagamentos} callGerente={callGerente}/>
        <Route path="/login" component={Login} />
        <Route path="/teste" component={Teste} />

      </Router>
    </AppContext.Provider>
  );
}

function WapperApp() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <SnackbarProvider maxSnack={6}>
        <App/>
      </SnackbarProvider>
    </div>
  )
}

export default WapperApp;