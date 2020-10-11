/* import 'date-fns'; */
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useRef,
  useEffect,
} from 'react';

/* import DateFnsUtils from '@date-io/date-fns'; */
import KeyboardEventHandler from 'react-keyboard-event-handler';

import { Box, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
/* import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; */

import moment from 'moment';
import { SnackbarProvider, useSnackbar } from 'notistack';

import api from '../../services/api';
import AutoCompleteClientes from '../AutoCompleteClientes';
import DialogoNota from '../DialogoNota';
import LabelSubTotal from '../LabelSubtotal';
import SidebarTiposPagamentos from '../SidebarTiposPagamentos';
import Table, { Row } from '../Table';
import TablePacelas, { Row as Row2 } from '../TableTiposPagamento';

const testeConfig = {
  id: 1,
  created_at: '2020-09-09 11:34:25',
  updated_at: '2020-09-26 09:39:03',
  contadorvendas: 5,
  contadorbarcode: 1043,
  contadorlotes: 1,
  meta: 30,
  empresario: 'Anderson',
  nomeEmpresa: 'Mega Jander',
  banco: 'Banco do Brasil',
  cpf: '10831989475',
  cep: '55450000',
  telefone: '81994392133',
  enderecoEmpresa: 'rua boa vista, 31',
  contaCorrente: '13114-987',
  agencia: '0.159-7',
  somaAcumuladaAno: 0,
  created_at_last_venda: '2020-09-26 00:00:00',
  arredondamento: 0,
  diasVencimento: 7,
  diasPagamento: 7,
  tipo_pagamento_id: 1,
  caixa_id: 7,
  conta_id: 1,
};

const testeDadosCompra = [
  {
    observacao: 'dsfsfs',
    numero: 5,
    status: 2,
    data: '2020-09-26 00:00:00',
    valor: 190.58,
    valorNota: 190.58,
    itens: [
      {
        unidades: 13,
        peso: 0,
        observacao: '4 caixas',
        precoVenda: 14.66,
        lote: {
          numero: 1,
          nota: true,
          validade: '2021-02-22 00:00:00',
          ativo: true,
          produto: {
            nome: 'Linguiça Calabreza',
            ativo: true,
            codigo: '1234',
            unidade: {
              nome: 'pacote',
              modo: 2,
            },
          },
        },
      },
    ],
    cliente: {
      nome: 'Edvaldo',
      empresa: null,
      cpf: null,
      rg: null,
      cnpj: null,
      razaosocial: null,
      aniversario: null,
      logradouro: null,
      numero: null,
      complemento: null,
      bairro: null,
      cep: null,
      cidade: null,
      uf: 'PE',
      email: null,
      telefone: null,
      diaaniversario: null,
      mesaniversario: null,
      anoaniversario: null,
      dataAniversario: null,
    },
    parcelas: [
      {
        valor: 190.58,
        valorNota: 190.58,
        status: true,
        datapagamento: '2020-09-26T03:00:00.000Z',
        datapagamentoreal: '2020-09-26T03:00:00.000Z',
        tipo_pagamento_id: 1,
        valorReal: 190.58,
        lucro: 26,
        tipoPagamento: {
          nome: 'a vista',
          modo: 0,
          multa: 0,
          juros: 0,
          taxa: 0,
          conta_id: 1,
        },
      },
    ],
  },
];

const tiposPagamentosList: Array<Row2> = [
  {
    valor: 10,
    tipoPgamento: 10,
    dataPagamento: new Date(),
    uidd: 'produto1',
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  appBar: {
    position: 'relative',
    /* opacity: '0.75', */
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    /* marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200, */
    // marginTop: '10px',
  },
  btnImprimir: {
    // backgroundColor: 'green',
    // opacity: 0,
    // animation: '$fadeIn .2s ease-in-out',
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.4,
  },
}));

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type DialogoFinalizarCompraProps = {
  handleConfirma: () => void;
  lista: Row[];
  subTotal: number;
};

export type DialogoFinalizarCompraHandle = {
  handleOpen: () => void;
};

const DialogoFinalizarCompra: RefForwardingComponent<
  DialogoFinalizarCompraHandle,
  DialogoFinalizarCompraProps
> = (props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataVenda, setDataVenda] = useState<Date | null>(new Date());
  type CountdownHandle = React.ElementRef<typeof DialogoNota>;
  const refDialogoNota = useRef<CountdownHandle>(null);
  const [itens, setItens] = useState<Array<Row2>>([]);
  const [cliente, setCliente] = useState<any>(null);
  const [clienteDefault, setClienteDefault] = useState<any>(null);
  const refDate = useRef<any>(null);
  const refClientes = useRef<any>(null);
  const refBtnImprimir = useRef<any>(null);

  type SidebarHandle = React.ElementRef<typeof SidebarTiposPagamentos>;
  const refSidebar = useRef<SidebarHandle>(null);

  const { enqueueSnackbar } = useSnackbar();

  useImperativeHandle(ref, () => ({
    handleOpen() {
      if (open) {
        setOpen(false);
      } else {
        setOpen(true);
      }
      console.log('meu lalalalala poajj');
      /* if (refClientes.current) {
        refClientes.current.focus();
        refClientes.current.select();
      } */
      // if (refSidebar.current) refSidebar.current.focus();
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  function closeDialogoNota() {
    setItens([]);
    refDate.current.value = getDataAtual();
    setCliente(null);
    setOpen(false);
    props.handleConfirma();
  }

  const handleSalvar = () => {
    setOpen(false);
    props.handleConfirma();
  };

  function getTodosDados() {
    const listaItens = props.lista;
    const listaParcelas = itens;
    const dataVenda = buildObjDate(refDate.current.value);
    const clienteLocal = cliente;
    return {
      listaItens,
      listaParcelas,
      dataVenda,
      clienteLocal,
    };
  }

  function isDadosValidos() {
    if (cliente === null) {
      return false;
    }
    if (itens.length <= 0) {
      return false;
    }
    return true;
  }

  function messagesError() {
    if (cliente === null) {
      enqueueSnackbar('Campo cliente não foi preenchido!', {
        variant: 'warning',
      });
    }
    if (itens.length <= 0) {
      enqueueSnackbar('É necessário ao menos um registro de parcela!', {
        variant: 'warning',
      });
    }
    if (getValorRestante() !== 0) {
      enqueueSnackbar(
        'O valor total da venda não foi integralmente distribuído nas parcelas!',
        {
          variant: 'warning',
        },
      );
    }
  }

  async function submitDadosVenda() {
    return testeDadosCompra[0];
  }

  async function handleOpenDialogoNota() {
    console.log(getTodosDados());
    if (!isDadosValidos() || getValorRestante() !== 0) {
      messagesError();
    } else if (refDialogoNota.current) {
      const response = await submitDadosVenda();
      refDialogoNota.current.handleOpen(response, testeConfig, false);
    }
  }

  function handleNewItem(
    valor: number,
    tipoPagamento: any,
    dataPagamento: Date | null,
  ) {
    setItens([
      ...itens,
      {
        dataPagamento,
        tipoPgamento: tipoPagamento,
        valor,
        uidd: `${tipoPagamento.nome}${itens.length}`,
      },
    ]);
  }

  function renameItensUIDD(itens: Array<Row2>) {
    const arrayNew = itens.slice();
    for (let i = 0; i < itens.length; i += 1) {
      arrayNew[i].uidd = `${arrayNew[i].tipoPgamento.nome}${i}`;
    }
    return arrayNew;
  }

  function removeItens(indices: string[]) {
    // console.log(indices)
    let arrayNew = itens.slice();
    for (let i = 0; i < indices.length; i += 1) {
      arrayNew = arrayNew.filter(function (obj) {
        return obj.uidd !== indices[i];
      });
    }
    const arrayNew2 = renameItensUIDD(arrayNew);
    setItens(arrayNew2);
  }

  function getValorRestante() {
    let soma = 0;
    for (let i = 0; i < itens.length; i += 1) {
      soma += itens[i].valor;
    }
    return props.subTotal - soma;
  }

  function getDataAtual() {
    return moment().format('YYYY-MM-DD');
  }

  function buildObjDate(dateText: string) {
    const ano = parseInt(dateText.substring(0, 4), 10);
    const mes = parseInt(dateText.substring(5, 7), 10);
    const dia = parseInt(dateText.substring(8, 10), 10);
    const dataBuild = new Date();
    dataBuild.setFullYear(ano);
    dataBuild.setMonth(mes - 1);
    dataBuild.setDate(dia);
    return dataBuild;
  }

  useEffect(() => {
    async function getDefaults() {
      const dataConfig = await api.get('/config2');
      const dataClientes = await api.get(
        `/clientes/${dataConfig.data.cliente_id}`,
      );
      setCliente(dataClientes.data);
      setClienteDefault(dataClientes.data);
    }
    getDefaults();
  }, []);

  /*  useEffect(() => {
    if (refClientes.current) {
      refClientes.current.focus();
      refClientes.current.select();
    }
  }, []); */

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          css={{
            background:
              'url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg)',
            backgroundSize: 'cover',
          }}
        >
          {/* <AppBar className={classes.appBar} color="secondary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Cancelar
              </Typography>
              <Button autoFocus color="inherit" onClick={handleOpenDialogoNota}>
                Salvar
              </Button>
            </Toolbar>
          </AppBar> */}
          <Box
            padding="20px"
            display="flex"
            margin="20px"
            css={{ backgroundColor: 'white', opacity: '0.75' }}
          >
            {/* <Autocomplete
              id="combo-box-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" variant="outlined" />
              )}
            /> */}

            <AutoCompleteClientes
              value={cliente}
              onChange={(value) => setCliente(value)}
              ref={refClientes}
              handleEnter={() => {
                if (refSidebar.current) refSidebar.current.focus();
              }}
              handleF4={() => handleClose()}
              handleF8={() => handleOpenDialogoNota()}
            />

            <Box marginLeft="20px">
              {/* <MuiPickersUtilsProvider
                utils={DateFnsUtils}
              >
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Data da Venda"
                  value={dataVenda}
                  onChange={(e) => setDataVenda(e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider> */}
              <TextField
                id="date"
                label="Date da Venda"
                type="date"
                color="secondary"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                inputRef={refDate}
                defaultValue={getDataAtual()}
                disabled
              />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            padding="20px"
            flex={1}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              padding="0px 0px"
              height="100%"
            >
              <Box flex={7}>
                {/* <Table
                  lista={props.lista}
                  onSelect={() => console.log('kkkk')}
                /> */}
                <TablePacelas rows={itens} removeItens={removeItens} />
              </Box>
              <Box
                display="flex"
                /* justifyContent="space-between" */
                flexDirection="column"
                marginLeft="20px"
                flex={3}
              >
                <SidebarTiposPagamentos
                  handleNewItem={handleNewItem}
                  subTotal={props.subTotal}
                  valorRestante={getValorRestante()}
                  ref={refSidebar}
                  handleF4={() => handleClose()}
                  handleF8={() => handleOpenDialogoNota()}
                  focusImprimir={() => {
                    // if (refBtnImprimir.current) refBtnImprimir.current.focus();
                  }}
                />
                <LabelSubTotal valor={props.subTotal} />
                <Paper
                  elevation={3}
                  style={{
                    opacity: '0.75',
                    marginTop: '20px',
                    borderRadius: '4px',
                  }}
                >
                  <Box
                    padding="20px"
                    display="flex"
                    justifyContent="space-between"
                    // margin="20px"
                    // marginTop="20px"
                    borderRadius="4px"
                    css={{ backgroundColor: 'white' }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClose}
                    >
                      Voltar (F4)
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={
                        getValorRestante() !== 0
                          ? classes.btnImprimir
                          : 'btnImprimir'
                      }
                      onClick={handleOpenDialogoNota}
                      // disabled={getValorRestante() !== 0}
                      ref={refBtnImprimir}
                    >
                      Salvar (F8)
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
        <DialogoNota ref={refDialogoNota} handleClose={closeDialogoNota} />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />

        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
        <div className="firefly" />
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoFinalizarCompra);
