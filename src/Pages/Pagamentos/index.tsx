import React, { useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

import ActionsEntrada from '../../components/ActionsEntradas';
import Label from '../../components/Label';
import TabelaPagamentos, { Row } from '../../components/TabelaPagamentos';
import { getSessionId } from '../../services/alth';
import api from '../../services/api';

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

const Pagamentos = (props) => {
  const [itens, setItens] = useState<Array<Row>>([]);
  const history = useHistory();
  const classes = useStyles();

  async function pagaParcela(idParcela: number) {
    await api.put(`/parcelasvenda/${idParcela}`, {
      status: true,
      datapagamentoreal: new Date(),
      session_id: getSessionId(),
    });
  }

  async function getParcelasFiado() {
    const newItens: Array<Row> = [];
    const data = await api.get(`/parcelas/fiado/fc`);
    console.log('parcelas fiado');
    console.log(data.data);

    for (let i = 0; i < data.data.length; i += 1) {
      newItens.push({
        valor: data.data[i].valor,
        dataPagamento: data.data[i].datapagamento,
        uidd: String(data.data[i].id),
        cliente: data.data[i].venda.cliente.nome,
        numeroVenda: String(data.data[i].venda.numero),
        meioPagamento: data.data[i].tipoPagamento.nome,
      });
    }

    setItens(newItens);
  }

  async function handlePagarParcela(idParcela: number) {
    await pagaParcela(idParcela);
    await getParcelasFiado();
  }

  useEffect(() => {
    getParcelasFiado();
  }, []);

  async function removeItens(indices: string[]) {}

  function irParaTelaInit() {
    history.push('/');
  }

  return (
    <>
      <Box padding="10px" className={classes.header}>
        <Box margin="0px 0px 10px">
          <Label label="Parcelas à pagar" />
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
          <TabelaPagamentos
            removeItens={removeItens}
            rows={itens}
            pagarParcela={handlePagarParcela}
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

export default Pagamentos;
