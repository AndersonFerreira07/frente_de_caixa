import React, { forwardRef } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { stringify } from 'query-string';

import api from '../../services/api';
import { getHost } from '../../services/host';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export type AutoCompleteProdutoProps = {
  value: any;
  onChange: (newValor: any) => void;
  handleEnter?: () => void;
};

const AutoCompleteProdutos = forwardRef<any, AutoCompleteProdutoProps>(
  ({ value, onChange, handleEnter = () => {} }, forwardedRef) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

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
        const produtos = await api(query(`${getHost()}/produtos`));
        await sleep(1e3);
        if (active) {
          setOptions(produtos.data.data);
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

    return (
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300 }}
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
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionSelected={(option, value) => option.nome === value.nome}
        getOptionLabel={(option) => option.nome}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cliente"
            variant="outlined"
            color="secondary"
            inputRef={forwardedRef}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleEnter();
              /* if (e.keyCode === 120) handleF9();
            if (e.keyCode === 38) handleDirection(38);
            if (e.keyCode === 40) handleDirection(40); */
            }}
            autoFocus
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

export default AutoCompleteProdutos;
