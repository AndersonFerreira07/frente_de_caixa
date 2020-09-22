import React from 'react';

/* import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale'; */

import FrentePage from './Pages/Frente';

/* const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, ptBR); */

function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      {/* <ThemeProvider theme={theme}> */}
        <FrentePage />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
