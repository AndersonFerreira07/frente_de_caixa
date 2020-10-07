import React, { FC } from 'react';

import { makeStyles, Box, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginBottom: '10px',
    /* background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px', */
  },
  container: {
    /* height: '600px',
    width: '200px', */
    // height: '100%',
    // opacity: '0.8',
    /* width: '30rem',
    height: '20rem', */
    /* boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .2)',
    borderRadius: '5px',
    position: 'relative',
    zIndex: 1,
    background: 'inherit',
    overflow: 'hidden',
    '&:before': {
      content: '',
      position: 'absolute',
      background: 'inherit',
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
      filter: 'blur(10px)',
      margin: '-20px',
    }, */
    opacity: '0.75',
  },
}));

export type ActionsProps = {
  onClick: (action: number) => void;
  disabled: boolean[];
  produto: any;
  editPrice: boolean;
};

const Actions: FC<ActionsProps> = ({
  onClick,
  disabled,
  produto,
  editPrice,
}) => {
  const classes = useStyles();

  function showButtonPorPartes() {
    if (produto) {
      if (produto.unidade.modo === 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  return (
    <Paper elevation={3} className={classes.container}>
      <Box
        display="flex"
        flexDirection="column"
        // justifyContent="space-between"
        padding="15px"
        height="100%"
        // bgcolor="red"
      >
        {/* <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => onClick(0)}
          disabled={disabled[0]}
        >
          Nova Venda
        </Button> */}

        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => onClick(1)}
          disabled={disabled[1]}
        >
          Fechar Venda (F4)
        </Button>

        {/* <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => onClick(2)}
        >
          Excluir Item
        </Button> */}

        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => onClick(3)}
          disabled={disabled[2]}
        >
          Cancelar Venda (F8)
        </Button>

        {showButtonPorPartes() && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => onClick(5)}
            disabled={disabled[2]}
          >
            Por partes (F9)
          </Button>
        )}

        {!editPrice && produto !== null && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => onClick(6)}
            // disabled={editPrice}
          >
            Editar Preço (F10)
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Actions;
