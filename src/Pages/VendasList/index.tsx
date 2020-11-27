import React, { useState, useEffect, useRef } from 'react';
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
import DialogoNota from '../../components/DialogoNota';
import Label from '../../components/Label';
import SidebarEntradas from '../../components/SidebarEntradas';
// import TabelaEntradas, { Row } from '../../components/TabelaEntradas';
import TabelaVendas, { Row } from '../../components/TabelaVendas';
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

const VendasList = (props) => {
  const [itens, setItens] = useState<Array<Row>>([]);
  const [nomeCaixa, setNomeCaixa] = useState('');
  const [config, setConfig] = useState<any>({});
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    async function getConfig() {
      const dataConfig = await api.get('/config2');
      setConfig(dataConfig.data);
    }
    getConfig();
  }, []);

  type CountdownHandle = React.ElementRef<typeof DialogoNota>;
  const refDialogoNota = useRef<CountdownHandle>(null);

  function closeDialogoNota() {}

  async function getVenda(idVenda: number) {
    const data = await api.get(`/vendas/total/fc/${idVenda}`);
    return data.data[0];
  }

  async function handleOpenDialogoNota(idVenda: number) {
    if (refDialogoNota.current) {
      const response = await getVenda(idVenda);
      refDialogoNota.current.handleOpen(response, config, false);
    }
  }

  async function getVendas() {
    const newItens: Array<Row> = [];
    const data = await api.get(`/vendas/fc/${getSessionId()}`);

    for (let i = 0; i < data.data.length; i += 1) {
      newItens.push({
        valor: data.data[i].valor,
        hora: data.data[i].created_at,
        uidd: String(data.data[i].id),
        cliente: data.data[i].cliente.nome,
        numero: String(data.data[i].numero),
        valorDinheiro: data.data[i].valorEmDinheiro,
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
    getVendas();
  }, []);

  async function removeItens(indices: string[]) {
    /* const arrayNew = itens.slice();
    for (let i = 0; i < indices.length; i += 1) {
      for (let j = 0; j < arrayNew.length; j += 1) {
        if (arrayNew[j].uidd === indices[i])
          await api.delete(`/entradascaixa/${indices[i]}`);
      }
    }

    await getVendas(); */
  }

  function irParaTelaInit() {
    history.push('/');
  }

  return (
    <>
      <Box padding="10px" className={classes.header}>
        <Box margin="0px 0px 10px">
          <Label label={`Lista de vendas no ${nomeCaixa}`} />
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
          <TabelaVendas
            removeItens={removeItens}
            rows={itens}
            openNota={handleOpenDialogoNota}
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
      <DialogoNota
        ref={refDialogoNota}
        handleClose={closeDialogoNota}
        itens={[]}
      />
    </>
  );
};

export default VendasList;
