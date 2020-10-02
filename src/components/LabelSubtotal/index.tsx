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
    height: 'min(100%, 150px)',
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
    height: 'min(100%, 150px)',
    marginTop: '15px',
    color: 'white',
    boxSizing: 'border-box',
  },
  containerInterno: {
    /* width: '100%',
    height: '100%', */
    height: '100%',
    marginTop: '10px',
    fontSize: '40px',
  },
}));

export type LabelSubtotalProps = {
  valor: number;
  isOpaco?: boolean;
};

const LabelSubtotal: FC<LabelSubtotalProps> = ({ valor, isOpaco = false }) => {
  const classes = useStyles();

  function formatMoeda(valor: number) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <Paper
      className={isOpaco ? classes.containerOpaco : classes.container}
      elevation={3}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        color="white"
      >
        <div>SUBTOTAL:</div>

        <Paper className={classes.containerInterno} elevation={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            color="black"
          >
            {formatMoeda(valor)}
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default LabelSubtotal;
