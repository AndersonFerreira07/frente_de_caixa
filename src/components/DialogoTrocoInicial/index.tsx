import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useRef,
  useEffect,
} from 'react';

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getUserId, getSessionId } from '../../services/alth';
import api from '../../services/api';
import PrecoInput from '../PrecoInput';

export type DialogoTrocoInicialProps = {};

export type DialogoTrocoInicialHandle = {
  handleOpen: () => void;
};

const DialogoTrocoInicial: RefForwardingComponent<
  DialogoTrocoInicialHandle,
  DialogoTrocoInicialProps
> = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);

  const refPreco = useRef<any>(null);
  const refButton = useRef<any>(null);

  async function getData() {}

  function preencheNulo(tam) {}

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSalvar() {
    setOpen(false);
    setCount(count + 1);

    await api.put(`/sessions/${getSessionId()}`, {
      trocoInicial: value,
    });
  }

  async function handleVerifyOpen() {
    const data = await api.get(`/sessions/${getSessionId()}`);
    if (data.data.trocoInicial <= 0) {
      setOpen(true);
      const restoSessionAnterior = await api.get(
        `/restosessaoanterior/${getSessionId()}`,
      );
      setValue(restoSessionAnterior.data.resto);
    } else setOpen(false);
  }

  /* useEffect(() => {
    setCount(count + 1);
  }, [open]); */

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (refPreco.current) {
        refPreco.current.focus();
        refPreco.current.select();
      } else {
        setCount(count + 1);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [count]);

  useImperativeHandle(ref, () => ({
    handleOpen() {
      handleVerifyOpen();
    },
  }));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">Saldo Inicial</DialogTitle>
        <DialogContent dividers>
          <div>
            <Box
              display={{ xs: 'block', sm: 'flex' }}
              flexDirection="column"
              marginBottom="30px"
            >
              <PrecoInput
                label=""
                value={value}
                onChange={(value: number) => setValue(value)}
                fullwidth={false}
                disabled={false}
                autoFocus
                ref={refPreco}
                handleEnter={() => {
                  if (refButton.current) refButton.current.click();
                }}
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSalvar}
            color="primary"
            ref={refButton}
            disabled={value <= 0 || isNaN(value)}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoTrocoInicial);
