import React, { FC, useRef, useState } from 'react';

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

import DialogoSomaPesos from '../../components/DialogoSomaPesos';
import EmptyBackground from '../../components/EmptyBackground'

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

const Frente: FC<FrenteProps> = () => {

  const [itens, setItens] = useState<Array<Row>>([]);
  const [tela, setTela] = useState(1);

  type CountdownHandle = React.ElementRef<typeof DialogoConfirmacao>;
  const componentRef = useRef<CountdownHandle>(null);

  type CountdownHandle2 = React.ElementRef<typeof DialogoFinalizarCompra>;
  const componentRef2 = useRef<CountdownHandle2>(null);

  type CountdownHandle3 = React.ElementRef<typeof DialogoSomaPesos>;
  const componentRef3 = useRef<CountdownHandle3>(null);

  type CountdownHandle4 = React.ElementRef<typeof SidebarInputs>;
  const componentRef4 = useRef<CountdownHandle4>(null);

  function handleSoma(unidades: number, peso: number) {
    if (componentRef4.current)
      componentRef4.current.setValues(unidades, peso)
  }

  function addNewItem(
    quantidade: number,
    peso: number,
    precoUnitario: number,
  ) {
    setItens([...itens, {
      produto: `kkkkkk${quantidade}`,
      peso,
      total: peso * precoUnitario,
      unidades: quantidade,
      unitario: precoUnitario
    }])
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
        return obj.produto !== indices[i];
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

  console.log('OPEN SOMA PESOS: ' + getOpen())

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
      { tela === 0 ? <Box margin="10px">
        <Box margin="0px 0px 10px">
          <Label label="Queijo Mussarela" />
        </Box>
        <Search
          label="Código de barra"
          value="ola"
          onChange={() => console.log('ola')}
          fullwidth
          disabled={false}
        />
      </Box> : <Box margin="10px"/>}
      <Box display="flex" justifyContent="space-between" padding="10px">
        {tela === 0 ? <Box flex={1.5} display="flex"
          flexDirection="column"
          justifyContent="space-between">
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
                    componentRef2.current.handleOpen();
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
        </Box> : null}
        {tela === 0 && <Box padding="0 10px" flex={4}>
          <Table2 rows={itens} removeItens={removeItens}/>
        </Box>}
        {tela === 0 && <Box
          flex={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <SidebarInputs handleNewItem={addNewItem} ref={componentRef4}/>
          <LabelSubTotal valor={getSubTotal()} />
        </Box>}
        
        {tela === 0 && <DialogoSomaPesos ref={componentRef3} handleSoma={handleSoma}/>}
        
        {tela === 1 && <Box flex={6}>
          <div style={{ height: '100% '}}>  
            <EmptyBackground/>
          </div>
        </Box>}
      </Box>
      <Box margin="10px">
        <Footer tela={tela}/>
      </Box>
      <DialogoConfirmacao ref={componentRef} handleConfirma={handleFinalizaVenda}/>
      <DialogoFinalizarCompra ref={componentRef2} handleConfirma={handleFinalizaVenda} lista={itens} subTotal={getSubTotal()}/>
      <KeyboardEventHandler
        handleKeys={['f2', 'f4', 'f7', 'f8', 'f9']}
        onKeyEvent={(key, e) => {
          switch (key) {
            case 'f2':
              /* if (componentRef2.current)
                componentRef2.current.handleOpen(); */
                if(tela === 1) setTela(0) 
              break;
            case 'f4':
              if (componentRef2.current)
                componentRef2.current.handleOpen();
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
              if (componentRef3.current)
                componentRef3.current.handleOpen(0, 0, 100);
              break;
            default:
              break;
          }
        }} 
    />
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
