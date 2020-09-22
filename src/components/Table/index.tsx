import React, { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    /* '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }, */
  },
  body: {
    fontSize: 14,
    /* whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', */
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
    // opacity: '0.7',
    maxHeight: '69vh',
  },
  container2: {
    height: '100%',
    width: '100%',
    // opacity: '0.7',
    overflow: 'auto',
  },
}));

export type Row = {
  produto: string;
  unidades: number;
  peso: number;
  unitario: number;
  total: number;
};

type RowFormated = {
  produto: string;
  unidades: number;
  peso: number;
  unitario: string;
  total: string;
};

export type TablePersonalProps = {
  lista: Row[];
  onSelect: (select: any) => void;
};

const TablePersonal: FC<TablePersonalProps> = ({ lista, onSelect }) => {
  const classes = useStyles();

  function formatMoeda(valor: number) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function formataDados(list: Row[]) {
    const listFormated: Array<RowFormated> = [];
    for (let i = 0; i < list.length; i += 1) {
      listFormated.push({
        produto: list[i].produto,
        unidades: list[i].unidades,
        peso: list[i].peso,
        unitario: formatMoeda(list[i].unitario),
        total: formatMoeda(list[i].total),
      });
    }
    return listFormated;
  }

  const listaFormatada = formataDados(lista);

  return (
    <div className={classes.container2}>
      <TableContainer
        component={Paper}
        className={classes.container}
        elevation={3}
      >
        <PerfectScrollbar>
          <Table
            className={classes.table}
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Produto</StyledTableCell>
                <StyledTableCell align="right">Unidades</StyledTableCell>
                <StyledTableCell align="right">Peso (Kg)</StyledTableCell>
                <StyledTableCell align="right">Unitário</StyledTableCell>
                <StyledTableCell align="right">Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaFormatada.map((row) => (
                <StyledTableRow key={row.produto} onClick={onSelect}>
                  <StyledTableCell component="th" scope="row">
                    {row.produto}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.unidades}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.peso}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.unitario}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.total}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </PerfectScrollbar>
      </TableContainer>
    </div>
  );
};

export default TablePersonal;
