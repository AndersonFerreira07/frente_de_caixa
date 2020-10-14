import React from 'react';

import { Story, Meta } from '@storybook/react';

import TabelaFC, { TabelaFCProps } from '.';
import { createObjVenda } from '../../utils/createObjVenda';

const testeConfig = {
  id: 1,
  created_at: '2020-09-09 11:34:25',
  updated_at: '2020-09-26 09:39:03',
  contadorvendas: 5,
  contadorbarcode: 1043,
  contadorlotes: 1,
  meta: 30,
  empresario: 'Anderson',
  nomeEmpresa: 'Mega Jander',
  banco: 'Banco do Brasil',
  cpf: '10831989475',
  cep: '55450000',
  telefone: '81994392133',
  enderecoEmpresa: 'rua boa vista, 31',
  contaCorrente: '13114-987',
  agencia: '0.159-7',
  somaAcumuladaAno: 0,
  created_at_last_venda: '2020-09-26 00:00:00',
  arredondamento: 0,
  diasVencimento: 7,
  diasPagamento: 7,
  tipo_pagamento_id: 1,
  caixa_id: 7,
  conta_id: 1,
};

const testeDadosCompra = [
  {
    observacao: 'dsfsfs',
    numero: 5,
    status: 2,
    data: '2020-09-26 00:00:00',
    valor: 190.58,
    valorNota: 190.58,
    itens: [
      {
        unidades: 13,
        peso: 0,
        observacao: '4 caixas',
        precoVenda: 14.66,
        lote: {
          numero: 1,
          nota: true,
          validade: '2021-02-22 00:00:00',
          ativo: true,
          produto: {
            nome: 'Linguiça Calabreza',
            ativo: true,
            codigo: '1234',
            unidade: {
              nome: 'pacote',
              modo: 2,
            },
          },
        },
      },
    ],
    cliente: {
      nome: 'Edvaldo',
      empresa: 'lala',
      cpf: null,
      rg: null,
      cnpj: null,
      razaosocial: null,
      aniversario: null,
      logradouro: null,
      numero: null,
      complemento: null,
      bairro: null,
      cep: null,
      cidade: null,
      uf: 'PE',
      email: null,
      telefone: null,
      diaaniversario: null,
      mesaniversario: null,
      anoaniversario: null,
      dataAniversario: null,
    },
    parcelas: [
      {
        valor: 190.58,
        valorNota: 190.58,
        status: true,
        datapagamento: '2020-09-26T03:00:00.000Z',
        datapagamentoreal: '2020-09-26T03:00:00.000Z',
        tipo_pagamento_id: 1,
        valorReal: 190.58,
        lucro: 26,
        tipoPagamento: {
          nome: 'a vista',
          modo: 0,
          multa: 0,
          juros: 0,
          taxa: 0,
          conta_id: 1,
        },
      },
    ],
  },
];

console.log('init');
const vendaObjNew = createObjVenda(testeDadosCompra[0], testeConfig, true);

console.log('vendaObjNew');
console.log(vendaObjNew);

export default {
  title: 'TabelaFC',
  component: TabelaFC,
  decorators: [
    (Story2) => (
      <div
        style={{
          height: '100vh',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <Story2 />
      </div>
    ),
  ],
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' },
  },
  arg: {},
} as Meta;

const Template: Story<TabelaFCProps> = (args) => <TabelaFC {...args} />;

export const TabelaFCDefault = Template.bind({});

TabelaFCDefault.args = {
  data: vendaObjNew,
};
