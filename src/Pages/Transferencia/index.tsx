import React, { useState, useEffect, useContext } from 'react';
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

import { AppContext } from '../../App';
import ActionsEntrada from '../../components/ActionsEntradas';
import Label from '../../components/Label';
import LabelSubTotal from '../../components/LabelSubtotal';
import SidebarTransferencias from '../../components/SidebarTransferencias';
import TabelaTransferencia, { Row } from '../../components/TabelaTransferencia';
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

const Transferencias = (props) => {
  const [itens, setItens] = useState<Array<Row>>([]);
  const [nomeCaixa, setNomeCaixa] = useState('');
  const history = useHistory();
  const classes = useStyles();
  // const [saldoCaixa, setSaldoCaixa] = useState(0);
  const [isSave, setIsSave] = useState(false);
  const {
    app: { saldoCaixa },
    dispatch,
  } = useContext(AppContext);

  async function getEntradas() {
    const newItens: Array<Row> = [];
    const data = await api.get(`/transferenciascaixa/todos/${getSessionId()}`);

    for (let i = 0; i < data.data.length; i += 1) {
      newItens.push({
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

  async function getSaldoCaixa() {
    const data = await api.get(`/sessions/saldo/${getSessionId()}`);
    dispatch({
      type: 'UPDATE_SALDO_CAIXA',
      saldoCaixa: data.data.saldoAtual,
    });
    // setSaldoCaixa(data.data.saldoAtual);
  }

  useEffect(() => {
    async function getDatas() {
      setIsSave(true);
      await getNomeCaixa();
      await getEntradas();
      await getSaldoCaixa();
      setIsSave(false);
    }
    getDatas();
  }, []);

  async function newItem(valor: number, hora: Date) {
    setIsSave(true);
    await api.post('/transferenciascaixa', {
      valor,
      session_id: getSessionId(),
      hora,
    });

    await getEntradas();
    await getSaldoCaixa();
    setIsSave(false);

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
    setIsSave(true);
    const arrayNew = itens.slice();
    for (let i = 0; i < indices.length; i += 1) {
      for (let j = 0; j < arrayNew.length; j += 1) {
        if (arrayNew[j].uidd === indices[i])
          await api.delete(`/transferenciascaixa/${indices[i]}`);
      }
      /* arrayNew = arrayNew.filter(function (obj) {
        return obj.uidd !== indices[i];
      }); */
      // setItens(arrayNew);
    }

    await getEntradas();
    await getSaldoCaixa();
    setIsSave(false);
  }

  function irParaTelaInit() {
    history.push('/');
  }

  return (
    <>
      <Box padding="10px" className={classes.header}>
        <Box margin="0px 0px 10px">
          <Label label={`Retiradas no ${nomeCaixa}`} />
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
          <LabelSubTotal valor={saldoCaixa} label="Saldo:" />
        </Box>
        <Box padding="0 10px" flex={4}>
          <TabelaTransferencia removeItens={removeItens} rows={itens} />
        </Box>
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          /* justifyContent="space-between" */
        >
          <SidebarTransferencias
            handleF4={() => {
              irParaTelaInit();
            }}
            handleNewItem={newItem}
            disabled={isSave}
            saldoCaixa={saldoCaixa}
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

export default Transferencias;
