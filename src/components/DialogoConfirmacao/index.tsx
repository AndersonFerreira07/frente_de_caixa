import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export type DialogoConfirmacaoProps = {
  handleConfirma: (codigo: number) => void;
};

export type DialogoConfirmacaoHandle = {
  handleOpen: (titleNew: string, contentNew: string, codigoNew: number) => void;
};

// const DialogoConfirmacao: FC<DialogoConfirmacaoProps> = () => {
const DialogoConfirmacao: RefForwardingComponent<
  DialogoConfirmacaoHandle,
  DialogoConfirmacaoProps
> = (props, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [codigo, setCodigo] = useState(0);

  useImperativeHandle(ref, () => ({
    handleOpen(titleNew: string, contentNew: string, codigoNew: number) {
      console.log('imprime valor kkkk');
      setTitle(titleNew);
      setContent(contentNew);
      setOpen(true);
      setCodigo(codigoNew);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleSalvar = () => {
    setOpen(false);
    props.handleConfirma(codigo);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSalvar} color="secondary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoConfirmacao);
