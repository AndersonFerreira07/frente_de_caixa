import React, { forwardRef, FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import logo from '../../assets/logo512.png';
import { formatCEP, formatCPF, formatTelefone } from '../../utils/formats';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '7fr 2fr 1fr 1fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr',
    gridTemplateRows: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 14fr 1fr 1fr 2fr',
    height: '100vh',
    '& div': {
      border: '1px solid black',
      borderCollapse: 'collapse',
    },
    padding: '0.7cm',
  },
  itemLogo: {
    gridColumn: '1/2',
    gridRow: '1/4',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '10px',
  },
  containerLogo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    marginLeft: '20px',
  },
  itemNota: {
    gridColumn: '2/4',
    gridRow: '1/4',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemSlogan: {
    gridColumn: '4/11',
    gridRow: '1/2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemRecebimento: {
    gridColumn: '4/6',
    gridRow: '2/4',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemAssinatura: {
    gridColumn: '6/11',
    gridRow: '2/4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: '10px',
  },
  itemRazao: {
    gridColumn: '1/2',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemCPF: {
    gridColumn: '2/3',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemFantasia: {
    gridColumn: '3/5',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemEmail: {
    gridColumn: '5/8',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemResp: {
    gridColumn: '8/9',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemFrete: {
    gridColumn: '9/10',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemEntrega: {
    gridColumn: '10/11',
    gridRow: '4/6',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemLogradouro: {
    gridColumn: '1/2',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemComplemento: {
    gridColumn: '2/3',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemN: {
    gridColumn: '3/4',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemBairro: {
    gridColumn: '4/5',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemCEP: {
    gridColumn: '5/7',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemMunicipio: {
    gridColumn: '7/9',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemUF: {
    gridColumn: '9/10',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },
  itemFone: {
    gridColumn: '10/11',
    gridRow: '6/8',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },

  itemDescricao: {
    gridColumn: '1/2',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemObs: {
    gridColumn: '2/3',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemLote: {
    gridColumn: '3/4',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemTipo: {
    gridColumn: '4/5',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemQTD: {
    gridColumn: '5/6',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemPT: {
    gridColumn: '6/7',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemVU: {
    gridColumn: '7/9',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemVTP: {
    gridColumn: '9/11',
    gridRow: '8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  listaProdutos: {
    gridColumn: '1/11',
    gridRow: '9/10',
    display: 'grid',
    borderCollapse: 'collapse',
    gridTemplateColumns: '7fr 2fr 1fr 1fr 1.5fr 1.5fr 3fr 3fr',
  },
  itemDB: {
    gridColumn: '1/2',
    gridRow: '10/13',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'column',
    fontSize: '10px',
  },

  itemTotais: {
    gridColumn: '3/5',
    gridRow: '10/11',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemTotais2: {
    gridColumn: '2/3',
    gridRow: '10/11',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemNVV: {
    gridColumn: '5/6',
    gridRow: '10/11',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemPESOTOTALV: {
    gridColumn: '6/7',
    gridRow: '10/11',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemVALORTOTAL: {
    gridColumn: '7/9',
    gridRow: '10/11',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  itemVALORTOTALV: {
    gridColumn: '9/11',
    gridRow: '10/11',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },

  listaParcelas: {
    gridColumn: '2/11',
    gridRow: '11/13 ',
    display: 'grid',
    borderCollapse: 'collapse',
    overflow: 'hidden',
    gridTemplateColumns: '2fr 2fr 3fr 3fr 3fr',
  },

  itemInterior: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSpan1: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemSpan2: {
    textAlign: 'center',
  },
  itemcontainerParcela: {
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '10px',
    width: '100%',
  },
  itemSpan3: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '50%',
  },
  logo: {
    display: 'block',
    width: 'auto',
    height: '80%',
  },
});

export type TabelaFCProps = {
  data: any;
};

const TabelaFC: FC<TabelaFCProps> = (props) => {
  const {
    razao,
    cpf,
    fantasia,
    email,
    resp,
    frete,
    entrega,
    logradouro,
    complemento,
    n,
    bairro,
    cep,
    municipio,
    uf,
    fone,
    dataRecebimento,
    nPedido,
    listaProdutos,
    agencia,
    contaCorrente,
    empresario,
    cpfEmpresario,
    banco,
    meioPagamento,
    parcelas,
    slogan,
    nomeEmpresa,
    enderecoEmpresa,
    cepEmpresa,
    foneEmpresa,
    modoPagamento = 0,
  } = props.data;
  const classes = useStyles();
  let valorTotal = 0;
  let pesoTotal = 0;
  let volumeTotal = 0;

  const vectorVazio: Array<any> = [];
  for (let i = 0; i < listaProdutos.length; i += 1) {
    const unidadeFinanceira =
      listaProdutos[i].tipoUnidade === 2
        ? listaProdutos[i].qtde
        : listaProdutos[i].peso;
    valorTotal += listaProdutos[i].valorUnitario * unidadeFinanceira;
    pesoTotal += listaProdutos[i].tipoUnidade === 2 ? 0 : listaProdutos[i].peso;
    volumeTotal += listaProdutos[i].qtde;
    listaProdutos[i].unidadeFinanceira = unidadeFinanceira;
  }
  for (let i = 0; i < 14; i += 1) {
    if (i >= listaProdutos.length) {
      vectorVazio.push(i);
    }
  }
  const vectorVazioParcelas: Array<any> = [];
  for (let i = 0; i < 5; i += 1) {
    if (i >= parcelas.length) {
      vectorVazioParcelas.push(i);
    }
  }
  function formatMoeda(valor) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  return (
    <div className={classes.container}>
      <div className={classes.itemLogo}>
        <img
          src={logo}
          style={{ marginLeft: '10px' }}
          className={classes.logo}
          alt="Logo da Empresa"
        />
        <div
          className={classes.containerLogo}
          style={{ border: '0px', borderCollapse: 'collapse' }}
        >
          <span className={classes.itemSpan1}>{nomeEmpresa}</span>
          <span className={classes.itemSpan2}>{enderecoEmpresa}</span>
          <span className={classes.itemSpan2}>
            {`CEP: ${formatCEP(cepEmpresa)}`}
          </span>
          <span className={classes.itemSpan2}>
            {`FONE: ${formatTelefone(foneEmpresa)}`}
          </span>
        </div>
      </div>
      <div className={classes.itemNota}>
        <span className={classes.itemSpan1}>NOTA</span>
        <span className={classes.itemSpan2}>
          DOCUMENTO AUXILIAR DE SIMPLES CONFERÊNCIA
        </span>
        <span className={classes.itemSpan2}>{`NÚMERO: ${nPedido}`}</span>
      </div>
      <div className={classes.itemSlogan}>
        <span className={classes.itemSpan1}>{slogan}</span>
      </div>
      <div className={classes.itemRecebimento}>
        <span className={classes.itemSpan1}>DATA DE RECEBIMENTO</span>
        <span className={classes.itemSpan2}>{dataRecebimento}</span>
      </div>
      <div className={classes.itemAssinatura}>
        <span className={classes.itemSpan1}>ASSINATURA DO RECEBEDOR</span>
      </div>
      <div className={classes.itemRazao}>
        <span className={classes.itemSpan1}>NOME / RAZÃO SOCIAL</span>
        <span className={classes.itemSpan2}>{razao}</span>
      </div>
      <div className={classes.itemCPF}>
        <span className={classes.itemSpan1}>CNPJ / CPF</span>
        <span className={classes.itemSpan2}>{formatCPF(cpf)}</span>
      </div>
      <div className={classes.itemFantasia}>
        <span className={classes.itemSpan1}>NOME FANTASIA</span>
        <span className={classes.itemSpan2}>{fantasia}</span>
      </div>
      <div className={classes.itemEmail}>
        <span className={classes.itemSpan1}>EMAIL</span>
        <span className={classes.itemSpan2}>{email}</span>
      </div>
      <div className={classes.itemResp}>
        <span className={classes.itemSpan1}>NOME DO RESPONSÁVEL</span>
        <span className={classes.itemSpan2}>{resp}</span>
      </div>
      <div className={classes.itemFrete}>
        <span className={classes.itemSpan1}>VALOR DO FRETE</span>
        <span className={classes.itemSpan2}>{`${formatMoeda(frete)}`}</span>
      </div>
      <div className={classes.itemEntrega}>
        <span className={classes.itemSpan1}>DATA DE ENTREGA</span>
        <span className={classes.itemSpan2}>{entrega}</span>
      </div>
      <div className={classes.itemLogradouro}>
        <span className={classes.itemSpan1}>LOGRADOURO</span>
        <span className={classes.itemSpan2}>{logradouro}</span>
      </div>
      <div className={classes.itemComplemento}>
        <span className={classes.itemSpan1}>COMPLEMENTO</span>
        <span className={classes.itemSpan2}>{complemento}</span>
      </div>
      <div className={classes.itemN}>
        <span className={classes.itemSpan1}>Nº</span>
        <span className={classes.itemSpan2}>{n}</span>
      </div>
      <div className={classes.itemBairro}>
        <span className={classes.itemSpan1}>BAIRRO</span>
        <span className={classes.itemSpan2}>{bairro}</span>
      </div>
      <div className={classes.itemCEP}>
        <span className={classes.itemSpan1}>CEP</span>
        <span className={classes.itemSpan2}>{formatCEP(cep)}</span>
      </div>
      <div className={classes.itemMunicipio}>
        <span className={classes.itemSpan1}>MUNICÍPIO</span>
        <span className={classes.itemSpan2}>{municipio}</span>
      </div>
      <div className={classes.itemUF}>
        <span className={classes.itemSpan1}>UF</span>
        <span className={classes.itemSpan2}>{uf}</span>
      </div>
      <div className={classes.itemFone}>
        <span className={classes.itemSpan1}>FONE</span>
        <span className={classes.itemSpan2}>{formatTelefone(fone)}</span>
      </div>
      <div className={classes.itemDescricao}>
        <span className={classes.itemSpan1}>DESCRIÇÃO DOS PRODUTOS</span>
      </div>
      <div className={classes.itemObs}>
        <span className={classes.itemSpan1}>OBSERVAÇÃO22</span>
      </div>
      <div className={classes.itemQTD}>
        <span className={classes.itemSpan1}>QTDE</span>
      </div>
      <div className={classes.itemTipo}>
        <span className={classes.itemSpan1}>TIPO</span>
      </div>
      <div className={classes.itemPT}>
        <span className={classes.itemSpan1}>PESO TOTAL (Kg)</span>
      </div>
      <div className={classes.itemVU}>
        <span className={classes.itemSpan1}>VALOR UNITÁRIO / Kg</span>
      </div>
      <div className={classes.itemLote}>Lote</div>
      <div className={classes.itemVTP}>
        <span className={classes.itemSpan1}>VALOR TOTAL DO PRODUTO</span>
      </div>
      <div className={classes.itemDB}>
        <span className={classes.itemSpan1}>
          {`DADOS BANCÁRIOS (${banco})`}
        </span>
        <span className={classes.itemSpan2}>
          {`AGÊNCIA: ${agencia} | CONTA CORRENTE: ${contaCorrente}`}
        </span>
        <span className={classes.itemSpan2}>
          {`${empresario} | CPF: ${formatCPF(cpfEmpresario)}`}
        </span>
      </div>
      <div className={classes.itemTotais}>
        <span className={classes.itemSpan1}>TOTAIS: </span>
      </div>
      <div className={classes.itemTotais2}>
        <span className={classes.itemSpan1} />
      </div>
      <div className={classes.itemNVV}>
        <span className={classes.itemSpan1}>{volumeTotal}</span>
      </div>

      <div className={classes.itemPESOTOTALV}>
        <span className={classes.itemSpan2}>{`${pesoTotal}`}</span>
      </div>

      <div className={classes.itemVALORTOTAL}>
        <span className={classes.itemSpan1}>VALOR TOTAL:</span>
      </div>
      <div className={classes.itemVALORTOTALV}>
        <span className={classes.itemSpan2}>
          {`${formatMoeda(valorTotal)}`}
        </span>
      </div>

      <div
        className={classes.listaParcelas}
        style={{ border: '0px', borderCollapse: 'collapse' }}
      >
        <div className={classes.itemInterior}>
          <span className={classes.itemSpan1}>Parcelas</span>
        </div>
        <div className={classes.itemInterior}>
          <span className={classes.itemSpan1}>Meio de Pagamento</span>
        </div>
        <div className={classes.itemInterior}>
          <span className={classes.itemSpan1}>Valor</span>
        </div>
        <div className={classes.itemInterior}>
          <span className={classes.itemSpan1}>Data de Pagamento</span>
        </div>
        <div className={classes.itemInterior} />

        {parcelas.map((item) => (
          <>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{`${item.numero}`}</span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>
                {`${item.tipoPagamento.nome}`}
              </span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>
                {`${formatMoeda(item.valor)}`}
              </span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{`${item.data}`}</span>
            </div>
            <div className={classes.itemInterior} />
          </>
        ))}

        {vectorVazioParcelas.map((item) => (
          <>
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
          </>
        ))}
      </div>
      <div
        className={classes.listaProdutos}
        style={{ border: '0px', borderCollapse: 'collapse' }}
      >
        {listaProdutos.map((item) => (
          <>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{item.descricao}</span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{item.observacao}</span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{`#${item.numeroLote}`}</span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{item.tipo}</span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>{item.qtde}</span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>
                {item.tipoUnidade === 2 ? '-' : item.peso}
              </span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>
                {`${formatMoeda(item.valorUnitario)}`}
              </span>
            </div>
            <div className={classes.itemInterior}>
              <span className={classes.itemSpan2}>
                {`${formatMoeda(item.valorUnitario * item.unidadeFinanceira)}`}
              </span>
            </div>
          </>
        ))}

        {vectorVazio.map((item) => (
          <>
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
            <div className={classes.itemInterior} />
          </>
        ))}
      </div>
    </div>
  );
};

export default TabelaFC;
