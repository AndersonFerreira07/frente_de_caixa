import React, { FC, useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ActionsEntrada from '../../components/ActionsEntradas';
import Label from '../../components/Label';
import PrecoInput from '../../components/PrecoInput';
import { getSessionId, getUsername } from '../../services/alth';
import api from '../../services/api';
import { getCaixaId, setCaixaId } from '../../services/config';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  opcoes: {
    opacity: '0.75',
    height: '100%',
    padding: '20px',
  },
  opcoes2: {
    height: '100%',
  },
}));

export type ConfigProps = {};

const Config: FC<ConfigProps> = () => {
  const [trocoInicial, setTrocoInicial]: any = useState(0);
  const [trocoInicialAntigo, setTrocoInicialAntigo]: any = useState(0);
  const classes = useStyles();

  async function getData() {
    const data = await api.get(`/sessions/${getSessionId()}`);
    setTrocoInicial(data.data.trocoInicial);
    setTrocoInicialAntigo(data.data.trocoInicial);
  }

  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);
  function irParaTelaInit() {
    history.push('/');
  }

  function voltar() {
    history.goBack();
  }
  async function salvarConfiguracoes() {
    if (trocoInicial !== trocoInicialAntigo) {
      await api.put(`/sessions/${getSessionId()}`, {
        trocoInicial,
      });
      await getData();
    }
    // irParaTelaInit();
  }

  return (
    <>
      <Box margin="10px">
        <Box margin="0px 0px 10px">
          <Label label="Configurações" />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        padding="10px"
        className={classes.opcoes2}
      >
        <Box flex={1.5} display="flex" flexDirection="column">
          <ActionsEntrada
            labels={['Voltar - (F4)', 'Salvar - (F8)']}
            disabled={[false, trocoInicial === trocoInicialAntigo]}
            onClick={(action) => {
              switch (action) {
                case 0:
                  irParaTelaInit();
                  break;
                case 1:
                  salvarConfiguracoes();
                  break;
                default:
                  break;
              }
            }}
          />
        </Box>
        <Box padding="0 10px" flex={4} className={classes.opcoes2}>
          <Paper elevation={3} className={classes.opcoes}>
            <PrecoInput
              label="Troco Inicial"
              value={trocoInicial}
              onChange={(value: number) => setTrocoInicial(value)}
              fullwidth={false}
              disabled={false}
              autoFocus
              handleF4={() => irParaTelaInit()}
              handleF8={() => salvarConfiguracoes()}
            />
          </Paper>
        </Box>
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          /* justifyContent="space-between" */
        />
      </Box>
      <KeyboardEventHandler
        handleKeys={['f4', 'f8']}
        onKeyEvent={(key, e) => {
          switch (key) {
            case 'f4':
              irParaTelaInit();
              break;
            case 'f8':
              salvarConfiguracoes();
              break;
            default:
              break;
          }
        }}
      />
    </>
  );
};

export default Config;
