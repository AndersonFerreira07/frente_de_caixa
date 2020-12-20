import React, { FC, useRef, useState, useEffect, useContext } from 'react';

import { Box, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

import Actions from '../../components/ActionsCompra';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import DialogoFinalizarCompra from '../../components/DialogoFinalizarCompra';
import Footer from '../../components/Footer';
import Label from '../../components/Label';
import LabelSubTotal from '../../components/LabelSubtotal';
import Search from '../../components/Search';
import SidebarInputs from '../../components/SidebarInputsCompra';
import Table2, { Row } from '../../components/Table2Compra';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import LabelAtendente from '../../components/LabelAtendente'

import LabelEstoque from '../../components/LabelEstoque';

import DialogoSomaPesos from '../../components/DialogoSomaPesos';
import EmptyBackground from '../../components/EmptyBackground'

import LabelSemAtendente from '../../components/LabelSemAtendente'

import api from '../../services/api'

import { useSnackbar } from 'notistack';

import DialogoSenha from '../../components/DialogoSenha'

//import Ws from '@adonisjs/websocket-client'

import { logout, getUsername, isAuthenticated } from '../../services/alth';

import { useHistory } from 'react-router-dom';

import { getCaixaId } from '../../services/config'

import { VendaContext } from '../Venda'

import{ CompraContext } from '../Compra'

export type FrenteCompraProps = {};

const listaPrecos = [
    {
      value: 10,
    },
    {
      value: 12,
    },
  ];

const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: '10px',
    opacity: '0.75',
  },
  header: {
    height: '17vh',
  },
  body: {
    height: '83vh',
  },
}));
  
//let ws;

const FrenteCompra: FC<FrenteCompraProps> = () => {

  const { compra: { itens }, dispatch } = useContext(CompraContext);

  //const [itens, setItens] = useState<Array<Row>>([]);
  const [tela, setTela] = useState(0);
  const [search, setSearch] = useState('')
  const [modoSearch, setModoSearch] = useState(true)
  const [produto, setProduto] = useState<any>(null)
  const [atendente, setAtendente] = useState('')
  const [contAux, setContAux] = useState(0)
  const [editPrice, setEditPrice] = useState(false)
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  type CountdownHandle = React.ElementRef<typeof DialogoConfirmacao>;
  const componentRef = useRef<CountdownHandle>(null);

  type CountdownHandle2 = React.ElementRef<typeof DialogoFinalizarCompra>;
  const componentRef2 = useRef<CountdownHandle2>(null);

  type CountdownHandle3 = React.ElementRef<typeof DialogoSomaPesos>;
  const componentRef3 = useRef<CountdownHandle3>(null);

  type CountdownHandle4 = React.ElementRef<typeof SidebarInputs>;
  const componentRef4 = useRef<CountdownHandle4>(null);

  type CountdownHandle5 = React.ElementRef<typeof DialogoSenha>;
  const componentRef5 = useRef<CountdownHandle5>(null);

  const refSearch = useRef<any>(null);

  const refBtCallGerente = useRef<any>(null);

  const classes = useStyles()

  const nomeProduto = produto !== null ? produto.nome : 'Nenhum Produto';

  function irParaTelaInit() {
    history.push('/');
  }

  function irParaTelaFinalizarCompra() {
    history.push('/compras/finalizarcompra');
  }

  function handleSoma(unidades: number, peso: number) {
    if (componentRef4.current)
      componentRef4.current.setValues(unidades, peso)
  }

  function compareDates(date1, date2) {
    if(date1.getFullYear() === date2.getFullYear()) {
      if(date1.getMonth() === date2.getMonth()) {
        if(date1.getDate() === date2.getDate()) {
          return true
        }
      }
    }
    return false
  }

  function searchItemInArray(produto, precoUnitario, itens, validade) {
    for(let i = 0; i < itens.length; i++) {
      if(produto.id === itens[i].produto.id && precoUnitario === itens[i].unitario /* && compareDates(validade, itens[i].validade) */)  return i
    }
    return -1
  }

  function searchItemInArray2(produto, itens) {
    for(let i = 0; i < itens.length; i++) {
      if(produto.id === itens[i].produto.id) return i
    }
    return -1
  }

  function getTotal(peso, unidades, precoUnitario, produto) {
    if(produto.unidade.modo === 2) {
      return unidades * precoUnitario
    } else {
      return peso * precoUnitario
    }
  }

  function addNewItem(
    quantidade: number,
    peso: number,
    precoUnitario: number,
    validade: Date | null,
  ) {
    const position = searchItemInArray(produto, precoUnitario, itens, validade);
    console.log('position')
    console.log(position)
    if(position < 0 ) {
      
      dispatch({ type: "ADD_ITEM", item: {
        produto: produto,
        peso: produto.unidade.modo === 2 ? 0 : peso,
        total: getTotal(peso, quantidade, precoUnitario, produto),
        unidades: quantidade,
        unitario: precoUnitario,
        //uidd: `${produto.nome}${precoUnitario}`,
        uidd: `${produto.nome}${itens.length}`,
        validade
      } });
    } else {  
      
      /* const itens2 = itens.slice()
      dispatch({ type: "UPDATE_ITEM", item: {
        peso: (itens2[position].peso + (produto.unidade.modo === 2 ? 0 : peso)),
        unidades: itens2[position].unidades + quantidade,
        produto: produto,
        unitario: precoUnitario,
        total: getTotal(itens2[position].peso + peso, itens2[position].unidades + quantidade, precoUnitario, produto),
        uidd: `${produto.nome}${precoUnitario}`
      }, position: position}) */

      dispatch({ type: "ADD_ITEM", item: {
        produto: produto,
        peso: produto.unidade.modo === 2 ? 0 : peso,
        total: getTotal(peso, quantidade, precoUnitario, produto),
        unidades: quantidade,
        unitario: precoUnitario,
        //uidd: `${produto.nome}${precoUnitario}`,
        uidd: `${produto.nome}${itens.length}`,
        validade
      } });
    }
    setProduto(null)
    if(refSearch.current) refSearch.current.focus()
    setEditPrice(false)
  }

  function getOpen() {
    if (componentRef3.current)
      return componentRef3.current.getOpen();
    return false
  }

  function getSubTotal() {
    let soma = 0
    for(let i = 0; i< itens.length; i++) {
      soma += itens[i].total
    }
    return soma
  }

  function removeItens (indices: string[]) {
    /* let arrayNew = itens.slice()
    for (let i = 0; i < indices.length; i++) {
      arrayNew = arrayNew.filter(function( obj ) {
        return obj.uidd !== indices[i];
    });
    setItens(arrayNew)
    } */
    dispatch({ type: "REMOVE_ITEM", indices})
  }

  function getDisabled() {
    if(tela === 1) {
      return [false, true, true]
    } else {
      return [true, false, false]
    }
  }

  function handleFinalizaCompra() {
    // setTela(1)
    irParaTelaInit()
    //setItens([])
    setProduto(null)
  }

  async function getPrecoMedio(id) {
    const dataPreco = await api.get(`/produtos/precomedio/${id}`);
    return dataPreco.data.precomedio;
  }

  async function searchHandle() {
    const data = await api.get(`/produtos2/${search}`)
    console.log(data.data)
    if(data.data.length > 0) {
      const index = searchItemInArray2(data.data[0], itens);
      if(index >= 0) {
        data.data[0].unidadesDisponivel = data.data[0].unidadesDisponivel + itens[index].unidades
      }
      data.data[0].precoMedio = data.data[0].precoCompraMedio;
      data.data[0].valorVenda = data.data[0].precoVenda
      setProduto(data.data[0]);
      if (componentRef4.current)
        componentRef4.current.focus();
    } else {
      setProduto(null);
    }
    setSearch('');
    /* setItens([]) */
    if (componentRef4.current)
      componentRef4.current.reset();
    setContAux(contAux + 1)
    setEditPrice(false)
  }


  async function searchHandle2(codigo) {
    if(codigo === '') return undefined
    const data = await api.get(`/produtos2/${codigo}`)
    console.log(data.data)
    if(data.data.length > 0) {
      const index = searchItemInArray2(data.data[0], itens);
      if(index >= 0) {
        data.data[0].unidadesDisponivel = data.data[0].unidadesDisponivel + itens[index].unidades
      }
      //data.data[0].precoMedio = await getPrecoMedio(data.data[0].id)
      //data.data[0].valorVenda = data.data[0].precoMedio === 0 ? 0 : data.data[0].precoMedio + data.data[0].lucrovarejo;
      data.data[0].precoMedio = data.data[0].precoCompraMedio;
      data.data[0].valorVenda = data.data[0].precoVenda
      setProduto(data.data[0]);
      if (componentRef4.current)
        componentRef4.current.focus();
    } else {
      setProduto(null);
    }
    setSearch('');
    /* setItens([]) */
    if (componentRef4.current)
      componentRef4.current.reset();
    setContAux(contAux + 1)
    setEditPrice(false)
  }


  async function getAtendente() {
    /* const configs = await api.get('/config2')
    if(configs.data.caixa_id !== -1) {
      const caixa = await api.get(`/caixas/${configs.data.caixa_id}`)
      const user = await api.get(`/adms/${caixa.data.user_id}`)
      setAtendente(user.data.username)
    } else {
      setAtendente('')
    } */
    const username = getUsername()
    setAtendente(username ? username : '')
  }

  function disablePeso() {
    if (produto) {
      if (produto.unidade.modo === 2 || produto.unidade.modo === 1)
        return true;
      return false;
    }
    return true;
  }

  function getUnidadesDisponiveis() {
    if(produto) {
      return produto.unidadesDisponivel
    }
    return 0
  }

  useEffect(() => {
    getAtendente()
  }, [])

  async function handleSenhaAutorizacao(senha: string) {
    const dataConfig = await api.get('/config2')
    if(senha === dataConfig.data.senha) {
      setEditPrice(true)
    } else {
      enqueueSnackbar('Senha incorreta!', { 
        variant: 'error',
    });
    }
  }

 /*  useEffect(() => {
    ws = Ws(process.env.REACT_APP_HOST_WS)
    ws.connect()
    ws.on('open', () => {
      ws.subscribe('gerente')
    })
    return () => ws.close();
  }, [])

  async function callGerente() {
    const data = await api.get(`/caixasfisicos/${getCaixaId()}`)
    ws.getSubscription('gerente').emit('notificaGerente', {
      nomeCaixa: data.data.nome,
    });
    enqueueSnackbar('O gerente foi notificado, e já deve estar a caminho!', { 
      variant: 'info',
  });
  } */

  function handleConfirma(codigo: number) {
    switch (codigo) {
      case 1:
        handleFinalizaCompra()
        break;
      case 2:
        logout();
        history.push('/login');
        break;
      default:
        break;
    }
  }

  return (
    <>
      { tela === 0 && atendente !== '' ? <Box padding="10px" className={classes.header}>
        <Box margin="0px 0px 10px">
          <Label label={nomeProduto} />
        </Box>
        <Search
          label="Pesquisar produto"
          value={search}
          onChange={(e) => setSearch(e)}
          fullwidth
          disabled={false}
          searchHandle={searchHandle}
          searchHandle2={searchHandle2}
          ref={refSearch}
          handleF4={(code) => {
            switch (code) {
              case 115:
                // if (componentRef2.current)
                  if(itens.length > 0) {
                    // componentRef2.current.handleOpen();
                    irParaTelaFinalizarCompra()
                  } else {
                    enqueueSnackbar('É necessário ao menos um item na compra!', { 
                      variant: 'warning',
                  });
                  }

                break;
              case 119:
                if (componentRef.current)
                  componentRef.current.handleOpen(
                    'Cancelar Compra',
                'Tem certeza que deseja cancelar o cadastro desta compra ', 1
                  );
                break;
                case 45:
                  if (refBtCallGerente.current) {
                    refBtCallGerente.current.click()
                    enqueueSnackbar('O gerente foi notificado, e já deve estar a caminho!', { 
                      variant: 'info',
                  });
                  }
                  break;
                case 46:
                  if (componentRef.current)
                    componentRef.current.handleOpen('Logout', 'Tem certeza que deseja deslogar!', 2)
                break;
              /* case 120:
                if (componentRef3.current && produto !== null)
                  if(produto.unidade.modo === 0)
                    componentRef3.current.handleOpen(0, 0, getUnidadesDisponiveis());
                break; */
              default:
                break;

          }}}
        />
      </Box> : <Box margin="10px"/>}
      <Box display="flex" justifyContent="space-between" padding="10px" className={classes.body}>
        {tela === 0 && atendente !== '' ? <Box flex={1.5} display="flex"
          flexDirection="column" overflow="auto"
          >
          <Actions
            disabled={getDisabled()}
            produto={produto}
            editPrice={editPrice}
            onClick={(action) => {
              switch (action) {
                case 0:
                  /* if (componentRef2.current)
                    componentRef2.current.handleOpen(); */
                  // if(tela === 1) setTela(0) 
                  setTela(0) 
                  break;
                case 1:
                  // if (componentRef2.current)
                    if(itens.length > 0) {
                      // componentRef2.current.handleOpen();
                      irParaTelaFinalizarCompra()
                    } else {
                      enqueueSnackbar('É necessário ao menos um item na compra!', { 
                        variant: 'warning',
                    });
                    }
                  break;
                case 2:
                  if (componentRef.current)
                    componentRef.current.handleOpen('Excluir Item', 'Tem certeza que deseja excluir este item', 1);
                  break;
                case 3:
                  if (componentRef.current)
                    componentRef.current.handleOpen(
                      'Cancelar Compra',
                  'Tem certeza que deseja cancelar o cadastro desta compra ', 1
                    );
                  break;
                /* case 5:
                  if (componentRef3.current && produto !== null)
                    if(produto.unidade.modo === 0)
                      componentRef3.current.handleOpen(0, 0, getUnidadesDisponiveis());
                  break; */
                /* case 6:
                  if (componentRef5.current)
                  componentRef5.current.handleOpen()
                  break; */
                case 7:
                  if (componentRef.current)
                  componentRef.current.handleOpen('Logout', 'Tem certeza que deseja deslogar!', 2)
                  break;
                default:
                  break;
              }
            }}
          />
          <LabelAtendente atendente={atendente}/>
          {(produto !== null && atendente !== '') && <LabelEstoque produto={produto}/>}
          {/* <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => {
              callGerente()
            }}
            style={{ padding: '20px' }}
            ref={refBtCallGerente}
          >
            Chamar Gerente (Ins)
          </Button> */}
        </Box> : null}
        {(tela === 0 && atendente !== '') && <Box padding="0 10px" flex={4}>
          <Table2 rows={itens} removeItens={removeItens} produto={produto}/>
        </Box>}
        {(tela === 0 && atendente !== '') && <Box 
          flex={2}
          display="flex"
          flexDirection="column"
          /* justifyContent="space-between" */
        >
          <SidebarInputs 
            handleNewItem={addNewItem} 
            ref={componentRef4} 
            disabled={produto === null} 
            produto={produto} 
            listaPrecos={listaPrecos} 
            cont={contAux}
            handleF9={() => {
              /* if (componentRef3.current && produto !== null)
                if(produto.unidade.modo === 0)
                  componentRef3.current.handleOpen(0, 0, getUnidadesDisponiveis()); */
            }}
            handleF10={() => {
              /* if (componentRef5.current)
                  componentRef5.current.handleOpen() */
            }}
            handleF4={() => {
              // if (componentRef2.current) {
                if(itens.length > 0) {
                  irParaTelaFinalizarCompra()
                  // componentRef2.current.handleOpen();
                } else {
                  enqueueSnackbar('É necessário ao menos um item na compra!', { 
                    variant: 'warning',
                });
                }
              // }
            }}
            handleF8={() => {
              if (componentRef.current)
                componentRef.current.handleOpen(
                  'Cancelar Compra',
                  'Tem certeza que deseja cancelar o cadastro desta compra ',
                  1
                );
            }}
            editPrice={true}
          />
          <LabelSubTotal valor={getSubTotal()} />
        </Box>}
        
        {(tela === 0 && atendente !== '' && !disablePeso()) && <DialogoSomaPesos ref={componentRef3} handleSoma={handleSoma}/>}
        
        {(tela === 1 && atendente !== '') && <Box flex={6}>
          <div style={{ height: '100% '}}>  
            <EmptyBackground/>
          </div>
        </Box>}
      </Box>
      {(tela === 1) && <Box margin="10px">
        { atendente !== '' && tela === 1 ? <Footer tela={tela} disabledPartes={disablePeso()}/> : tela === 1 ? <LabelSemAtendente/> : null}
      </Box>}
      <DialogoConfirmacao ref={componentRef} handleConfirma={handleConfirma}/>
      {tela === 0 && <DialogoFinalizarCompra ref={componentRef2} handleConfirma={handleFinalizaCompra} lista={itens} subTotal={getSubTotal()}/>}
      {tela === 0 && <DialogoSenha ref={componentRef5} handleClose={handleSenhaAutorizacao}/>}
      { atendente !== '' && <KeyboardEventHandler
        handleKeys={['f2', 'f4', 'f7', 'f8', 'f9', 'f10', 'delete', 'insert']}
        onKeyEvent={(key, e) => {
          switch (key) {
            case 'f2':
              /* if (componentRef2.current)
                componentRef2.current.handleOpen(); */
                if(tela === 1) setTela(0) 
              break;
            case 'f4':
              // if (componentRef2.current) {
                if(itens.length > 0) {
                  irParaTelaFinalizarCompra()
                  // componentRef2.current.handleOpen();
                } else {
                  enqueueSnackbar('É necessário ao menos um item na compra!', { 
                    variant: 'warning',
                });
                }
              // }
              break;
            /* case 'f7':
              if (componentRef.current)
                componentRef.current.handleOpen('Excluir Item', 'Tem certeza que deseja excluir este item');
              break; */
            case 'f8':
              if (componentRef.current && tela === 0)
                componentRef.current.handleOpen(
                  'Cancelar Compra',
                  'Tem certeza que deseja cancelar o cadastro desta compra ',
                  1
                );
              break;  
            /* case 'f9':
              if (componentRef3.current && produto !== null)
                if(produto.unidade.modo === 0)
                  componentRef3.current.handleOpen(0, 0, getUnidadesDisponiveis());
              break; */
            /* case 'f10':
              if (componentRef5.current && produto !== null)
                componentRef5.current.handleOpen()
              break; */
            case 'delete':
              if (componentRef.current)
                componentRef.current.handleOpen('Logout', 'Tem certeza que deseja deslogar!', 2)
              break;
            /* case 'insert':
              if (refBtCallGerente.current)
                refBtCallGerente.current.click()
              break; */
            default:
              break;
          }
        }} 
    />}
    </>
  );
};

export default FrenteCompra;
