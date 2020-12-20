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
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { createObjVenda } from '../../utils/createObjVenda';
import DialogoBoletos from '../DialogoBoletos';
import NotaFC from '../NotaFC2';

// import ButtonDownloads from '../testePdf/ButtonDownloads';

export type DialogoNotaProps = {
  handleClose: () => void;
  itens: Array<any>;
};

export type DialogoNotaHandle = {
  handleOpen: (vendaObj: any, config: any, isNota: boolean) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

const DialogoNota: RefForwardingComponent<
  DialogoNotaHandle,
  DialogoNotaProps
> = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const componentRef = React.useRef(null);
  const [venda, setVenda] = useState({});
  const [boletos, setBoletos] = useState([]);
  const classes = useStyles();
  type CountdownHandle = React.ElementRef<typeof DialogoBoletos>;
  const refDialogoBoletos = useRef<CountdownHandle>(null);

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current ? componentRef.current : null;
    },
  });

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleBoletos = () => {
    if (refDialogoBoletos.current) {
      refDialogoBoletos.current.handleOpen();
    }
  };

  useImperativeHandle(ref, () => ({
    handleOpen(vendaObj, config, isNota) {
      console.log('vendaObj');

      console.log(vendaObj);
      setBoletos(vendaObj.boletos);
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
        <DialogContent style={{ padding: '0' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <NotaFC ref={componentRef} {...venda} />
          </div>
        </DialogContent>
        <DialogActions className={classes.action}>
          {boletos.length > 0 && (
            <Button
              onClick={handleBoletos}
              color="primary"
              style={{ color: 'white' }}
            >
              Boletos
            </Button>
          )}
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: 'white' }}
          >
            Fechar
          </Button>
          <Button
            onClick={handlePrint}
            color="primary"
            style={{ color: 'white' }}
          >
            Imprimir
          </Button>
          {/* <ButtonDownloads itens={props.itens} /> */}
        </DialogActions>
      </Dialog>
      <DialogoBoletos ref={refDialogoBoletos} boletos={boletos} />
    </div>
  );
};

export default forwardRef(DialogoNota);
