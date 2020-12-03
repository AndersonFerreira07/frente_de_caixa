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
  handleF4: () => void;
  handleF8: () => void;
  handleF9: () => void;
  handleF10: () => void;
  editPrice: boolean;
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
  {
    handleNewItem,
    disabled,
    produto,
    listaPrecos,
    cont,
    handleF9,
    editPrice,
    handleF10,
    handleF4,
    handleF8,
  },
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

  useEffect(() => {
    if (refPreco.current) {
      refPreco.current.focus();
      refPreco.current.select();
    }
  }, [editPrice]);

  useEffect(() => {
    if (produto) setPresoUnitario(produto.precoVenda);
    else setPresoUnitario(0);
  }, [cont]);

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
    if (precoUnitario <= 0 || isNaN(precoUnitario)) {
      return true;
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

  function getPrecoMinimo() {
    if (produto) return produto.precoCompraMedio;
    return 0;
  }

  function formatMoeda(valor: number) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function getUnidadesDisponiveis() {
    if (produto) return produto.unidadesDisponivel;
    return 0;
  }

  console.log('QUNARIDADE KKKKK');
  console.log(unidades);

  console.log('PRODUTO KKKKKA NO SIDEBAR INPUTS');
  console.log(produto);

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
            isError(unidades, produto)
              ? `Unidades acima do disponível (${getUnidadesDisponiveis()})`
              : ''
          }
          ref={refQtde}
          handleEnter={() => {
            if (conditionShowPeso()) {
              if (refPeso.current) {
                refPeso.current.focus();
                refPeso.current.select();
              }
            } else if (editPrice) {
              if (refPreco.current) {
                refPreco.current.focus();
                refPreco.current.select();
              }
            } else if (refButton.current) {
              refButton.current.click();
              // refButton.current.select();
            }
          }}
          handleF4={() => handleF4()}
          handleF8={() => handleF8()}
          handleF9={() => handleF9()}
          handleF10={() => handleF10()}
          handleDirection={(direction) => {
            if (direction === 40) {
              if (conditionShowPeso()) {
                if (refPeso.current) {
                  refPeso.current.focus();
                  refPeso.current.select();
                }
              } else if (editPrice) {
                if (refPreco.current) {
                  refPreco.current.focus();
                  refPreco.current.select();
                }
              }
            } else if (direction === 38) {
              if (editPrice) {
                if (refPreco.current) {
                  refPreco.current.focus();
                  refPreco.current.select();
                }
              } else if (conditionShowPeso()) {
                if (refPeso.current) {
                  refPeso.current.focus();
                  refPeso.current.select();
                }
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
              if (editPrice) {
                if (refPreco.current) {
                  refPreco.current.focus();
                  refPreco.current.select();
                }
              } else if (refButton.current) {
                refButton.current.click();
                // refButton.current.select();
              }
            }}
            handleF4={() => handleF4()}
            handleF8={() => handleF8()}
            handleF9={() => handleF9()}
            handleF10={() => handleF10()}
            handleDirection={(direction) => {
              if (direction === 40) {
                if (editPrice) {
                  if (refPreco.current) {
                    refPreco.current.focus();
                    refPreco.current.select();
                  }
                } else if (refQtde.current) {
                  refQtde.current.focus();
                  refQtde.current.select();
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
          disabled={!editPrice}
          ref={refPreco}
          handleF4={() => handleF4()}
          handleF8={() => handleF8()}
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
          error={
            produto &&
            (getPrecoMinimo() > precoUnitario ||
              precoUnitario <= 0 ||
              isNaN(precoUnitario))
          }
          helperText={
            produto && getPrecoMinimo() > precoUnitario && precoUnitario > 0
              ? `Preço abaixo do mínimo (${formatMoeda(getPrecoMinimo())})`
              : produto && (precoUnitario <= 0 || isNaN(precoUnitario))
              ? 'Valor inválido'
              : ''
          }
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
