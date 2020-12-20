import React, { forwardRef } from 'react';

import { useDebounce } from 'use-debounce';

import AutoCompleteClientes from '../AutoCompleteClientes2';
import Label from '../Label';

export type SearchProps = {
  value: any;
  onChange: (newValor: any) => void;
  handleEnter?: () => void;
  handleF4?: () => void;
  handleF8?: () => void;
  resource: string;
  label: string;
};

const Search = forwardRef<any, SearchProps>(
  (
    {
      value,
      onChange,
      handleEnter = () => {},
      handleF4 = () => {},
      handleF8 = () => {},
      resource,
      label,
    },
    forwardedRef,
  ) => {
    const [inputValue, setInputValue] = React.useState('');
    const [valueDebounce] = useDebounce(inputValue, 500);

    function keyPress(keyCode) {
      if (keyCode === 13) {
        handleEnter();
      }
      if (keyCode === 115) {
        handleF4();
      }
      if (keyCode === 119) {
        handleF8();
      }
    }

    return (
      <AutoCompleteClientes
        inputValue={inputValue}
        onChange={(produtoNew) => onChange(produtoNew)}
        updateValue={(newValue) => setInputValue(newValue)}
        value={value}
        label={label}
        valueDebounce={valueDebounce}
        handleKey={keyPress}
        ref={forwardedRef}
        resource={resource}
      />
    );
  },
);

export default Search;
