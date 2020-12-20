import React, { useState, useEffect, useContext } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box, Paper, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';

import { AppContext } from '../../App';
import ActionsEntrada from '../../components/ActionsEntradas';
import AutoCompleteClientes from '../../components/AutoCompleteClientes';
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
    btn: {
      marginBottom: '10px',
    },
    container: {
      opacity: '0.75',
      marginTop: '20px',
    },
  }),
);

const Pagamentos = (props) => {
  const [itens, setItens] = useState<Array<Row>>([]);
  const [pago, setPago] = useState(false);
  const [cliente, setCliente] = useState<any>(null);
  const history = useHistory();
  const classes = useStyles();
  const {
    app: { saldoCaixa },
    dispatch,
  } = useContext(AppContext);

  console.log('Cliente');
  console.log(cliente);

  async function pagaParcela(idParcela: number) {
    await api.put(`/parcelasvenda/${idParcela}`, {
      status: true,
      datapagamentoreal: new Date(),
      session_id: getSessionId(),
    });
  }

  async function despagaParcela(idParcela: number) {
    await api.put(`/parcelasvenda/${idParcela}`, {
      status: false,
      datapagamentoreal: null,
      session_id: null,
    });
  }

  async function getParcelasFiado() {
    const newItens: Array<Row> = [];
    const idCliente = cliente ? cliente.id : 0;
    const data = await api.get(`/parcelas/fiado/fc/${idCliente}`);
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

  async function getParcelasFiadoPagas() {
    const newItens: Array<Row> = [];
    const idCliente = cliente ? cliente.id : 0;
    const data = await api.get(
      `/pagamentoscaixa/todos/${getSessionId()}/${idCliente}`,
    );
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

  async function getSaldoCaixa() {
    const data = await api.get(`/sessions/saldo/${getSessionId()}`);
    dispatch({
      type: 'UPDATE_SALDO_CAIXA',
      saldoCaixa: data.data.saldoAtual,
    });
    // setSaldoCaixa(data.data.saldoAtual);
  }

  async function handlePagarParcela(idParcela: number) {
    if (!pago) {
      await pagaParcela(idParcela);
      await getParcelasFiado();
    } else {
      await despagaParcela(idParcela);
      await getParcelasFiadoPagas();
    }
    getSaldoCaixa();
  }

  useEffect(() => {
    getParcelasFiado();
  }, []);

  useEffect(() => {
    if (pago) getParcelasFiadoPagas();
    else getParcelasFiado();
  }, [pago, cliente]);

  async function removeItens(indices: string[]) {}

  function irParaTelaInit() {
    history.push('/');
  }

  const handleChange = (event) => {
    setPago(event.target.checked);
  };

  useEffect(() => {
    getSaldoCaixa();
  }, []);

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
          <Paper elevation={3} className={classes.container}>
            <Box
              display="flex"
              flexDirection="column"
              padding="15px"
              height="100%"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                FILTROS
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <Switch
                  checked={pago}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <div>Pago nessa sessão</div>
              </div>

              {true && (
                <div style={{ marginTop: '25px' }}>
                  <AutoCompleteClientes
                    value={cliente}
                    onChange={(value) => setCliente(value)}
                  />
                </div>
              )}
            </Box>
          </Paper>
        </Box>
        <Box padding="0 10px" flex={4}>
          <TabelaPagamentos
            removeItens={removeItens}
            rows={itens}
            pagarParcela={handlePagarParcela}
            pago={pago}
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
