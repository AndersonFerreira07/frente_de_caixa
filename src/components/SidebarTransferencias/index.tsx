import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useEffect,
  useRef,
} from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';

import PrecoInput from '../PrecoInput';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: '10px',
  },
}));

export type SidebarInputsProps = {
  handleNewItem: (valor: number, hora: Date) => void;
  handleF4: () => void;
};

export type SidebarInputsHandle = {
  focus: () => void;
};

const SidebarInputs: RefForwardingComponent<
  SidebarInputsHandle,
  SidebarInputsProps
> = ({ handleNewItem, handleF4 }, ref) => {
  const [valor, setValor] = useState(0);
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const refValor = useRef<any>(null);
  const refButton = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      if (refValor.current) {
        refValor.current.focus();
        refValor.current.select();
      }
    },
  }));

  return (
    <Paper elevation={3} style={{ opacity: '0.75' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="15px"
      >
        <Box width="100%" display="flex">
          <PrecoInput
            label="Valor da Parcela"
            value={valor}
            onChange={(value: number) => setValor(value)}
            fullwidth
            disabled={false}
            error={isNaN(valor) || valor < 0}
            helperText={!(isNaN(valor) || valor < 0) ? '' : 'Valor inválido'}
            ref={refValor}
            handleEnter={() => {
              if (refButton.current) {
                refButton.current.click();
              }
            }}
            handleF4={() => handleF4()}
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleNewItem(valor, new Date());
            setValor(0);

            if (refValor.current) {
              refValor.current.focus();
              refValor.current.select();
            }
          }}
          disabled={valor <= 0 || isNaN(valor)}
          ref={refButton}
        >
          Adicionar
        </Button>
      </Box>
    </Paper>
  );
};

export default forwardRef(SidebarInputs);
