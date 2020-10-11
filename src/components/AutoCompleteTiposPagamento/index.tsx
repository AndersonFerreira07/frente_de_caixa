import React, { forwardRef } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import fetch from 'cross-fetch';
import { stringify } from 'query-string';

import api from '../../services/api';
import { getHost } from '../../services/host';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export type AutoCompleteTiposPagamentoProps = {
  value: any;
  onChange: (newValor: any) => void;
  handleEnter?: () => void;
  handleF4?: () => void;
  handleF8?: () => void;
  disabled?: boolean;
};

const AutoCompleteTiposPagamento = forwardRef<
  any,
  AutoCompleteTiposPagamentoProps
>(
  (
    {
      value,
      onChange,
      handleEnter = () => {},
      handleF4 = () => {},
      handleF8 = () => {},
      disabled = false,
    },
    forwardedRef,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    // const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    function query(url) {
      const query2 = {
        sort: JSON.stringify(['id', 'asc']),
        range: JSON.stringify([1, 10]),
        filter: JSON.stringify({}),
      };
      return `${url}/?${stringify(query2)}`;
    }

    React.useEffect(() => {
      let active = true;

      if (!loading) {
        return undefined;
      }

      (async () => {
        const tiposPagamento = await api(query(`${getHost()}/tipospagamento`));
        await sleep(1e3); // For demo purposes.

        if (active) {
          setOptions(tiposPagamento.data.data);
        }
      })();

      return () => {
        active = false;
      };
    }, [loading]);

    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    console.log('tipo pagamento vakue');
    console.log(value);

    return (
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: '100%' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
          // handleEnter();
          // setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionSelected={(option, value) => option.nome === value.nome}
        getOptionLabel={(option) => option.nome}
        options={options}
        loading={loading}
        disabled={disabled}
        /* onKeyDown={(e) => {
        if (e.keyCode === 13) handleEnter();
      }} */
        renderInput={(params) => (
          <TextField
            {...params}
            label="Meio de pagamento"
            variant="outlined"
            color="secondary"
            inputRef={forwardedRef}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleEnter();
              if (e.keyCode === 115) handleF4();
              if (e.keyCode === 119) handleF8();
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  },
);

export default AutoCompleteTiposPagamento;
