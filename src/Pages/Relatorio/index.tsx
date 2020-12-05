import React, { useEffect, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';

import ActionsEntrada from '../../components/ActionsEntradas';
import Label from '../../components/Label';
import RelatorioFC from '../../components/RelatorioFC';
import { getSessionId, getUsername } from '../../services/alth';
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

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex" style={{}}>
      <CircularProgress variant="determinate" {...props} color="secondary" />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Relatorio = (props) => {
  const [dados, setDados] = useState<any>(null);
  const history = useHistory();
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  function irParaTelaInit() {
    history.push('/');
  }

  async function getEntradas() {
    const dadosEntradas = await api.get(
      `/entradascaixa/todos/${getSessionId()}`,
    );
    const entradas: Array<any> = [];
    for (let i = 0; i < dadosEntradas.data.length; i += 1) {
      entradas.push({
        nome: dadosEntradas.data[i].nome,
        valor: dadosEntradas.data[i].valor,
        horario: moment(dadosEntradas.data[i].hora).format('DD/MM/YYYY HH:mm'),
      });
    }
    return entradas;
  }

  async function getSaidas() {
    const dadosSaidas = await api.get(`/saidascaixa/todos/${getSessionId()}`);
    const saidas: Array<any> = [];
    for (let i = 0; i < dadosSaidas.data.length; i += 1) {
      saidas.push({
        nome: dadosSaidas.data[i].nome,
        valor: dadosSaidas.data[i].valor,
        horario: moment(dadosSaidas.data[i].hora).format('DD/MM/YYYY HH:mm'),
      });
    }
    return saidas;
  }

  async function getTransferencias() {
    const dadosTransferencias = await api.get(
      `/transferenciascaixa/todos/${getSessionId()}`,
    );
    const transferencias: Array<any> = [];
    for (let i = 0; i < dadosTransferencias.data.length; i += 1) {
      transferencias.push({
        valor: dadosTransferencias.data[i].valor,
        horario: moment(dadosTransferencias.data[i].hora).format(
          'DD/MM/YYYY HH:mm',
        ),
      });
    }
    return transferencias;
  }

  async function getPagamentos() {
    const dadosPagamentos = await api.get(
      `/pagamentoscaixa/todos/${getSessionId()}/0`,
    );
    const pagamentos: Array<any> = [];
    for (let i = 0; i < dadosPagamentos.data.length; i += 1) {
      pagamentos.push({
        numero: `#${dadosPagamentos.data[i].venda.numero}`,
        dataPagamento: moment(dadosPagamentos.data[i].datapagamento).format(
          'DD/MM/YYYY',
        ),
        cliente: dadosPagamentos.data[i].venda.cliente.nome,
        valor: dadosPagamentos.data[i].valor,
        meioPagamento: dadosPagamentos.data[i].tipoPagamento.nome,
      });
    }
    return pagamentos;
  }

  async function getVendas() {
    const dadosVendas = await api.get(`/vendas/fc/${getSessionId()}`);
    const vendas: Array<any> = [];
    for (let i = 0; i < dadosVendas.data.length; i += 1) {
      vendas.push({
        numero: `#${dadosVendas.data[i].numero}`,
        cliente: dadosVendas.data[i].cliente.nome,
        valor: dadosVendas.data[i].valorEmDinheiro,
        horario: moment(dadosVendas.data[i].created_at).format(
          'DD/MM/YYYY HH:mm',
        ),
        valorTotal: dadosVendas.data[i].valor,
      });
    }
    return vendas;
  }

  async function getNomeCaixa() {
    const data = await api.get(`/caixasfisicos/${getCaixaId()}`);
    return data.data.nome;
  }

  async function getSession() {
    const data = await api.get(`/sessions/${getSessionId()}`);
    return {
      abertura: moment(data.data.abertura).format('DD/MM/YYYY HH:mm'),
      fechamento: data.data.fechamento
        ? moment(data.data.fechamento).format('DD/MM/YYYY HH:mm')
        : '-',
      trocoInicial: data.data.trocoInicial,
    };
  }

  useEffect(() => {
    async function getData() {
      const entradas = await getEntradas();
      setProgress(10);
      const saidas = await getSaidas();
      setProgress(20);
      const transferencias = await getTransferencias();
      setProgress(30);
      const pagamentos = await getPagamentos();
      setProgress(50);
      const vendas = await getVendas();
      setProgress(80);
      const atendente = getUsername();
      const caixa = await getNomeCaixa();
      const session = await getSession();
      setProgress(90);
      setDados({
        entradas,
        saidas,
        transferencias,
        pagamentos,
        vendas,
        atendente,
        caixa,
        abertura: session.abertura,
        fechamento: session.fechamento,
        trocoInicial: session.trocoInicial,
      });
      // setProgress(100);
    }
    getData();
  }, []);

  return (
    <>
      <Box padding="10px" className={classes.header}>
        <Box margin="0px 0px 10px">
          <Label
            label={
              dados !== null ? `Relatório do ${dados.caixa}` : 'Carregando...'
            }
          />
        </Box>
      </Box>
      <div
        // style={{ gridRow: '1/3' }}
        className={classes.body}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          padding="10px"
          height="100%"
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
          <Box padding="0 10px" flex={4} height="100%">
            <div style={{ height: '100%' }}>
              {dados === null ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: '0.75',
                  }}
                >
                  <CircularProgressWithLabel value={progress} />
                </div>
              ) : (
                <PDFViewer
                  style={{ margin: 0, padding: 0, border: 0 }}
                  width="100%"
                  height="100%"
                >
                  <RelatorioFC
                    entradas={dados.entradas}
                    saidas={dados.saidas}
                    transferencias={dados.transferencias}
                    pagamentos={dados.pagamentos}
                    vendas={dados.vendas}
                    caixa={dados.caixa}
                    atendente={dados.atendente}
                    trocoInicial={dados.trocoInicial}
                    abertura={dados.abertura}
                    fechamento={dados.fechamento}
                  />
                </PDFViewer>
              )}
            </div>
          </Box>
        </Box>
      </div>
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

export default Relatorio;
