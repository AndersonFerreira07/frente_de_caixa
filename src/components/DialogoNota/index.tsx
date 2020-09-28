import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useRef,
} from 'react';
import { useReactToPrint } from 'react-to-print';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createObjVenda } from '../../utils/createObjVenda';
import NotaFC from '../NotaFC';

export type DialogoNotaProps = {};

export type DialogoNotaHandle = {
  handleOpen: (vendaObj: any, config: any, isNota: boolean) => void;
};

const DialogoNota: RefForwardingComponent<
  DialogoNotaHandle,
  DialogoNotaProps
> = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const componentRef = React.useRef(null);
  const [venda, setVenda] = useState({});

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current ? componentRef.current : null;
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpen(vendaObj, config, isNota) {
      console.log('vendaObj');

      console.log(vendaObj);
      const vendaObjNew = createObjVenda(vendaObj, config, isNota);
      console.log(vendaObjNew);
      setVenda(vendaObjNew);
      setOpen(true);
    },
  }));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <DialogTitle id="form-dialog-title">Nota</DialogTitle>
        <DialogContent>
          <div style={{ width: '100vw', height: '100vh' }}>
            <NotaFC ref={componentRef} {...venda} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handlePrint} color="primary">
            Imprimir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoNota);
