import React, { useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box, Button } from '@material-ui/core';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import moment from 'moment';

import ActionsEntrada from '../../components/ActionsEntradas';
import Label from '../../components/Label';
import SidebarEntradas from '../../components/SidebarEntradas';
import TabelaEntradas, { Row } from '../../components/TabelaEntradas';
import { getSessionId } from '../../services/alth';
import api from '../../services/api';
import { getCaixaId } from '../../services/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      height: '10vh',
    },
    body: {
      height: '90vh',
    },
  }),
);

const Saidas = (props) => {
  const [itens, setItens] = useState<Array<Row>>([]);
  const [nomeCaixa, setNomeCaixa] = useState('');
  const history = useHistory();
  const classes = useStyles();

  async function getEntradas() {
    const newItens: Array<Row> = [];
    const data = await api.get(`/saidascaixa/todos/${getSessionId()}`);

    for (let i = 0; i < data.data.length; i += 1) {
      newItens.push({
        nome: data.data[i].nome,
        valor: data.data[i].valor,
        hora: data.data[i].hora,
        uidd: String(data.data[i].id),
      });
    }

    setItens(newItens);
  }

  async function getNomeCaixa() {
    const data = await api.get(`/caixasfisicos/${getCaixaId()}`);
    setNomeCaixa(data.data.nome);
  }

  useEffect(() => {
    getNomeCaixa();
    getEntradas();
  }, []);

  async function newItem(nome: string, valor: number, hora: Date) {
    await api.post('/saidascaixa', {
      nome,
      valor,
      session_id: getSessionId(),
      hora,
    });

    await getEntradas();

    /* setItens([
      ...itens,
      {
        hora,
        nome,
        valor,
        uidd: `${nome}${moment(hora).format('HH:mm:ss')}`,
      },
    ]); */
  }
  async function removeItens(indices: string[]) {
    const arrayNew = itens.slice();
    for (let i = 0; i < indices.length; i += 1) {
      for (let j = 0; j < arrayNew.length; j += 1) {
        if (arrayNew[j].uidd === indices[i])
          await api.delete(`/saidascaixa/${indices[i]}`);
      }
      /* arrayNew = arrayNew.filter(function (obj) {
        return obj.uidd !== indices[i];
      }); */
      // setItens(arrayNew);
    }

    await getEntradas();
  }

  function irParaTelaInit() {
    history.push('/');
  }

  return (
    <>
      <Box padding="10px" className={classes.header}>
        <Box margin="0px 0px 10px">
          <Label label={`Saídas no ${nomeCaixa}`} />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        padding="10px"
        className={classes.body}
      >
        <Box flex={1.5} display="flex" flexDirection="column">
          <ActionsEntrada
            labels={['Voltar - (F4)']}
            disabled={[false]}
            onClick={(action) => {
              switch (action) {
                case 0:
                  irParaTelaInit();
                  break;
                default:
                  break;
              }
            }}
          />
        </Box>
        <Box padding="0 10px" flex={4}>
          <TabelaEntradas removeItens={removeItens} rows={itens} />
        </Box>
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          /* justifyContent="space-between" */
        >
          <SidebarEntradas
            handleF4={() => {
              irParaTelaInit();
            }}
            handleNewItem={newItem}
          />
        </Box>
      </Box>
      <KeyboardEventHandler
        handleKeys={['f4']}
        onKeyEvent={(key, e) => {
          switch (key) {
            case 'f4':
              irParaTelaInit();
              break;
            default:
              break;
          }
        }}
      />
    </>
  );
};

export default Saidas;
