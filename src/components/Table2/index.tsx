import React, { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';

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

export type Row = {
  produto: any;
  unidades: number;
  peso: number;
  unitario: number;
  total: number;
  uidd: string;
  // obs: string;
};

type RowFormated = {
  produto: string;
  unidades: number;
  peso: string;
  unitario: string;
  total: string;
  uidd: string;
  // obs: string;
};

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  produto: string,
  unidades: number,
  peso: number,
  unitario: number,
  total: number,
  obs: string,
): Row {
  return {
    produto,
    unidades,
    peso,
    unitario,
    total,
    uidd: `${produto}${unitario}`,
  };
}

const rows = [createData('Cupcake', 305, 3.7, 67, 4.3, 'llala')];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Row;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'produto',
    numeric: false,
    disablePadding: true,
    label: 'Produto',
  },
  { id: 'unidades', numeric: true, disablePadding: false, label: 'Unidades' },
  { id: 'peso', numeric: true, disablePadding: false, label: 'Peso (Kg)' },
  { id: 'unitario', numeric: true, disablePadding: false, label: 'Unitário' },
  { id: 'total', numeric: true, disablePadding: false, label: 'SubTotal' },
  // { id: 'obs', numeric: true, disablePadding: false, label: 'Obs.' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Row,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Row) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
            color="primary"
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      /* paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1), */
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  actionRemove: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <>
      {numSelected > 0 ? (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : null}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => props.actionRemove()}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
      ) : null}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      // minWidth: 650,
      width: '100%',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    container: {
      height: '100%',
      width: '100%',
      opacity: '0.75',
      // maxHeight: '69vh',
    },
    container2: {
      height: '100%',
      width: '100%',
      overflow: 'auto',
    },
  }),
);

export type Table2Props = {
  rows: Row[];
  removeItens: (indices: string[]) => void;
  produto: any;
};

const Table2: FC<Table2Props> = ({ rows, removeItens, produto }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Row>('produto');
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Row,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uidd);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  function formatMoeda(valor: number) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function disablePeso(produto) {
    if (produto) {
      if (produto.unidade.modo === 2) return false;
      return true;
    }
    return false;
  }

  function formataDados(list: Row[]) {
    const listFormated: Array<RowFormated> = [];
    for (let i = 0; i < list.length; i += 1) {
      listFormated.push({
        produto: list[i].produto.nome,
        unidades: list[i].unidades,
        peso: disablePeso(list[i].produto) ? String(list[i].peso) : '-',
        unitario: formatMoeda(list[i].unitario),
        total: formatMoeda(list[i].total),
        uidd: list[i].uidd,
        // obs: list[i].obs,
      });
    }
    return listFormated;
  }

  function removerItens() {
    removeItens(selected);
    setSelected([]);
  }

  const listaFormatada = formataDados(rows);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  console.log('VALOR PRECOS TABELA');
  console.log(rows);

  return (
    <div className={classes.container2}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        actionRemove={removerItens}
      />
      <TableContainer
        className={classes.container}
        elevation={3}
        component={Paper}
      >
        <PerfectScrollbar>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle2"
            size={false ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listaFormatada.length}
            />
            <TableBody>
              {stableSort(listaFormatada, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.uidd);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.uidd)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.uidd}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.produto}
                      </TableCell>
                      <TableCell align="right">{row.unidades}</TableCell>
                      <TableCell align="right">{row.peso}</TableCell>
                      <TableCell align="right">{row.unitario}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      {/* <TableCell align="right">{row.obs}</TableCell> */}
                    </StyledTableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </PerfectScrollbar>
      </TableContainer>
    </div>
  );
};

export default Table2;
