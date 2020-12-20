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
  handleNewItem: (nome: string, valor: number, hora: Date) => void;
  handleF4: () => void;
  disabled?: boolean;
};

export type SidebarInputsHandle = {
  focus: () => void;
};

const SidebarInputs: RefForwardingComponent<
  SidebarInputsHandle,
  SidebarInputsProps
> = ({ handleNewItem, handleF4, disabled = false }, ref) => {
  const [valor, setValor] = useState(0);
  const [nome, setNome] = useState<string | null>(null);
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const refNome = useRef<any>(null);
  const refValor = useRef<any>(null);
  const refButton = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      if (refNome.current) {
        refNome.current.focus();
        refNome.current.select();
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
        <TextField
          id="entrada kkk"
          label="Nome"
          defaultValue=""
          error={nome === '' || nome === undefined}
          helperText={nome === '' || nome === undefined ? 'Nome inválido' : ''}
          color="secondary"
          className={classes.textField}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          margin="normal"
          variant="outlined"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              if (refValor.current) {
                refValor.current.focus();
                refValor.current.select();
              }
            }
            if (e.keyCode === 115) handleF4();
          }}
          inputRef={refNome}
          autoFocus
        />
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
            handleNewItem(nome || '', valor, new Date());
            setValor(0);
            // setNome(null);

            if (refNome.current) {
              refNome.current.focus();
              refNome.current.select();
            }
          }}
          disabled={
            nome === '' ||
            nome === null ||
            nome === undefined ||
            valor < 0 ||
            isNaN(valor) ||
            disabled
          }
          ref={refButton}
        >
          {disabled ? 'Salvando...' : 'Adicionar'}
        </Button>
      </Box>
    </Paper>
  );
};

export default forwardRef(SidebarInputs);
