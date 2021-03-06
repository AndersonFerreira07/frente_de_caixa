/*  */ import 'date-fns';
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useEffect,
  useRef,
  FC,
} from 'react';

/*  */ import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
/* import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; */

import moment from 'moment';
import { useSnackbar } from 'notistack';

import api from '../../services/api';
import AutoCompleteTiposPagamento from '../AutoCompleteTiposPagamento';
import PrecoInput from '../PrecoInput';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    /* marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200, */
    marginTop: '10px',
  },
}));

export type SidebarInputsProps = {
  handleNewItem: (
    valor: number,
    tipoPagamento: any,
    dataPagamento: Date | null,
  ) => void;
  subTotal: number;
  valorRestante: number;
  handleF4: () => void;
  handleF8: () => void;
  focusImprimir: () => void;
};

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

export type SidebarInputsHandle = {
  focus: () => void;
};

const SidebarInputs: RefForwardingComponent<
  SidebarInputsHandle,
  SidebarInputsProps
> = (
  { handleNewItem, subTotal, valorRestante, handleF4, handleF8, focusImprimir },
  ref,
) => {
  const [valor, setValor] = useState(0);
  const [tipoPagamento, setTipoPagamento] = useState<any>(null);
  const [tipoPagamentoDefault, setTipoPagamentoDefault] = useState<any>(null);
  const [dataPagamento, setDataPagamento] = useState<Date | null>(new Date());
  const refDate = useRef<any>(null);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const refMeioPagamento = useRef<any>(null);
  const refValor = useRef<any>(null);
  const refButton = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      console.log('OLA MEU AMIGO ENTROU!');
      if (refMeioPagamento.current) {
        refMeioPagamento.current.focus();
        refMeioPagamento.current.select();
      }
    },
  }));

  function getModoAvista() {
    if (tipoPagamento) {
      if (tipoPagamento.modo === 0) return true;
      return false;
    }
    return false;
  }

  /*   useEffect(() => {
    if (tipoPagamento) {
      if (tipoPagamento.modo === 0) setDataPagamento(new Date());
    } else {
      setDataPagamento(new Date());
    }
  }, [tipoPagamento]); */

  function updateDataPagamento(tipoPagamento) {
    if (tipoPagamento) {
      if (tipoPagamento.modo === 0) refDate.current.value = getDataAtual();
    } else {
      refDate.current.value = getDataAtual();
    }
  }

  function preencheValorComResto() {
    setValor(valorRestante);
  }

  function getDataPagamentoFormatted() {
    if (dataPagamento) return moment(dataPagamento).format('YYYY-MM-DD');
    return moment().format('YYYY-MM-DD');
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
    async function getTipoPagamentoDefault() {
      const dataConfig = await api.get('/config2');
      const dataTiposPagamento = await api.get(
        `/tipospagamento/${dataConfig.data.tipo_pagamento_id}`,
      );
      setTipoPagamento(dataTiposPagamento.data);
      setTipoPagamentoDefault(dataTiposPagamento.data);
    }
    getTipoPagamentoDefault();
  }, []); // get tipo pagamento default

  /* useEffect(() => {
    if (refMeioPagamento.current) {
      refMeioPagamento.current.focus();
      refMeioPagamento.current.select();
    }
  }, []);  */

  useEffect(() => {
    if (valorRestante === 0)
      enqueueSnackbar('Agora você pode finalizar a venda, se assim desejar!', {
        variant: 'success',
      });
  }, [valorRestante]);

  console.log('data formatada');
  console.log(getDataPagamentoFormatted());

  console.log('valor restante');
  console.log(valorRestante);
  console.log(subTotal);
  console.log('valor');
  console.log(valor);

  return (
    <Paper elevation={3} style={{ opacity: '0.75' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="15px"
      >
        {/* <Autocomplete
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          // style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Meio de Pagamento"
              variant="outlined"
            />
          )}
        /> */}
        <AutoCompleteTiposPagamento
          value={tipoPagamento}
          onChange={(value) => {
            updateDataPagamento(value);
            setTipoPagamento(value);
          }}
          ref={refMeioPagamento}
          handleEnter={() => {
            if (getModoAvista()) {
              if (refValor.current) {
                refValor.current.focus();
                refValor.current.select();
              }
            } else if (refDate.current) {
              refDate.current.focus();
              refDate.current.select();
            }
          }}
          handleF4={() => handleF4()}
          handleF8={() => handleF8()}
          disabled={valorRestante <= 0}
        />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils} css={{ width: '100%' }}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Data de Pagamento"
            value={dataPagamento}
            onChange={(e) => setDataPagamento(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
          />
        </MuiPickersUtilsProvider> */}

        <TextField
          id="date"
          label="Date de pagamento"
          type="date"
          defaultValue={getDataAtual()}
          color="secondary"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          /* disabled={
            getModoAvista() || tipoPagamento === null || valorRestante <= 0
          } */
          /* value={getDataPagamentoFormatted()} */
          /* onChange={(e) => {
            console.log('novo valor data');
            console.log(e.target.value);
            setDataPagamento(new Date(e.target.value));
          }} */
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              if (refValor.current) {
                refValor.current.focus();
                refValor.current.select();
              }
            }
            if (e.keyCode === 115) handleF4();
            if (e.keyCode === 119) handleF8();
            /* if (e.keyCode === 120) handleF9();
            if (e.keyCode === 38) handleDirection(38);
            if (e.keyCode === 40) handleDirection(40); */
          }}
          inputRef={refDate}
        />
        <Box width="100%" display="flex">
          <PrecoInput
            label="Valor da Parcela"
            value={valor}
            onChange={(value: number) => setValor(value)}
            fullwidth
            // disabled={tipoPagamento === null}
            disabled={valorRestante <= 0}
            error={
              valorRestante <= 0 ? false : valor > valorRestante || valor <= 0
            }
            helperText={
              valorRestante <= 0
                ? ''
                : valor > valorRestante
                ? 'total acima do valor da compra'
                : valor <= 0 || isNaN(valor)
                ? 'Valor invalido'
                : ''
            }
            ref={refValor}
            handleEnter={() => {
              if (refButton.current) {
                refButton.current.click();
                // refButton.current.select();
              }
              // if (refPeso.current) refPeso.current.focus();
            }}
            handleF4={() => handleF4()}
            handleF8={() => handleF8()}
          />
        </Box>
        {/* <Box width="100%" marginBottom="10px">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => preencheValorComResto()}
            disabled={tipoPagamento === null}
          >
            Preencher com resto
          </Button>
        </Box> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleNewItem(
              isNaN(valor) ? valorRestante : valor,
              tipoPagamento,
              refDate === null
                ? new Date()
                : tipoPagamento.modo === 0
                ? new Date()
                : buildObjDate(refDate.current.value),
            );
            setValor(0);
            setDataPagamento(new Date());
            // setTipoPagamento(null);
            setTipoPagamento(tipoPagamentoDefault);
            refDate.current.value = getDataAtual();
            if (valorRestante - valor > 0) {
              if (refMeioPagamento.current) {
                refMeioPagamento.current.focus();
                refMeioPagamento.current.select();
              }
            } else {
              focusImprimir();
            }
            console.log('data pagamento kkkk');
            console.log(new Date(refDate.current.value));
          }}
          disabled={
            tipoPagamento === null ||
            valor <= 0 ||
            valor === null ||
            valor === undefined ||
            (isNaN(valor) && valorRestante <= 0) ||
            valor > valorRestante ||
            valorRestante <= 0
          }
          ref={refButton}
        >
          {isNaN(valor) ? 'Preencher' : 'Adicionar'}
        </Button>
      </Box>
    </Paper>
  );
};

export default forwardRef(SidebarInputs);
