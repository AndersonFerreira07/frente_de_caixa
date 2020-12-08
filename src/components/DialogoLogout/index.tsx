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
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';

import { getUserId, getSessionId, getUsername } from '../../services/alth';
import api from '../../services/api';
import { getCaixaId } from '../../services/config';
import PrecoInput from '../PrecoInput';
import RelatorioFC from '../RelatorioFC';

export type DialogoTrocoInicialProps = {
  handleTransferenciaFinal: () => void;
  handleFechouImpressao: () => void;
};

export type DialogoTrocoInicialHandle = {
  handleOpen: () => void;
};

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex" style={{}}>
      <CircularProgress variant="determinate" {...props} color="secondary" />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const DialogoTrocoInicial: RefForwardingComponent<
  DialogoTrocoInicialHandle,
  DialogoTrocoInicialProps
> = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [modo, setModo] = useState(0);
  const [dados, setDados] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const refPreco = useRef<any>(null);
  const refButton = useRef<any>(null);

  const handleClose = () => {
    if (modo === 0) {
      setOpen(false);
      setModo(0);
    } else {
      setOpen(false);
      setModo(0);
      props.handleFechouImpressao();
    }
  };

  async function handleSalvar() {
    if (modo === 0) {
      // setOpen(false);
      setCount(count + 1);

      await api.post('/transferenciascaixa', {
        valor: value,
        session_id: getSessionId(),
        hora: new Date(),
      });

      props.handleTransferenciaFinal();
      setModo(1);
      getData();
    } else if (modo === 1) {
      // props.handleFechouImpressao();
    }
  }

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
      setOpen(true);
    },
  }));

  async function getEntradas() {
    const dadosEntradas = await api.get(
      `/entradascaixa/todos/${getSessionId()}`,
    );
    const entradas: Array<any> = [];
    for (let i = 0; i < dadosEntradas.data.length; i += 1) {
      entradas.push({
        nome: dadosEntradas.data[i].nome,
        valor: dadosEntradas.data[i].valor,
        horario: moment(dadosEntradas.data[i].hora).format('DD/MM/YYYY HH:mm'),
      });
    }
    return entradas;
  }

  async function getSaidas() {
    const dadosSaidas = await api.get(`/saidascaixa/todos/${getSessionId()}`);
    const saidas: Array<any> = [];
    for (let i = 0; i < dadosSaidas.data.length; i += 1) {
      saidas.push({
        nome: dadosSaidas.data[i].nome,
        valor: dadosSaidas.data[i].valor,
        horario: moment(dadosSaidas.data[i].hora).format('DD/MM/YYYY HH:mm'),
      });
    }
    return saidas;
  }

  async function getTransferencias() {
    const dadosTransferencias = await api.get(
      `/transferenciascaixa/todos/${getSessionId()}`,
    );
    const transferencias: Array<any> = [];
    for (let i = 0; i < dadosTransferencias.data.length; i += 1) {
      transferencias.push({
        valor: dadosTransferencias.data[i].valor,
        horario: moment(dadosTransferencias.data[i].hora).format(
          'DD/MM/YYYY HH:mm',
        ),
      });
    }
    return transferencias;
  }

  async function getPagamentos() {
    const dadosPagamentos = await api.get(
      `/pagamentoscaixa/todos/${getSessionId()}/0`,
    );
    const pagamentos: Array<any> = [];
    for (let i = 0; i < dadosPagamentos.data.length; i += 1) {
      pagamentos.push({
        numero: `#${dadosPagamentos.data[i].venda.numero}`,
        dataPagamento: moment(dadosPagamentos.data[i].datapagamento).format(
          'DD/MM/YYYY',
        ),
        cliente: dadosPagamentos.data[i].venda.cliente.nome,
        valor: dadosPagamentos.data[i].valor,
        meioPagamento: dadosPagamentos.data[i].tipoPagamento.nome,
      });
    }
    return pagamentos;
  }

  async function getVendas() {
    const dadosVendas = await api.get(`/vendas/fc/${getSessionId()}`);
    const vendas: Array<any> = [];
    for (let i = 0; i < dadosVendas.data.length; i += 1) {
      vendas.push({
        numero: `#${dadosVendas.data[i].numero}`,
        cliente: dadosVendas.data[i].cliente.nome,
        valor: dadosVendas.data[i].valorEmDinheiro,
        horario: moment(dadosVendas.data[i].created_at).format(
          'DD/MM/YYYY HH:mm',
        ),
        valorTotal: dadosVendas.data[i].valor,
      });
    }
    return vendas;
  }

  async function getNomeCaixa() {
    const data = await api.get(`/caixasfisicos/${getCaixaId()}`);
    return data.data.nome;
  }

  async function getSession() {
    const data = await api.get(`/sessions/${getSessionId()}`);
    return {
      abertura: moment(data.data.abertura).format('DD/MM/YYYY HH:mm'),
      fechamento: data.data.fechamento
        ? moment(data.data.fechamento).format('DD/MM/YYYY HH:mm')
        : '-',
      trocoInicial: data.data.trocoInicial,
    };
  }

  async function getData() {
    const entradas = await getEntradas();
    setProgress(10);
    const saidas = await getSaidas();
    setProgress(20);
    const transferencias = await getTransferencias();
    setProgress(30);
    const pagamentos = await getPagamentos();
    setProgress(50);
    const vendas = await getVendas();
    setProgress(80);
    const atendente = getUsername();
    const caixa = await getNomeCaixa();
    const session = await getSession();
    setProgress(90);
    setDados({
      entradas,
      saidas,
      transferencias,
      pagamentos,
      vendas,
      atendente,
      caixa,
      abertura: session.abertura,
      fechamento: session.fechamento,
      trocoInicial: session.trocoInicial,
    });
  }

  useEffect(() => {
    // getData();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
        scroll="paper"
        fullScreen={modo !== 0}
      >
        <DialogTitle id="form-dialog-title">
          {' '}
          {modo === 0 ? 'Retirada Final' : 'Relatório'}
        </DialogTitle>
        <DialogContent
          dividers
          style={modo === 0 ? {} : { padding: 0, height: '100%' }}
        >
          <div style={{ height: '100%' }}>
            <Box
              display={{ xs: 'block', sm: 'flex' }}
              flexDirection="column"
              marginBottom={modo === 0 ? '30px' : '0px'}
              height="100%"
            >
              {modo === 0 ? (
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
              ) : dados !== null ? (
                <PDFViewer
                  style={{ margin: 0, padding: 0, border: 0 }}
                  width="100%"
                  height="100%"
                >
                  <RelatorioFC
                    entradas={dados.entradas}
                    saidas={dados.saidas}
                    transferencias={dados.transferencias}
                    pagamentos={dados.pagamentos}
                    vendas={dados.vendas}
                    caixa={dados.caixa}
                    atendente={dados.atendente}
                    trocoInicial={dados.trocoInicial}
                    abertura={dados.abertura}
                    fechamento={dados.fechamento}
                  />
                </PDFViewer>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: '0.75',
                  }}
                >
                  <CircularProgressWithLabel value={progress} />
                </div>
              )}
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {modo === 0 ? 'Cancelar' : 'Fechar'}
          </Button>
          {modo === 0 && (
            <Button
              onClick={handleSalvar}
              color="primary"
              ref={refButton}
              disabled={value < 0 || isNaN(value)}
            >
              {modo === 0 ? 'Logout' : 'Imprimir'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoTrocoInicial);
