import React, { FC } from 'react';

import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import {
// makeStyles
// } from '@material-ui/core'

// const useStyles = makeStyles(theme => ({

// }))
import { getUsername } from '../../services/alth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px 30px',
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      // width: 400,
      height: '90px',
      fontSize: '27px',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      textAlign: 'center',
      opacity: '0.8',
    },
    showPartes: {
      color: theme.palette.common.white,
    },
    hidePartes: {
      color: theme.palette.secondary.main,
    },
  }),
);

export type FooterProps = {
  tela: number;
  disabledPartes: boolean;
};

const Footer: FC<FooterProps> = ({ tela, disabledPartes }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexWrap="wrap"
        // css={{ opacity: '0.5' }}
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <div>F2 - Nova Venda</div>
          <div>F8 - Relatório e Resumo</div>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <div>F4 - Nova Entrada</div>
          {/* <div>F9 - Configurações </div> */}
          <div>F9 - Saídas </div>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <div>F7 - Transferências </div>
          <div>F10 - Vendas </div>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <div>CTRL+F22 - Pagamentos</div>
          <div>DEL - Sair</div>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <div>{`Atendente: ${getUsername()}`}</div>
          <div>{` `}</div>
        </Box>
        {/* {tela === 1 && (
          <div style={{ width: '33.33%', textAlign: 'left' }}>
            F2 - Nova Venda
          </div>
        )}
        {tela === 1 && (
          <div style={{ width: '33.33%', textAlign: 'center' }}>
            F3 - Nova Entrada
          </div>
        )}
        {tela === 1 && (
          <div style={{ width: '33.33%', textAlign: 'right' }}>F4 - Saídas</div>
        )} */}
        {/* {tela === 1 && (
          <div style={{ width: '33.33%', textAlign: 'left' }}>
            F5 - Relatório e resumo
          </div>
        )}
        {tela === 1 && (
          <div style={{ width: '33.33%', textAlign: 'center' }}>DEL - Sair</div>
        )}
        {tela === 1 && (
          <div
            style={{ width: '33.33%', textAlign: 'right' }}
          >{`Atendente: ${getUsername()}`}</div>
        )} */}
        {tela === 0 && <div>F4 - Fechar Venda</div>}
        {/* <div>F7 - Excluir Item</div> */}
        {tela === 0 && <div>F8 - Cancelar Venda</div>}
        {tela === 0 && (
          <div
            className={disabledPartes ? classes.hidePartes : classes.showPartes}
          >
            F9 - Quantidades em partes
          </div>
        )}
      </Box>
    </Paper>
  );
};

export default Footer;
