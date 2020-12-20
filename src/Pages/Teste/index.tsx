import React, { useState } from 'react';

import Search from '../../components/AutoCompleteClientesContainer';

const Teste = () => {
  const [value, setValue] = useState('');
  return (
    <Search
      handleF4={() => {}}
      onChange={(newValue) => setValue(newValue)}
      value={value}
      resource="fornecedores"
      label="Fornecedor"
    />
  );
};

export default Teste;
