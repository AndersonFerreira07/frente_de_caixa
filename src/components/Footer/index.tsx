import React, { FC } from 'react';

import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import {
// makeStyles
// } from '@material-ui/core'

// const useStyles = makeStyles(theme => ({

// }))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px 30px',
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      // width: 400,
      height: '50px',
      fontSize: '27px',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      textAlign: 'center',
      opacity: '0.8',
    },
  }),
);

export type FooterProps = {
  tela: number;
};

const Footer: FC<FooterProps> = ({ tela }) => {
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
        {tela === 1 && <div>F2 - Nova Venda</div>}
        {tela === 0 && <div>F4 - Fechar Venda</div>}
        {/* <div>F7 - Excluir Item</div> */}
        {tela === 0 && <div>F8 - Cancelar Venda</div>}
        {tela === 0 && <div>F9 - Quantidades em partes</div>}
      </Box>
    </Paper>
  );
};

export default Footer;
