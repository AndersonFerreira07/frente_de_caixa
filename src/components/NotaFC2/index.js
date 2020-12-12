import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import logo from '../../assets/logo512.png';
import { formatCEP, formatCPF, formatTelefone } from '../../utils/formats';

const numeroItens = 26;

function getItens() {
  return numeroItens;
}

function getTamanhoItem() {
  return `${117 / numeroItens}fr`;
}

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '18fr 44fr 29fr 22fr 39fr 20fr 25fr 24fr 22fr 44fr',
    gridTemplateRows: `5fr 4fr 4fr 9fr 18fr 9fr 5fr repeat(${getItens()}, ${getTamanhoItem()}) 6fr 8fr 5fr 5fr 5fr 5fr`,
    height: '100vh',
    '& div': {
      border: '1px solid black',
      borderCollapse: 'collapse',
    },
    padding: '0.7cm',
  },
  logoImg: {
    display: 'block',
    width: 'auto',
    height: '80%',
  },
  logo: {
    gridColumn: '1/5',
    gridRow: '1/5',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'red'
  },
  notaLabel: {
    gridColumn: '5/7',
    gridRow: '1/2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  textoAuxiliarNota: {
    gridColumn: '5/7',
    gridRow: '2/4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    textAlign: 'center',
    // backgroundColor: 'red'
  },
  numeroLabel: {
    gridColumn: '5/6',
    gridRow: '4/5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  numeroValor: {
    gridColumn: '6/7',
    gridRow: '4/5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'orange'
  },
  textoResponsabilidade: {
    gridColumn: '7/11',
    gridRow: '1/3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    textAlign: 'center',
    // backgroundColor: 'green'
  },
  dataLabel: {
    gridColumn: '7/8',
    gridRow: '3/4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  assinaturaLabel: {
    gridColumn: '8/11',
    gridRow: '3/4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'orange'
  },
  dataValor: {
    gridColumn: '7/8',
    gridRow: '4/5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'orange'
  },
  assinaturaValor: {
    gridColumn: '8/11',
    gridRow: '4/5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    textAlign: 'center',
    // backgroundColor: 'blue'
  },
  razaoSocial: {
    gridColumn: '1/5',
    gridRow: '5/6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'blue'
  },
  cnpj: {
    gridColumn: '5/6',
    gridRow: '5/6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'red'
  },
  nomeFantasia: {
    gridColumn: '6/8',
    gridRow: '5/6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'blue'
  },
  email: {
    gridColumn: '8/10',
    gridRow: '5/6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'orange'
  },
  nomeResponsavel: {
    gridColumn: '10/11',
    gridRow: '5/6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'red'
  },
  logradouro: {
    gridColumn: '1/5',
    gridRow: '6/7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'red'
  },
  fone: {
    gridColumn: '5/6',
    gridRow: '6/7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'blue'
  },
  bairro: {
    gridColumn: '6/8',
    gridRow: '6/7',
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'red'
  },
  cep: {
    gridColumn: '8/10',
    gridRow: '6/7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'orange'
  },
  municipio: {
    gridColumn: '10/11',
    gridRow: '6/7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10px',
    // backgroundColor: 'blue'
  },
  descricaoProdutos: {
    gridColumn: '1/6',
    gridRow: '7/8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  qtdeLabel: {
    gridColumn: '6/7',
    gridRow: '7/8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  unidadeLabel: {
    gridColumn: '7/8',
    gridRow: '7/8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  pesoLabel: {
    gridColumn: '8/9',
    gridRow: '7/8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  valorUnitarioLabel: {
    gridColumn: '9/10',
    gridRow: '7/8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'orange'
  },
  valorTotalLabel: {
    gridColumn: '10/11',
    gridRow: '7/8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },

  especificacoesPagamentoLabel: {
    gridColumn: '1/5',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  numeroVolumesLabel: {
    gridColumn: '5/6',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  numeroVolumesValor: {
    gridColumn: '6/7',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'orange'
  },
  pesoTotalLabel: {
    gridColumn: '7/8',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  pesoTotalValor: {
    gridColumn: '8/9',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  totalLabel: {
    gridColumn: '9/10',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  totalValor: {
    gridColumn: '10/11',
    gridRow: `${8 + numeroItens}/${9 + numeroItens}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '0px 5px',
    // backgroundColor: 'red'
  },
  parcelaLabel: {
    gridColumn: '1/2',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 1}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },

  tipoPagamentoLabel: {
    gridColumn: '2/3',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 1}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'blue'
  },
  parcelaValorLabel: {
    gridColumn: '3/4',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 1}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  trocoLabel: {
    gridColumn: '4/5',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 1}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  totalPagoLabel: {
    gridColumn: '5/6',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 1}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'orange'
  },
  dataParcelaLabel: {
    gridColumn: '6/7',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 1}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    // backgroundColor: 'orange'
  },
  infoCaruaruFrios: {
    gridColumn: '7/11',
    gridRow: `${8 + numeroItens + 1}/${9 + numeroItens + 5}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignItems: 'center',
    fontSize: '10px',
    padding: '5px',
    '& div': {
      border: 0,
    },
    // backgroundColor: 'orange'
  },

  totalPagoValor: {
    gridColumn: '5/6',
    gridRow: `${10 + numeroItens}/${14 + numeroItens}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '0px 5px',
    // backgroundColor: 'orange'
  },

  spanLabel: {
    fontWeight: 'bold',
  },

  spanValor: {},
});

const vetorZero = [];
for (let i = 0; i < numeroItens; i++) vetorZero.push(0);

const vetorZeroParcelas = [];
for (let i = 0; i < 4; i++) vetorZeroParcelas.push(0);

const Nota = forwardRef((props, ref) => {
  const {
    razao = 'Caruaru Frios',
    cpf = '108.319.894-75',
    fantasia = 'Administrador',
    email = 'andersonamericasul07@gmail.com',
    resp = 'Anderson Ferreira Alves',
    frete = 'R$ 10,00',
    entrega = '12/08/2020',
    logradouro = 'rua manezes',
    complemento = 'perto do semaforo',
    n = 76,
    bairro = 'peteca',
    cep = '55570000',
    municipio = 'lagoa dos gatos',
    uf = 'PE',
    fone = '982450902',
    dataRecebimento = '23/08/2020',
    nPedido = 789,
    listaProdutos,
    agencia = '0159-7',
    contaCorrente = '67.660-8',
    empresario = 'BRUNO FILIPE ALCÂNTARA DE LIMA',
    cpfEmpresario = '100.667.594-98',
    banco = 'BANCO DO BRASIL',
    meioPagamento = 'À VISTA',
    parcelas,
    nomeEmpresa = 'CARUARU FRIOS',
    enderecoEmpresa = 'RUA ADELINO FONTOURA, 29, DIVINÓPOLIS, CARUARU - PE	',
    cepEmpresa = '55.010-320',
    foneEmpresa = '(81) 9.9136-6770',
    modoPagamento = 0,
    // tipoUnidade
  } = props;

  let valorTotal = 0;
  let pesoTotal = 0;
  let volumeTotal = 0;
  // let descontoTotal = 0;
  for (let i = 0; i < listaProdutos.length; i += 1) {
    const unidadeFinanceira =
      listaProdutos[i].tipoUnidade === 2
        ? parseInt(listaProdutos[i].qtde, 10)
        : listaProdutos[i].peso;
    valorTotal += listaProdutos[i].valorUnitario * unidadeFinanceira;
    pesoTotal += listaProdutos[i].tipoUnidade === 2 ? 0 : listaProdutos[i].peso;
    volumeTotal += parseInt(listaProdutos[i].qtde, 10);
  }

  function formatMoeda(valor) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  function formataPeso(valor) {
    return valor.toLocaleString('de-DE', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  }
  function formataPreco(valor) {
    return valor.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const classes = useStyles();
  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.logo}>
        <img
          src={logo}
          style={{ marginLeft: '10px' }}
          className={classes.logoImg}
          alt="Logo da Empresa"
        />
        <div
          style={{ border: 0, fontSize: '25px', flex: 1, textAlign: 'center' }}
        >
          CARUARU FRIOS
        </div>
      </div>
      <div className={classes.notaLabel}>NOTA</div>

      <div className={classes.textoAuxiliarNota}>
        DOCUMENTO AUXILIAR DE SIMPLES CONFERÊNCIA
      </div>

      <div className={classes.numeroLabel}>NÚMERO</div>

      <div className={classes.numeroValor}>{nPedido}</div>

      <div className={classes.textoResponsabilidade}>
        RECEBEMOS DE CARUARU FRIOS OS PRODUTOS CONSTANTES NA PRESENTE NOTA, NA
        DATA E HORA INDICADAS A SEGUIR
      </div>

      <div className={classes.dataLabel}>DATA</div>

      <div className={classes.assinaturaLabel}>ASSINATURA DO RECEBEDOR</div>

      <div className={classes.dataValor}>{entrega}</div>

      <div className={classes.assinaturaValor} />

      <div className={classes.razaoSocial}>
        <span className={classes.spanLabel}>NOME/RAZÃO SOCIAL</span>

        <span className={classes.spanValor}>{razao}</span>
      </div>

      <div className={classes.cnpj}>
        <span className={classes.spanLabel}>CNPJ/CPF</span>

        <span className={classes.spanValor}>{formatCPF(cpf)}</span>
      </div>

      <div className={classes.nomeFantasia}>
        <span className={classes.spanLabel}>NOME FANTASIA</span>

        <span className={classes.spanValor}>{fantasia}</span>
      </div>

      <div className={classes.email}>
        <span className={classes.spanLabel}>EMAIL</span>

        <span className={classes.spanValor}>{email}</span>
      </div>

      <div className={classes.nomeResponsavel}>
        <span className={classes.spanLabel}>NOME DO RESPONSÁVEL</span>

        <span className={classes.spanValor}>{resp}</span>
      </div>

      <div className={classes.logradouro}>
        <span className={classes.spanLabel}>LOGRADOURO</span>

        <span className={classes.spanValor}>{logradouro}</span>
      </div>

      <div className={classes.fone}>
        <span className={classes.spanLabel}>FONE</span>

        <span className={classes.spanValor}>{formatTelefone(fone)}</span>
      </div>

      <div className={classes.bairro}>
        <div
          style={{
            border: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <span className={classes.spanLabel}>Nº</span>

          <span className={classes.spanValor}>{n}</span>
        </div>

        <div
          style={{
            border: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <span className={classes.spanLabel}>BAIRRO</span>

          <span className={classes.spanValor}>{bairro}</span>
        </div>
      </div>

      <div className={classes.cep}>
        <span className={classes.spanLabel}>CEP</span>

        <span className={classes.spanValor}>{formatCEP(cep)}</span>
      </div>

      <div className={classes.municipio}>
        <span className={classes.spanLabel}>MUNICÍPIO</span>

        <span className={classes.spanValor}>{municipio}</span>
      </div>

      <div className={classes.descricaoProdutos}>DESCRIÇÃO DOS PRODUTOS</div>

      <div className={classes.qtdeLabel}>QTDE</div>

      <div className={classes.unidadeLabel}>UNIDADE</div>

      <div className={classes.pesoLabel}>PESO (Kg)</div>

      <div className={classes.valorUnitarioLabel}>VALOR UN.</div>

      <div className={classes.valorTotalLabel}>VALOR TOTAL</div>

      <div className={classes.especificacoesPagamentoLabel}>
        ESPECIFICAÇÕES DA FORMA DE PAGAMENTO
      </div>

      <div className={classes.numeroVolumesLabel}>Nº DE VOLUMES</div>

      <div className={classes.numeroVolumesValor}>
        {formataPreco(volumeTotal)}
      </div>

      <div className={classes.pesoTotalLabel}>PESO TOTAL</div>

      <div className={classes.pesoTotalValor}>{formataPeso(pesoTotal)}</div>

      <div className={classes.totalLabel}>R$ TOTAL</div>

      <div className={classes.totalValor}>
        <span className={classes.spanLabel}>R$</span>

        <span className={classes.spanLabel}>{formataPreco(valorTotal)}</span>
      </div>

      <div className={classes.parcelaLabel}>PARCELA</div>

      <div className={classes.tipoPagamentoLabel}>FORMA DE PAGAMENTO</div>

      <div className={classes.parcelaValorLabel}>PARCELA</div>

      <div className={classes.trocoLabel}>TROCO</div>

      <div className={classes.totalPagoLabel}>TOTAL PAGO</div>

      <div className={classes.dataParcelaLabel}>DATA</div>

      <div className={classes.infoCaruaruFrios}>
        <div
          style={{
            fontWeight: 'bold',
          }}
        >
          Observações:
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span className={classes.spanLabel}>CNPJ</span>

            <span className={classes.spanLabel}>INSC. EST.</span>

            <span className={classes.spanLabel}>NOME FANTASIA</span>

            <span className={classes.spanLabel}>RAZÃO SOCIAL</span>
          </div>
          <div />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span className={classes.spanValor}>37.678.452/0001-37</span>

            <span className={classes.spanValor}>0896122-05</span>

            <span className={classes.spanValor}>CARUARU FRIOS</span>

            <span className={classes.spanValor}>BRUNO FILIPE A. DE LIMA</span>
          </div>
          <div />
        </div>
      </div>

      {vetorZero.map((item, index) => (
        <>
          <div
            style={{
              gridColumn: `1/6`,
              gridRow: `${8 + index}/${9 + index}`,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: '10px',
              paddingLeft: '15px',
              // backgroundColor: 'orange'
            }}
          >
            {index < listaProdutos.length
              ? `${listaProdutos[index].descricao}`
              : ''}
          </div>

          <div
            style={{
              gridColumn: `6/7`,
              gridRow: `${8 + index}/${9 + index}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
              // backgroundColor: 'orange'
            }}
          >
            {index < listaProdutos.length
              ? `${formataPreco(parseInt(listaProdutos[index].qtde, 10))}`
              : ''}
          </div>

          <div
            style={{
              gridColumn: `7/8`,
              gridRow: `${8 + index}/${9 + index}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
              // backgroundColor: 'orange'
            }}
          >
            {index < listaProdutos.length ? `${listaProdutos[index].tipo}` : ''}
          </div>

          <div
            style={{
              gridColumn: `8/9`,
              gridRow: `${8 + index}/${9 + index}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
              // backgroundColor: 'orange'
            }}
          >
            {index < listaProdutos.length
              ? listaProdutos[index].tipoUnidade === 2
                ? '-'
                : formataPeso(listaProdutos[index].peso)
              : ''}
          </div>

          <div
            style={{
              gridColumn: `9/10`,
              gridRow: `${8 + index}/${9 + index}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              padding: '0px 5px',
              // backgroundColor: 'orange'
            }}
          >
            <span className={classes.spanValor}>
              {index < listaProdutos.length ? `R$` : ''}
            </span>

            <span className={classes.spanValor}>
              {index < listaProdutos.length
                ? `${formataPreco(listaProdutos[index].valorUnitario)}`
                : ''}
            </span>
          </div>

          <div
            style={{
              gridColumn: `10/11`,
              gridRow: `${8 + index}/${9 + index}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              padding: '0px 5px',
              // backgroundColor: 'orange'
            }}
          >
            <span className={classes.spanValor}>
              {index < listaProdutos.length ? `R$` : ''}
            </span>

            <span className={classes.spanValor}>
              {index < listaProdutos.length
                ? `${formataPreco(
                    listaProdutos[index].valorUnitario *
                      listaProdutos[index].unidadeFinanceira,
                  )}`
                : ''}
            </span>
          </div>
        </>
      ))}

      {vetorZeroParcelas.map((item, index) => (
        <>
          <div
            style={{
              gridColumn: `1/2`,
              gridRow: `${10 + numeroItens + index}/${
                11 + numeroItens + index
              }`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
              // backgroundColor: 'orange'
            }}
          >
            {index < parcelas.length ? `${index + 1}` : ''}
          </div>

          <div
            style={{
              gridColumn: `2/3`,
              gridRow: `${10 + numeroItens + index}/${
                11 + numeroItens + index
              }`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
              // backgroundColor: 'orange'
            }}
          >
            {index < parcelas.length
              ? `${parcelas[index].tipoPagamento.nome}`
              : ''}
          </div>

          <div
            style={{
              gridColumn: `3/4`,
              gridRow: `${10 + numeroItens + index}/${
                11 + numeroItens + index
              }`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              padding: '0px 5px',
              // backgroundColor: 'orange'
            }}
          >
            <span className={classes.spanLabel}>
              {index < parcelas.length ? `R$` : ''}
            </span>

            <span className={classes.spanLabel}>
              {index < parcelas.length
                ? `${formataPreco(parcelas[index].valor)}`
                : ''}
            </span>
          </div>

          <div
            style={{
              gridColumn: `4/5`,
              gridRow: `${10 + numeroItens + index}/${
                11 + numeroItens + index
              }`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              padding: '0px 5px',
              // backgroundColor: 'orange'
            }}
          >
            <span className={classes.spanLabel}>
              {index < parcelas.length ? `R$` : ''}
            </span>

            <span className={classes.spanLabel}>
              {index < parcelas.length
                ? parcelas[index].tipoPagamento.modo === 0 &&
                  parcelas[index].tipoPagamento.dinheiro
                  ? `${formataPreco(parcelas[index].troco)}`
                  : '-'
                : ''}
            </span>
          </div>

          <div
            style={{
              gridColumn: `6/7`,
              gridRow: `${10 + numeroItens + index}/${
                11 + numeroItens + index
              }`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
              // backgroundColor: 'orange'
            }}
          >
            {index < parcelas.length
              ? `${formatMoeda(parcelas[index].data)}`
              : ''}
          </div>
        </>
      ))}

      <div className={classes.totalPagoValor}>
        <span className={classes.spanLabel}>R$</span>

        <span className={classes.spanLabel}>{`${formataPreco(
          valorTotal,
        )}`}</span>
      </div>
    </div>
  );
});

export default Nota;
