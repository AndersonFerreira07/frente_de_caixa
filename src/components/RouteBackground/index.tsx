import React, { FC, useRef } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';

import { isAuthenticated, logout } from '../../services/alth';
import Background from '../Background';
import DialogoLogout from '../DialogoLogout';
import MenuMaisOpcoes from '../MenuMaisOpcoes';

const useStyles = makeStyles((theme) => ({
  settings: {
    color: 'red',
  },
}));

export type RouteBackgroundProps = {
  component: any;
  path: string;
  exact?: boolean;
  callGerente?: () => void;
  /* redirect?: string;
  isRedirect?: boolean; */
  // handleLogout: () => void;
};

const RouteBackground: FC<RouteBackgroundProps> = ({
  path,
  component,
  exact = false,
  callGerente = () => {},
  /* redirect = '/',
  isRedirect =  */
  // handleLogout,
}) => {
  const Component = component;
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  type CountdownHandle = React.ElementRef<typeof DialogoLogout>;
  const dialogoLogoutRef = useRef<CountdownHandle>(null);

  function handleLogout() {
    console.log('clicou ');
    if (dialogoLogoutRef.current) dialogoLogoutRef.current.handleOpen();
  }

  function handleTransferenciaFinal() {
    logout();
  }

  function handleFechouImpressão() {
    history.push('/login');
  }

  function getBreakPath(path2) {
    const subrotas = path2.split('/');
    console.log('subrotas');
    console.log(subrotas);

    return `/${subrotas.length <= 0 ? '' : subrotas[subrotas.length - 1]}`;
  }

  function handleActionsMenu(action: number) {
    switch (action) {
      case 0:
        history.push('/configuracoesessao');
        break;
      case 1:
        callGerente();
        break;
      case 2:
        handleLogout();
        break;

      default:
        break;
    }
  }

  return (
    <>
      <Route
        path={path}
        exact={exact}
        render={(props) => (
          <Background redirect="/login" isRedirect={!isAuthenticated()}>
            <Component />
          </Background>
        )}
      />
      {(location.pathname === path ||
        location.pathname === '/vendas/frentedecaixa' ||
        location.pathname === '/vendas/finalizarvenda' ||
        location.pathname === '/compras/frentedecaixa' ||
        location.pathname === '/compras/finalizarcompra') && (
        <>
          {/* <div style={{ position: 'fixed', top: '10px', right: '20px' }}>
            <IconButton onClick={(e) => handleLogout()}>
              <MoreVertIcon className={classes.settings} />
            </IconButton>
          </div> */}
          <MenuMaisOpcoes handleAction={handleActionsMenu} />
          <DialogoLogout
            ref={dialogoLogoutRef}
            handleTransferenciaFinal={handleTransferenciaFinal}
            handleFechouImpressao={handleFechouImpressão}
          />
        </>
      )}
    </>
  );
};

export default RouteBackground;
