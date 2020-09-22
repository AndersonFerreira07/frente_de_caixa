import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
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
};

export type SidebarInputsHandle = {
  setValues: (unidadesNew: number, pesoNew: number) => void;
};

const SidebarInputs: RefForwardingComponent<
  SidebarInputsHandle,
  SidebarInputsProps
> = ({ handleNewItem }, ref) => {
  const [unidades, setUnidades] = useState(0);
  const [peso, setPeso] = useState(0);
  const [precoUnitario, setPresoUnitario] = useState(0);
  const [precoTotal, setPrecoTotal] = useState(0);

  useImperativeHandle(ref, () => ({
    setValues(unidadesNew: number, pesoNew: number) {
      setUnidades(unidadesNew);
      setPeso(pesoNew);
    },
  }));

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
        />
        <PesoInput
          label="Peso"
          value={peso}
          onChange={(value: number) => setPeso(value)}
          fullwidth={false}
          disabled={false}
        />
        <PrecoInput
          label="Preço Unitário"
          value={precoUnitario}
          onChange={(value: number) => setPresoUnitario(value)}
          fullwidth={false}
          disabled={false}
        />
        <PrecoInput
          label="Preço Total"
          value={precoTotal}
          onChange={(value: number) => setPrecoTotal(value)}
          fullwidth={false}
          disabled
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleNewItem(unidades, peso, precoUnitario);
            setPeso(0);
            setPrecoTotal(0);
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
