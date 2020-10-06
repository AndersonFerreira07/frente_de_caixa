import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useEffect,
  useRef,
} from 'react';

import { Box, Button, Paper, TextField } from '@material-ui/core';

import IntegerInput from '../IntegerInput';
import PesoInput from '../PesoInput';
import PrecoInput from '../PrecoInput';
import SelectInput from '../Select';

export type SidebarInputsProps = {
  handleNewItem: (
    quantidade: number,
    peso: number,
    precoUnitario: number,
    // obs: string,
  ) => void;
  disabled: boolean;
  produto: any;
  listaPrecos: any;
  cont: number;
  handleF9: () => void;
};

export type SidebarInputsHandle = {
  setValues: (unidadesNew: number, pesoNew: number) => void;
  reset: () => void;
  focus: () => void;
};

const SidebarInputs: RefForwardingComponent<
  SidebarInputsHandle,
  SidebarInputsProps
> = (
  { handleNewItem, disabled, produto, listaPrecos, cont, handleF9 },
  ref,
) => {
  const [unidades, setUnidades] = useState(0);
  const [peso, setPeso] = useState(0);
  const [precoUnitario, setPresoUnitario] = useState(0);
  // const [obs, setObs] = useState('');
  /* const [precoTotal, setPrecoTotal] = useState(0); */
  const refQtde = useRef<any>(null);
  const refPeso = useRef<any>(null);
  const refPreco = useRef<any>(null);
  const refButton = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    setValues(unidadesNew: number, pesoNew: number) {
      setUnidades(unidadesNew);
      setPeso(pesoNew);
      if (refPreco.current) {
        refPreco.current.focus();
        refPreco.current.select();
      }
    },
    reset() {
      setPeso(0);
      setUnidades(0);
      setPresoUnitario(0);
    },
    focus() {
      if (refQtde.current) {
        refQtde.current.focus();
        refQtde.current.select();
      }
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

  function conditionShowPeso() {
    if (produto) {
      if (produto.unidade.modo === 0) return true;
      return false;
    }
    return false;
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
    if (produto) {
      if (produto.unidade.modo !== 2 && (peso <= 0 || isNaN(peso))) return true;
    }
    return false;
  }

  /* const listaPrecos = [
    {
      value: 10,
    },
    {
      value: 12,
    },
  ]; */

  useEffect(() => {
    // setPresoUnitario(listaPrecos[0].value);
  }, [cont]);

  console.log('QUNARIDADE KKKKK');
  console.log(unidades);

  return (
    <Paper elevation={3} style={{ opacity: '0.75' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="15px"
        overflow="auto"
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
          ref={refQtde}
          handleEnter={() => {
            if (conditionShowPeso()) {
              if (refPeso.current) {
                refPeso.current.focus();
                refPeso.current.select();
              }
            } else if (refPreco.current) {
              refPreco.current.focus();
              refPreco.current.select();
            }
          }}
          handleF9={() => handleF9()}
          handleDirection={(direction) => {
            if (direction === 40) {
              if (conditionShowPeso()) {
                if (refPeso.current) {
                  refPeso.current.focus();
                  refPeso.current.select();
                }
              } else if (refPreco.current) {
                refPreco.current.focus();
                refPreco.current.select();
              }
            } else if (direction === 38) {
              if (refPreco.current) {
                refPreco.current.focus();
                refPreco.current.select();
              }
            }
          }}
        />
        {showPeso() && (
          <PesoInput
            label="Peso"
            value={peso}
            onChange={(value: number) => setPeso(value)}
            fullwidth={false}
            disabled={disabled || !disablePeso()}
            ref={refPeso}
            handleEnter={() => {
              if (refPreco.current) {
                refPreco.current.focus();
                refPreco.current.select();
              }
            }}
            handleF9={() => handleF9()}
            handleDirection={(direction) => {
              if (direction === 40) {
                if (refPreco.current) {
                  refPreco.current.focus();
                  refPreco.current.select();
                }
              } else if (direction === 38) {
                if (refQtde.current) {
                  refQtde.current.focus();
                  refQtde.current.select();
                }
              }
            }}
          />
        )}
        <PrecoInput
          label="Preço Unitário"
          value={precoUnitario}
          onChange={(value: number) => setPresoUnitario(value)}
          fullwidth={false}
          disabled={disabled}
          ref={refPreco}
          handleEnter={() => {
            if (refButton.current) {
              refButton.current.click();
              // refButton.current.select();
            }
            // if (refPeso.current) refPeso.current.focus();
          }}
          handleDirection={(direction) => {
            if (direction === 38) {
              if (conditionShowPeso()) {
                if (refPeso.current) {
                  refPeso.current.focus();
                  refPeso.current.select();
                }
              } else if (refQtde.current) {
                refQtde.current.focus();
                refQtde.current.select();
              }
            } else if (direction === 40) {
              if (refQtde.current) {
                refQtde.current.focus();
                refQtde.current.select();
              }
            }
          }}
        />
        {/* <SelectInput
          value={precoUnitario}
          onChange={(value: number) => setPresoUnitario(value)}
          label="Preço Unitário"
          lista={listaPrecos}
          fullwidth
          disabled={disabled}
        /> */}
        <PrecoInput
          label="Preço Total"
          value={calculaPrecoTotal()}
          onChange={(value: number) => console.log(value)}
          fullwidth={false}
          disabled

          /* error
          helperText="Incorrect entry." */
        />
        {/* <TextField
          id="outlined-basic"
          label="Observação"
          variant="outlined"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          // size="small"
          margin="normal"
          color="secondary"
        /> */}
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
            // setObs('');
          }}
          ref={refButton}
        >
          Adicionar à lista
        </Button>
      </Box>
    </Paper>
  );
};

export default forwardRef(SidebarInputs);
