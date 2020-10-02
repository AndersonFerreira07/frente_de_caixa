import React, { FC, useRef, useState, useEffect } from 'react';

import { Box } from '@material-ui/core';

import Actions from '../../components/Actions';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import DialogoFinalizarCompra from '../../components/DialogoFinalizarCompra';
import Footer from '../../components/Footer';
import Label from '../../components/Label';
import LabelSubTotal from '../../components/LabelSubtotal';
import Search from '../../components/Search';
import SidebarInputs from '../../components/SidebarInputs';
import Table2, { Row } from '../../components/Table2';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import LabelAtendente from '../../components/LabelAtendente'

import LabelEstoque from '../../components/LabelEstoque';

import DialogoSomaPesos from '../../components/DialogoSomaPesos';
import EmptyBackground from '../../components/EmptyBackground'

import LabelSemAtendente from '../../components/LabelSemAtendente'

import api from '../../services/api'

import { SnackbarProvider, useSnackbar } from 'notistack';

export type FrenteProps = {};

const lista = [
  {
    produto: 'Mussarela',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
  },
  {
    produto: 'Mussarela',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
  },
  {
    produto: 'Mussarela',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
  },
  
];

const listaPrecos = [
    {
      value: 10,
    },
    {
      value: 12,
    },
  ];

const Frente: FC<FrenteProps> = () => {

  const [itens, setItens] = useState<Array<Row>>([]);
  const [tela, setTela] = useState(1);
  const [search, setSearch] = useState('')
  const [modoSearch, setModoSearch] = useState(true)
  const [produto, setProduto] = useState<any>(null)
  const [atendente, setAtendente] = useState('')
  const [contAux, setContAux] = useState(0)

  const { enqueueSnackbar } = useSnackbar();

  type CountdownHandle = React.ElementRef<typeof DialogoConfirmacao>;
  const componentRef = useRef<CountdownHandle>(null);

  type CountdownHandle2 = React.ElementRef<typeof DialogoFinalizarCompra>;
  const componentRef2 = useRef<CountdownHandle2>(null);

  type CountdownHandle3 = React.ElementRef<typeof DialogoSomaPesos>;
  const componentRef3 = useRef<CountdownHandle3>(null);

  type CountdownHandle4 = React.ElementRef<typeof SidebarInputs>;
  const componentRef4 = useRef<CountdownHandle4>(null);

  const nomeProduto = produto !== null ? produto.nome : 'Nenhum Produto';

  function handleSoma(unidades: number, peso: number) {
    if (componentRef4.current)
      componentRef4.current.setValues(unidades, peso)
  }

  function searchItemInArray(produto, itens) {
    for(let i = 0; i < itens.length; i++) {
      if(produto.id === itens[i].produto.id) return i
    }
    return -1
  }

  function getTotal(peso, unidades, precoUnitario, produto) {
    if(produto.unidade.modo === 0) {
      return peso * precoUnitario
    } else {
      return unidades * precoUnitario
    }
  }

  function addNewItem(
    quantidade: number,
    peso: number,
    precoUnitario: number,
    obs: string
  ) {
    const position = searchItemInArray(produto, itens);
    console.log('position')
    console.log(position)
    if(position < 0) {
      setItens([...itens, {
        produto: produto,
        peso,
        total: getTotal(peso, quantidade, precoUnitario, produto),
        unidades: quantidade,
        unitario: precoUnitario,
        obs: obs
      }])
    } else {  
      const itens2 = itens.slice()
      itens2[position] = {
        peso: itens2[position].peso + peso,
        unidades: itens2[position].unidades + quantidade,
        produto: produto,
        unitario: precoUnitario,
        total: getTotal(itens2[position].peso + peso, itens2[position].unidades + quantidade, precoUnitario, produto),
        obs: obs
      }
      setItens(itens2)
    }
    setProduto(null)
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
    //console.log(indices)
    let arrayNew = itens.slice()
    for (let i = 0; i < indices.length; i++) {
      arrayNew = arrayNew.filter(function( obj ) {
        return obj.produto.nome !== indices[i];
    });
    setItens(arrayNew)
    }
  }

  function getDisabled() {
    if(tela === 1) {
      return [false, true, true]
    } else {
      return [true, false, false]
    }
  }

  function handleFinalizaVenda() {
    setTela(1)
    setItens([])
  }

  async function searchHandle() {
    const data = await api.get(`/produtos2/${search}`)
    console.log(data.data)
    if(data.data.length > 0) {
      const index = searchItemInArray(data.data[0], itens);
      if(index >= 0) {
        data.data[0].unidadesDisponivel = data.data[0].unidadesDisponivel - itens[index].unidades
      }
      setProduto(data.data[0]);
    } else {
      setProduto(null);
    }
    setSearch('');
    /* setItens([]) */
    if (componentRef4.current)
      componentRef4.current.reset();
    setContAux(contAux + 1)
  }

  async function getAtendente() {
    const configs = await api.get('/config2')
    if(configs.data.caixa_id !== -1) {
      const caixa = await api.get(`/caixas/${configs.data.caixa_id}`)
      const user = await api.get(`/adms/${caixa.data.user_id}`)
      setAtendente(user.data.username)
    } else {
      setAtendente('')
    }
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

  console.log('OPEN SOMA PESOS: ' + getOpen())
  console.log('itens kkkk')
  console.log(itens)

  return (
    <Box
      bgcolor="#FFCFF9"
      padding="10px"
      height="100%"
      display="grid"
      gridTemplateColumns="1fr"
      gridTemplateRows="1fr 10fr 1fr"
      css={{ background: 'url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg)', backgroundSize: 'cover' }}
      // css={{ background: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/221808/sky.jpg)', backgroundSize: 'cover' }}
    >
      { tela === 0 && atendente !== '' ? <Box margin="10px">
        <Box margin="0px 0px 10px">
          <Label label={nomeProduto} />
        </Box>
        <Search
          label="Código de barra"
          value={search}
          onChange={(e) => setSearch(e)}
          fullwidth
          disabled={false}
          searchHandle={searchHandle}
        />
      </Box> : <Box margin="10px"/>}
      <Box display="flex" justifyContent="space-between" padding="10px">
        {tela === 0 && atendente !== '' ? <Box flex={1.5} display="flex"
          flexDirection="column"
          >
          <Actions
            disabled={getDisabled()}
            onClick={(action) => {
              switch (action) {
                case 0:
                  /* if (componentRef2.current)
                    componentRef2.current.handleOpen(); */
                  // if(tela === 1) setTela(0) 
                  setTela(0) 
                  break;
                case 1:
                  if (componentRef2.current)
                    if(itens.length > 0) {
                      componentRef2.current.handleOpen();
                    } else {
                      enqueueSnackbar('É necessário ao menos um item na venda!');
                    }
                  break;
                case 2:
                  if (componentRef.current)
                    componentRef.current.handleOpen('Excluir Item', 'Tem certeza que deseja excluir este item');
                  break;
                case 3:
                  if (componentRef.current)
                    componentRef.current.handleOpen(
                      'Cancelar Venda',
                  'Tem certeza que deseja cancelar o cadastro desta venda ',
                    );
                  break;
                default:
                  break;
              }
            }}
          />
          <LabelAtendente atendente={atendente}/>
          {(produto !== null && atendente !== '') && <LabelEstoque produto={produto}/>}
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
          <SidebarInputs handleNewItem={addNewItem} ref={componentRef4} disabled={produto === null} produto={produto} listaPrecos={listaPrecos} cont={contAux}/>
          <LabelSubTotal valor={getSubTotal()} />
        </Box>}
        
        {(tela === 0 && atendente !== '' && !disablePeso()) && <DialogoSomaPesos ref={componentRef3} handleSoma={handleSoma}/>}
        
        {(tela === 1 && atendente !== '') && <Box flex={6}>
          <div style={{ height: '100% '}}>  
            <EmptyBackground/>
          </div>
        </Box>}
      </Box>
      <Box margin="10px">
        { atendente !== '' ? <Footer tela={tela} disabledPartes={disablePeso()}/> : <LabelSemAtendente/>}
      </Box>
      {tela === 0 && <DialogoConfirmacao ref={componentRef} handleConfirma={handleFinalizaVenda}/>}
      {tela === 0 && <DialogoFinalizarCompra ref={componentRef2} handleConfirma={handleFinalizaVenda} lista={itens} subTotal={getSubTotal()}/>}
      { atendente !== '' && <KeyboardEventHandler
        handleKeys={['f2', 'f4', 'f7', 'f8', 'f9']}
        onKeyEvent={(key, e) => {
          switch (key) {
            case 'f2':
              /* if (componentRef2.current)
                componentRef2.current.handleOpen(); */
                if(tela === 1) setTela(0) 
              break;
            case 'f4':
              if (componentRef2.current) {
                if(itens.length > 0) {
                  componentRef2.current.handleOpen();
                } else {
                  enqueueSnackbar('É necessário ao menos um item na venda!');
                }
              }
              break;
            case 'f7':
              if (componentRef.current)
                componentRef.current.handleOpen('Excluir Item', 'Tem certeza que deseja excluir este item');
              break;
            case 'f8':
              if (componentRef.current)
                componentRef.current.handleOpen(
                  'Cancelar Venda',
                  'Tem certeza que deseja cancelar o cadastro desta venda ',
                );
              break;
            case 'f9':
              if (componentRef3.current && produto !== null)
                  if(produto.unidade.modo === 0)
                    componentRef3.current.handleOpen(0, 0, getUnidadesDisponiveis());
              break;
            default:
              break;
          }
        }} 
    />}
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>

      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
      <div className="firefly"/>
    </Box>
  );
};

export default Frente;
