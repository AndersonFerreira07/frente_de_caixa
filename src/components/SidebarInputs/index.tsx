import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useEffect,
} from 'react';

import { Box, Button, Paper } from '@material-ui/core';

import IntegerInput from '../IntegerInput';
import PesoInput from '../PesoInput';
import PrecoInput from '../PrecoInput';

export type SidebarInputsProps = {
  handleNewItem: (
    quantidade: number,
    peso: number,
    precoUnitario: number,
  ) => void;
  disabled: boolean;
  produto: any;
};

export type SidebarInputsHandle = {
  setValues: (unidadesNew: number, pesoNew: number) => void;
  reset: () => void;
};

const SidebarInputs: RefForwardingComponent<
  SidebarInputsHandle,
  SidebarInputsProps
> = ({ handleNewItem, disabled, produto }, ref) => {
  const [unidades, setUnidades] = useState(0);
  const [peso, setPeso] = useState(0);
  const [precoUnitario, setPresoUnitario] = useState(0);
  /* const [precoTotal, setPrecoTotal] = useState(0); */

  useImperativeHandle(ref, () => ({
    setValues(unidadesNew: number, pesoNew: number) {
      setUnidades(unidadesNew);
      setPeso(pesoNew);
    },
    reset() {
      setPeso(0);
      setUnidades(0);
      setPresoUnitario(0);
    },
  }));

  function calculaPrecoTotal() {
    if (produto) {
      if (produto.unidade.modo === 2) {
        return unidades * precoUnitario;
      }
      return peso * precoUnitario;
    }
    return 0;
  }

  function disablePeso() {
    if (produto) {
      if (produto.unidade.modo === 2 || produto.unidade.modo === 1)
        return false;
      return true;
    }
    return true;
  }

  function showPeso() {
    if (produto) {
      if (produto.unidade.modo === 2) return false;
      return true;
    }
    return true;
  }

  useEffect(() => {
    if (produto) {
      if (produto.unidade.modo === 1) {
        setPeso(produto.pesomedio * unidades);
      }
    }
  }, [unidades]);

  function isError(unidades, produto) {
    if (produto) {
      return unidades > produto.unidadesDisponivel;
    }
    return false;
  }

  function dadosAusentes() {
    if (unidades <= 0 || isNaN(unidades)) {
      return true;
    }
    return false;
  }

  return (
    <Paper elevation={3} style={{ opacity: '0.75' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="15px"
        // bgcolor="red"
      >
        <IntegerInput
          label="Quantidade"
          value={unidades}
          onChange={(value: number) => setUnidades(value)}
          fullwidth={false}
          disabled={disabled}
          error={isError(unidades, produto)}
          helperText={
            isError(unidades, produto) ? 'Unidades acima do disponível' : ''
          }
        />
        {showPeso() && (
          <PesoInput
            label="Peso"
            value={peso}
            onChange={(value: number) => setPeso(value)}
            fullwidth={false}
            disabled={disabled || !disablePeso()}
          />
        )}
        <PrecoInput
          label="Preço Unitário"
          value={precoUnitario}
          onChange={(value: number) => setPresoUnitario(value)}
          fullwidth={false}
          disabled={disabled}
        />
        <PrecoInput
          label="Preço Total"
          value={calculaPrecoTotal()}
          onChange={(value: number) => console.log(value)}
          fullwidth={false}
          disabled
          /* error
          helperText="Incorrect entry." */
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={disabled || isError(unidades, produto) || dadosAusentes()}
          onClick={() => {
            handleNewItem(unidades, peso, precoUnitario);
            setPeso(0);
            /* setPrecoTotal(0); */
            setPresoUnitario(0);
            setUnidades(0);
          }}
        >
          Adicionar à lista
        </Button>
      </Box>
    </Paper>
  );
};

export default forwardRef(SidebarInputs);
