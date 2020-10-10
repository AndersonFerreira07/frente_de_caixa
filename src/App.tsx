import React from 'react';

/* import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale'; */

import FrentePage from './Pages/Frente';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/Login'

/* const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, ptBR); */

function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <SnackbarProvider maxSnack={5}>
        <Router>
          <Route exact path="/" component={FrentePage} />
          <Route path="/login" component={Login} />
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
