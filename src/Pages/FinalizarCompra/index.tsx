import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useRef,
  useEffect,
  useContext,
} from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { useSnackbar } from 'notistack';

// import AutoCompleteClientes from '../../components/AutoCompleteFornecedores';
import AutoCompleteClientes from '../../components/AutoCompleteClientesContainer';
import DialogoNota from '../../components/DialogoNota';
import LabelSubTotal from '../../components/LabelSubtotal';
import SidebarTiposPagamentos from '../../components/SidebarInputsParcelasCompra';
import Table, { Row } from '../../components/Table2';
import TablePacelas, {
  Row as Row2,
} from '../../components/TableParcelasCompra';
import { getSessionId } from '../../services/alth';
import api from '../../services/api';
import { CompraContext } from '../Compra';

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

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {},
  btnImprimir: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.4,
  },
}));

const FinalizarVenda = () => {
  const classes = useStyles();
  const [dataVenda, setDataVenda] = useState<Date | null>(new Date());
  type CountdownHandle = React.ElementRef<typeof DialogoNota>;
  const refDialogoNota = useRef<CountdownHandle>(null);
  // const [itens, setItens] = useState<Array<Row2>>([]);
  // const [cliente, setCliente] = useState<any>(null);
  // const [clienteDefault, setClienteDefault] = useState<any>(null);
  const refDate = useRef<any>(null);
  const refClientes = useRef<any>(null);
  const refBtnImprimir = useRef<any>(null);
  const { compra, dispatch } = useContext(CompraContext);
  const { fornecedor, parcelas } = compra;
  const history = useHistory();

  type SidebarHandle = React.ElementRef<typeof SidebarTiposPagamentos>;
  const refSidebar = useRef<SidebarHandle>(null);

  const { enqueueSnackbar } = useSnackbar();

  function irParaTelaInit() {
    history.push('/');
  }

  function irParaTelaFrentedeCaixa() {
    history.push('/compras/frentedecaixa');
  }

  const handleClose = () => {
    irParaTelaFrentedeCaixa();
    // hystory
  };

  function closeDialogoNota() {
    // setItens([]);
    refDate.current.value = getDataAtual();
    // setCliente(null);
    irParaTelaInit();
    // props.handleConfirma();
  }

  const handleSalvar = () => {
    // props.handleConfirma();
  };

  function getTodosDados() {
    const listaItens: Array<any> = [];
    const listaParcelas: Array<any> = [];

    console.log('getTodosDados');
    console.log('venda');
    console.log(compra);

    for (let i = 0; i < compra.itens.length; i += 1) {
      listaItens.push({
        peso: compra.itens[i].peso,
        unidades: compra.itens[i].unidades,
        precoCompra: compra.itens[i].unitario,
        produto_id: compra.itens[i].produto.id,
        validade: compra.itens[i].validade,
      });
    }

    for (let i = 0; i < parcelas.length; i += 1) {
      listaParcelas.push({
        conta_id: parcelas[i].conta.id,
        dataPagamento: parcelas[i].dataPagamento,
        valor: parcelas[i].valor,
        dataPagamentoReal: null,
      });
    }

    return {
      listaItens,
      listaParcelas,
      dataCompra: buildObjDate(refDate.current.value),
      fornecedor: fornecedor.id,
      session_id: getSessionId(),
    };
  }

  function isDadosValidos() {
    if (fornecedor === null) {
      return false;
    }
    if (parcelas.length <= 0) {
      return false;
    }
    return true;
  }

  function messagesError() {
    if (fornecedor === null) {
      enqueueSnackbar('Campo cliente não foi preenchido!', {
        variant: 'warning',
      });
    }
    if (parcelas.length <= 0) {
      enqueueSnackbar('É necessário ao menos um registro de parcela!', {
        variant: 'warning',
      });
    }
    if (getValorRestante() !== 0) {
      enqueueSnackbar(
        'O valor total da venda não foi integralmente distribuído nas parcelas!',
        {
          variant: 'warning',
        },
      );
    }
  }

  async function submitDadosVenda() {
    const dados = getTodosDados();
    const data = await api.post('/comprastotalfc', {
      ...dados,
    });
    console.log('RETORNO compra TOTAL FC API 22222');
    console.log(data.data);
    console.log('compra');
    console.log(compra);
    return data.data[0];
  }

  async function handleOpenDialogoNota() {
    // console.log(getTodosDados());
    if (!isDadosValidos() || getValorRestante() !== 0) {
      messagesError();
    } else {
      // if (refDialogoNota.current) {
      /* const response = await submitDadosVenda();
      refDialogoNota.current.handleOpen(response, testeConfig, false); */
      const response = await submitDadosVenda();
      closeDialogoNota();
    }
  }

  function handleNewItem(
    valor: number,
    conta: any,
    dataPagamento: Date | null,
  ) {
    /* setItens([
        ...itens,
        {
          dataPagamento,
          tipoPgamento: tipoPagamento,
          valor,
          uidd: `${tipoPagamento.nome}${itens.length}`,
          valorRecebido,
          troco: valorRecebido - valor,
        },
      ]); */
    dispatch({
      type: 'ADD_PARCELA',
      item: {
        dataPagamento,
        conta,
        valor,
        uidd: `${conta.nome}${parcelas.length}`,
      },
    });
  }

  function renameItensUIDD(itens: Array<Row2>) {
    /* const arrayNew = itens.slice();
    for (let i = 0; i < itens.length; i += 1) {
      arrayNew[i].uidd = `${arrayNew[i].tipoPgamento.nome}${i}`;
    }
    return arrayNew; */
  }

  function removeItens(indices: string[]) {
    /* let arrayNew = itens.slice();
    for (let i = 0; i < indices.length; i += 1) {
      arrayNew = arrayNew.filter(function (obj) {
        return obj.uidd !== indices[i];
      });
    }
    const arrayNew2 = renameItensUIDD(arrayNew);
    setItens(arrayNew2); */
    dispatch({ type: 'REMOVE_PARCELA', indices });
  }

  function getValorRestante() {
    let soma = 0;
    for (let i = 0; i < parcelas.length; i += 1) {
      soma += parcelas[i].valor;
    }
    return compra.subTotal - soma;
  }

  function getDataAtual() {
    return moment().format('YYYY-MM-DD');
  }

  function buildObjDate(dateText: string) {
    const ano = parseInt(dateText.substring(0, 4), 10);
    const mes = parseInt(dateText.substring(5, 7), 10);
    const dia = parseInt(dateText.substring(8, 10), 10);
    const dataBuild = new Date();
    dataBuild.setFullYear(ano);
    dataBuild.setMonth(mes - 1);
    dataBuild.setDate(dia);
    return dataBuild;
  }

  /* useEffect(() => {
    async function getDefaults() {
      const dataConfig = await api.get('/config2');
      const dataClientes = await api.get(
        `/clientes/${dataConfig.data.cliente_id}`,
      );
      setCliente(dataClientes.data);
      setClienteDefault(dataClientes.data);
    }
    getDefaults();
  }, []); */

  return (
    <>
      <Box
        padding="20px"
        display="flex"
        margin="20px"
        css={{ backgroundColor: 'white', opacity: '0.75' }}
      >
        <AutoCompleteClientes
          value={fornecedor}
          // onChange={(value) => setCliente(value)}
          onChange={(value) =>
            dispatch({ type: 'UPDATE_FORNECEDOR', fornecedor: value })
          }
          ref={refClientes}
          handleEnter={() => {
            if (refSidebar.current) refSidebar.current.focus();
          }}
          handleF4={() => handleClose()}
          handleF8={() => handleOpenDialogoNota()}
          resource="fornecedores"
          label="Fornecedor"
        />

        <Box marginLeft="20px">
          <TextField
            id="date"
            label="Date da Venda"
            type="date"
            color="secondary"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={refDate}
            defaultValue={getDataAtual()}
            disabled
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        padding="20px"
        flex={1}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          padding="0px 0px"
          height="100%"
        >
          <Box flex={7}>
            <TablePacelas rows={parcelas} removeItens={removeItens} />
          </Box>
          <Box display="flex" flexDirection="column" marginLeft="20px" flex={3}>
            <SidebarTiposPagamentos
              handleNewItem={handleNewItem}
              subTotal={compra.subTotal}
              valorRestante={getValorRestante()}
              ref={refSidebar}
              handleF4={() => handleClose()}
              handleF8={() => handleOpenDialogoNota()}
              focusImprimir={() => {}}
            />
            <LabelSubTotal valor={compra.subTotal} />
            <Paper
              elevation={3}
              style={{
                opacity: '0.75',
                marginTop: '20px',
                borderRadius: '4px',
              }}
            >
              <Box
                padding="20px"
                display="flex"
                justifyContent="space-between"
                borderRadius="4px"
                css={{ backgroundColor: 'white' }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Voltar (F4)
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={
                    getValorRestante() !== 0
                      ? classes.btnImprimir
                      : 'btnImprimir'
                  }
                  onClick={handleOpenDialogoNota}
                  ref={refBtnImprimir}
                >
                  Salvar (F8)
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <DialogoNota
        ref={refDialogoNota}
        handleClose={closeDialogoNota}
        itens={parcelas}
      />
      <KeyboardEventHandler
        handleKeys={['f4', 'f8']}
        onKeyEvent={(key, e) => {
          switch (key) {
            case 'f4':
              handleClose();
              break;
            case 'f8':
              handleOpenDialogoNota();
              break;
            default:
              break;
          }
        }}
      />
    </>
  );
};

export default FinalizarVenda;
