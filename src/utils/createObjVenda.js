import moment from 'moment';

function compareDatas(a, b) {
  if (a.datapagamento > b.datapagamento) return 1;
  if (b.datapagamento > a.datapagamento) return -1;
  return 0;
}

export function createObjVenda(vendaObj, config, isNota) {
  const vendaObjNew = {};

  const dataVenda = moment(new Date(vendaObj.data)).format('DD/MM/YYYY');
  vendaObjNew.razao = vendaObj.cliente.empresa;
  vendaObjNew.cpf = vendaObj.cliente.cpf;
  vendaObjNew.fantasia = vendaObj.cliente.razaosocial;
  vendaObjNew.email = vendaObj.cliente.email;
  vendaObjNew.resp = vendaObj.cliente.nome;
  // vendaObjNew.frete = vendaObj.frete;
  vendaObjNew.frete = 0;
  vendaObjNew.entrega = dataVenda;
  vendaObjNew.logradouro = vendaObj.cliente.logradouro;
  vendaObjNew.complemento = vendaObj.cliente.complemento;
  vendaObjNew.n = vendaObj.cliente.numero;
  vendaObjNew.bairro = vendaObj.cliente.bairro;
  vendaObjNew.cep = vendaObj.cliente.cep;
  vendaObjNew.municipio = vendaObj.cliente.cidade;
  vendaObjNew.uf = vendaObj.cliente.uf;
  vendaObjNew.fone = vendaObj.cliente.telefone;
  vendaObjNew.dataRecebimento = dataVenda;
  vendaObjNew.nPedido = vendaObj.numero;
  vendaObjNew.agencia = config.agencia;
  vendaObjNew.contaCorrente = config.contaCorrente;
  vendaObjNew.empresario = config.empresario;
  vendaObjNew.cpfEmpresario = config.cpf;
  vendaObjNew.banco = config.banco;

  // vendaObjNew.meioPagamento = vendaObj.tipoPagamento.nome;

  vendaObjNew.nomeEmpresa = config.nomeEmpresa;
  vendaObjNew.enderecoEmpresa = config.enderecoEmpresa;
  vendaObjNew.cepEmpresa = config.cep;
  vendaObjNew.foneEmpresa = config.telefone;

  // vendaObjNew.modoPagamento = vendaObj.tipoPagamento.modo;

  vendaObjNew.slogan = `RECEBEMOS DE ${String(
    config.nomeEmpresa,
  ).toUpperCase()} OS PRODUTOS CONSTANTES NA PRESENTE NOTA, NA DATA E HORA INDICADAS A SEGUIR:`;

  const listaProdutos = [];
  for (let i = 0; i < vendaObj.itensProdutos.length; i++) {
    const {
      unidades: unidadesItem,
      peso: pesoItem,
      // observacao,
      precoVenda,
      produto: {
        nome: nomeProduto,
        ativo,
        codigo,
        unidade: { nome: nomeUnidade, modo },
      },
    } = vendaObj.itensProdutos[i];

    if (true)
      listaProdutos.push({
        // if(!isNota || (isNota && nota))  listaProdutos.push({
        descricao: nomeProduto,
        observacao: '',
        qtde: unidadesItem,
        tipo: nomeUnidade,
        peso: pesoItem,
        valorUnitario: precoVenda,
        tipoUnidade: modo,
        numeroLote: 5,
        unidadeFinanceira: modo === 2 ? parseInt(unidadesItem, 10) : pesoItem,
      });
  }

  vendaObjNew.listaProdutos = listaProdutos;

  const parcelas = [];

  vendaObj.parcelas.sort(compareDatas);

  for (let i = 0; i < vendaObj.parcelas.length; i++) {
    const {
      valor,
      valorNota,
      datapagamento,
      tipoPagamento,
      troco,
    } = vendaObj.parcelas[i];
    const datapagamentoFormat = moment(new Date(datapagamento)).format(
      'DD/MM/YYYY',
    );
    parcelas.push({
      valor: isNota ? valorNota : valor,
      data: datapagamentoFormat,
      tipoPagamento,
      numero: `${i + 1}`,
      troco,
    });
  }

  vendaObjNew.parcelas = parcelas;

  return vendaObjNew;
}

export function createResumo(vendaObj) {
  const vendaObjNew = [];
  for (let i = 0; i < vendaObj.itensProdutos.length; i++) {
    const {
      unidades: unidadesItem,
      peso: pesoItem,
      // observacao,
      precoVenda,
      produto: {
        nome: nomeProduto,
        ativo,
        codigo,
        unidade: { nome: nomeUnidade, modo },
      },
    } = vendaObj.itensProdutos[i];

    vendaObjNew.push({
      produto: nomeProduto,
      lote: `#${5}`,
      precoVenda: `R$ ${precoVenda}`,
      unidades: unidadesItem,
      peso: pesoItem > 0 ? `${pesoItem} Kg` : '-',
    });
  }
  return vendaObjNew;
}
