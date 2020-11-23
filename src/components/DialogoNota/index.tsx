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
import NotaFC from '../NotaFC2';
// import ButtonDownloads from '../testePdf/ButtonDownloads';

export type DialogoNotaProps = {
  handleClose: () => void;
  itens: Array<any>;
};

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
  const [boletos, setBoletos] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current ? componentRef.current : null;
    },
  });

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
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
        <DialogTitle id="form-dialog-title">Nota</DialogTitle>
        <DialogContent>
          <div style={{ width: '100vw', height: '100vh' }}>
            <NotaFC ref={componentRef} {...venda} />
          </div>
          <div>
            <div>Boletos:</div>
            <ul>
              {boletos.map((item, index) => (
                <li>
                  <a
                    href={item}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >{`Boleto ${index + 1}`}</a>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handlePrint} color="primary">
            Imprimir
          </Button>
          {/* <ButtonDownloads itens={props.itens} /> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoNota);
