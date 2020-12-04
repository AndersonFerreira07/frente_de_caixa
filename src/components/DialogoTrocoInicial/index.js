import React, { useImperativeHandle, forwardRef, useState } from 'react';

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getUserId } from '../../services/alth';
import api from '../../services/api';
import PrecoInput from '../PrecoInput';

const FormDialog = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);

  async function getData() {}

  function preencheNulo(tam) {}

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSalvar() {
    setOpen(false);
  }

  async function handleVerifyOpen() {
    setOpen(true);
  }

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
        <DialogTitle id="form-dialog-title">Saldo inicial</DialogTitle>
        <DialogContent dividers>
          <div>
            <Box
              display={{ xs: 'block', sm: 'flex' }}
              flexDirection="column"
              marginBottom="30px"
            >
              <div style={{ marginBottom: '10px', color: 'red' }}>
                {`${'caixa'}: `}
              </div>
              <PrecoInput
                label="Troco Inicial"
                value={value}
                onChange={(value: number) => setValue(value)}
                fullwidth={false}
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSalvar} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default FormDialog;
