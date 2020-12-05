import React, { useState, useMemo } from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    padding: '1cm',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  title2: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title3: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  title4: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '100%',
    fontSize: '10',
  },
  item: {
    border: '1 solid black',
    margin: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  itemNaoTotal: {
    // border: '1 solid black',
    margin: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  itemTotal: {
    // border: '1 solid black',
    margin: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // flex: 1
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    // flex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'blue',
    color: 'white',
    // flex: 1
  },
});

function somaValor(lista) {
  let soma = 0;
  for (let i = 0; i < lista.length; i += 1) {
    soma += lista[i].valor;
  }
  return soma;
}

const saidas2 = [
  {
    nome: 'Suco',
    valor: 5,
    horario: '12/12/2020 12:23',
  },
  {
    nome: 'Pão',
    valor: 4,
    horario: '12/12/2020 12:23',
  },
];

const entradas2 = [
  {
    nome: 'Achado na rua',
    valor: 10,
    horario: '12/12/2020 12:23',
  },
  {
    nome: 'Ganhei da mãe',
    valor: 17,
    horario: '12/12/2020 12:23',
  },
];

const transferencias2 = [
  {
    valor: 500,
    horario: '12/12/2020 12:23',
  },
  {
    valor: 1560,
    horario: '12/12/2020 12:23',
  },
];

const vendas2 = [
  {
    numero: '#89',
    horario: '12/12/2020 12:23',
    cliente: 'Matheus',
    valorTotal: 34,
    valor: 34,
  },
  {
    numero: '#90',
    horario: '12/12/2020 12:23',
    cliente: 'Mary',
    valorTotal: 34,
    valor: 26,
  },
];

const pagamentos2 = [
  {
    numero: '#89',
    dataPagamento: '12/12/2020',
    cliente: 'Matheus',
    valor: 200,
    meioPagamento: 'Fiado',
  },
  {
    numero: '#90',
    dataPagamento: '12/12/2020',
    cliente: 'Mary',
    valor: 370,
    meioPagamento: 'Fiado',
  },
];

// Create Document Component

const MyDocument = ({
  entradas = entradas2,
  saidas = saidas2,
  transferencias = transferencias2,
  vendas = vendas2,
  pagamentos = pagamentos2,
  trocoInicial = 230,
  atendente = 'Anderson',
  caixa = 'Caixa Exemplo',
  abertura = '12/03/2020 13:45',
  fechamento = '12/03/2020 17:45',
}) => {
  function formatMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  function saldoFinal() {
    const somaEntradas = somaValor(entradas);
    const somaSaidas = somaValor(saidas);
    const somaTransferencias = somaValor(transferencias);
    const somaVendas = somaValor(vendas);
    const somaPagamentos = somaValor(pagamentos);
    return (
      trocoInicial +
      somaVendas +
      somaPagamentos +
      somaEntradas -
      somaSaidas -
      somaTransferencias
    );
  }
  return (
    <Document author="anderson" title={`Relatório ${caixa}`}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.body}>
          <View
            style={[
              styles.title,
              { margin: '10 0', fontWeight: 'bold', fontSize: '15' },
            ]}
          >
            <Text>CARUARU FRIOS</Text>
          </View>
          <View style={[styles.title2, { margin: '10 0', fontSize: '12' }]}>
            <Text>Relatório </Text>
            <Text style={{ color: 'red' }}>{` ${caixa}`}</Text>
          </View>

          <View style={[styles.title3, { margin: '10 0', fontSize: '12' }]}>
            <Text>Atendente: </Text>
            <Text style={{ color: 'red' }}>{`${atendente}`}</Text>
          </View>

          <View style={[styles.title3, { margin: '10 0', fontSize: '12' }]}>
            <Text>Abertura: </Text>
            <Text style={{ color: 'red' }}>{` ${abertura}`}</Text>
          </View>
          <View style={[styles.title3, { margin: '10 0', fontSize: '12' }]}>
            <Text>Fechamento: </Text>
            <Text style={{ color: 'red' }}>{` ${fechamento}`}</Text>
          </View>

          <View style={[styles.title3, { margin: '10 0', fontSize: '12' }]}>
            <Text>Troco Inicial: </Text>
            <Text style={{ color: 'red' }}>{`${formatMoeda(
              trocoInicial,
            )}`}</Text>
          </View>

          <View style={[styles.title3, { margin: '10 0', fontSize: '12' }]}>
            <Text>Saldo Restante: </Text>
            <Text style={{ color: 'red' }}>{`${formatMoeda(
              saldoFinal(),
            )}`}</Text>
          </View>

          <View style={styles.title}>
            <View style={[styles.title4, { margin: '20 0 10' }]}>
              <Text>Vendas: </Text>
              <Text style={{ color: 'red' }}>{`${formatMoeda(
                somaValor(vendas),
              )}`}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.item}>
                  <Text>Nº Venda</Text>
                </View>
                <View style={styles.item}>
                  <Text>Cliente</Text>
                </View>
                <View style={styles.item}>
                  <Text>Horário</Text>
                </View>
                <View style={styles.item}>
                  <Text>Valor Total</Text>
                </View>
                <View style={styles.item}>
                  <Text>Valor em dinheiro</Text>
                </View>
              </View>
              {vendas.map((item, index) => (
                <View style={styles.content}>
                  <View style={styles.item}>
                    <Text>{item.numero}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.cliente}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.horario}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{formatMoeda(item.valorTotal)}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{formatMoeda(item.valor)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.title}>
            <View style={[styles.title4, { margin: '20 0 10' }]}>
              <Text>Pagamentos: </Text>
              <Text style={{ color: 'red' }}>{`${formatMoeda(
                somaValor(pagamentos),
              )}`}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.item}>
                  <Text>Nº Venda</Text>
                </View>
                <View style={styles.item}>
                  <Text>Cliente</Text>
                </View>
                <View style={styles.item}>
                  <Text>Meio de pagamento</Text>
                </View>
                <View style={styles.item}>
                  <Text>Data de pagamento</Text>
                </View>
                <View style={styles.item}>
                  <Text>Valor</Text>
                </View>
              </View>
              {pagamentos.map((item, index) => (
                <View style={styles.content}>
                  <View style={styles.item}>
                    <Text>{item.numero}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.cliente}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.meioPagamento}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.dataPagamento}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{formatMoeda(item.valor)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.title}>
            <View style={[styles.title4, { margin: '20 0 10' }]}>
              <Text>Entradas: </Text>
              <Text style={{ color: 'red' }}>{`${formatMoeda(
                somaValor(entradas),
              )}`}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.item}>
                  <Text>Nome</Text>
                </View>
                <View style={styles.item}>
                  <Text>Horário</Text>
                </View>
                <View style={styles.item}>
                  <Text>Valor</Text>
                </View>
              </View>
              {entradas.map((item, index) => (
                <View style={styles.content}>
                  <View style={styles.item}>
                    <Text>{item.nome}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.horario}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{formatMoeda(item.valor)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.title}>
            <View style={[styles.title4, { margin: '20 0 10' }]}>
              <Text>Saídas: </Text>
              <Text style={{ color: 'red' }}>{`${formatMoeda(
                somaValor(saidas),
              )}`}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.item}>
                  <Text>Nome</Text>
                </View>
                <View style={styles.item}>
                  <Text>Horário</Text>
                </View>
                <View style={styles.item}>
                  <Text>Valor</Text>
                </View>
              </View>
              {saidas.map((item, index) => (
                <View style={styles.content}>
                  <View style={styles.item}>
                    <Text>{item.nome}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.horario}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{formatMoeda(item.valor)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.title}>
            <View style={[styles.title4, { margin: '20 0 10' }]}>
              <Text>Transferências: </Text>
              <Text style={{ color: 'red' }}>{`${formatMoeda(
                somaValor(transferencias),
              )}`}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.item}>
                  <Text>Horário</Text>
                </View>
                <View style={styles.item}>
                  <Text>Valor</Text>
                </View>
              </View>
              {transferencias.map((item, index) => (
                <View style={styles.content}>
                  <View style={styles.item}>
                    <Text>{item.horario}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text>{formatMoeda(item.valor)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
