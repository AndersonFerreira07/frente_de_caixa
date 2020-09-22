import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
} from 'react';
import ReactDataGrid from 'react-data-grid';

import { Button, Box, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    /* height: '600px',
    width: '200px', */
    // height: '100%',
    // marginTop: '10px',
    height: '100%',
    // opacity: '0.5',
  },
  container2: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}));

type Row = {
  unidades: any;
  peso: any;
};

const rows: Array<Row> = [];

for (let i = 0; i < 100; i += 1) {
  rows.push({
    unidades: 0,
    peso: 0,
  });
}

const columns = [
  {
    key: 'unidades',
    name: 'Unidades',
    editable: true,
  },
  {
    key: 'peso',
    name: 'Peso(Kg)',
    editable: true,
  },
];

export type DialogoSomaPesosProps = {
  handleSoma: (unidades: number, peso: number) => void;
};

export type DialogoSomaPesosHandle = {
  handleOpen: (
    unidades: number,
    peso: number,
    unidadesDisponivel: number,
  ) => void;
  getOpen: () => boolean;
};

const DialogoSomaPesos: RefForwardingComponent<
  DialogoSomaPesosHandle,
  DialogoSomaPesosProps
> = (props, ref) => {
  const [data, setData] = useState(rows);
  const [open, setOpen] = React.useState(false);
  const [unidadesDisponivel, setUnidadesDisponivel] = useState(0);
  const [somaAcumulada, setSomaAcumulada] = useState(0);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSalvar = () => {
    setOpen(false);
    let unidades = 0;
    let peso = 0;
    for (let i = 0; i < data.length; i += 1) {
      unidades += Number(data[i].unidades);
      peso += Number(data[i].peso);
    }
    props.handleSoma(unidades, peso);
  };

  useImperativeHandle(ref, () => ({
    handleOpen(unidades, peso, unidadesDisponivelLocal) {
      if (open === false) {
        const rows3 = rows.slice();
        rows3[0].unidades = unidades;
        rows3[0].peso = peso;
        setOpen(true);
        setData(rows3);
        setUnidadesDisponivel(unidadesDisponivelLocal);
        setSomaAcumulada(unidadesDisponivelLocal);
      } else {
        setOpen(false);
      }
    },
    getOpen() {
      return open;
    },
  }));

  function getTotais() {
    let unidadesLocal = 0;
    let pesoLocal = 0;
    for (let i = 0; i < 100; i += 1) {
      unidadesLocal += Number(data[i].unidades);
      pesoLocal += Number(data[i].peso);
    }
    return {
      unidades: unidadesLocal,
      peso: pesoLocal,
    };
  }

  const totais = getTotais();

  const onGridRowsUpdated = ({ fromRow, toRow, updated }: any) => {
    const rows2 = data.slice();
    for (let i = fromRow; i <= toRow; i += 1) {
      rows2[i] = { ...rows2[i], ...updated };
      if (
        rows2[i].peso === '' ||
        isNaN(rows2[i].peso) ||
        rows2[i].unidades === '' ||
        isNaN(rows2[i].unidades)
      )
        rows2[i] = { unidades: 0, peso: 0 };
    }
    let soma = 0;
    let somaAcumuladaLocal = 0;
    for (let i = 0; i < 100; i += 1) {
      soma += Number(rows2[i].unidades);
      if (soma <= unidadesDisponivel) somaAcumuladaLocal = soma;
      if (soma > unidadesDisponivel) {
        rows2[i] = { unidades: 0, peso: 0 };
      }
      if (Number(rows2[i].unidades) === 0) {
        rows2[i] = { unidades: 0, peso: 0 };
      }
    }
    setData(rows2);
    setSomaAcumulada(unidadesDisponivel - somaAcumuladaLocal);
  };

  return (
    <>
      {open ? (
        <Box marginLeft="10px" flex={2}>
          <Paper elevation={3} className={classes.container}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                padding: '10px',
                height: '10%',
              }}
              className={classes.container2}
            >
              <div>{`Total Unidades: ${totais.unidades}`}</div>
              <div>{`Total Peso: ${totais.peso}`}</div>
            </div>
            <div style={{ width: '100%', height: '80%', padding: '0' }}>
              <ReactDataGrid
                columns={columns}
                rowGetter={(i) => data[i]}
                rowsCount={100}
                minHeight={420}
                enableCellSelect
                onGridRowsUpdated={onGridRowsUpdated}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                height: '10%',
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleSalvar()}
                disabled={false}
                // style={{ marginLeft: '10px' }}
              >
                Salvar
              </Button>
            </div>
          </Paper>
        </Box>
      ) : null}
    </>
  );
};

export default forwardRef(DialogoSomaPesos);
