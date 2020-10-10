import React, { FC } from 'react';

import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '10px',
    backgroundColor: theme.palette.secondary.main,
    // backgroundColor: 'red',
    /* width: '100px',
    height: '100px', */
    /* height: '100%', */
    marginTop: '15px',
    color: 'white',
    boxSizing: 'border-box',
    opacity: '0.75',
  },
  containerOpaco: {
    padding: '10px',
    backgroundColor: theme.palette.secondary.main,
    // backgroundColor: 'red',
    /* width: '100px',
    height: '100px', */
    /* height: '100%', */
    marginTop: '15px',
    color: 'white',
    boxSizing: 'border-box',
  },
  containerInterno: {
    /* width: '100%',
    height: '100%', */
    /* height: '100%', */
    marginTop: '10px',
    fontSize: '15px',
  },
}));

export type LabelEstoqueProps = {
  produto: any;
  isOpaco?: boolean;
};

const LabelEstoque: FC<LabelEstoqueProps> = ({ produto, isOpaco = false }) => {
  const classes = useStyles();

  return (
    <Paper
      className={isOpaco ? classes.containerOpaco : classes.container}
      elevation={3}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        /* height="100%" */
        color="white"
      >
        <div>ESTOQUE:</div>

        <Paper className={classes.containerInterno} elevation={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            /* height="100%" */
            height="80px"
            color="black"
            padding="10px"
          >
            <div style={{ fontSize: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Produto: </span>
              <span>{produto.nome}</span>
            </div>
            <div style={{ marginTop: '5px', fontSize: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Unidades Disponiveis: </span>
              <span>{produto.unidadesDisponivel}</span>
            </div>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default LabelEstoque;
