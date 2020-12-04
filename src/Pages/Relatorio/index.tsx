import React, { useEffect, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';

import ActionsEntrada from '../../components/ActionsEntradas';
import RelatorioFC from '../../components/RelatorioFC';
import { getSessionId, getUsername } from '../../services/alth';
import api from '../../services/api';
import { getCaixaId } from '../../services/config';

const Relatorio = (props) => {
  const [dados, setDados] = useState<any>(null);
  const history = useHistory();

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
      `/pagamentoscaixa/todos/${getSessionId()}`,
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
      });
    }
    return vendas;
  }

  async function getNomeCaixa() {
    const data = await api.get(`/caixasfisicos/${getCaixaId()}`);
    return data.data.nome;
  }

  useEffect(() => {
    async function getData() {
      const entradas = await getEntradas();
      const saidas = await getSaidas();
      const transferencias = await getTransferencias();
      const pagamentos = await getPagamentos();
      const vendas = await getVendas();
      const atendente = getUsername();
      const caixa = await getNomeCaixa();
      setDados({
        entradas,
        saidas,
        transferencias,
        pagamentos,
        vendas,
        atendente,
        caixa,
      });
    }
    getData();
  }, []);

  return (
    <>
      <div style={{ gridRow: '1/3' }}>
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
                <div>carregando...</div>
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
                    trocoInicial={245}
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
