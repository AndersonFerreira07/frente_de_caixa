import { getCargo } from '../services/alth';

const getPermission = (values) => {
  const cargo = getCargo();
  switch (cargo) {
    case 0: // gerente ola meu amigo
      return values[0];
    case 1: // caixa
      return values[1];
    default:
      return false;
  }
};

export const getPermissionVendas = () => getPermission([true, true]);

export const getPermissionCompras = () => getPermission([true, true]);

export const getPermissionEstoque = () => getPermission([true, true]);

export const getPermissionClientes = () => getPermission([true, false]);

export const getPermissionFornecedores = () => getPermission([true, false]);

export const getPermissionCustos = () => getPermission([true, false]);

export const getPermissionGraficos = () => getPermission([true, false]);

export const getPermissionResumo = () => getPermission([true, false]);

export const getPermissionAvarias = () => getPermission([true, true]);

export const getPermissionProdutos = () => getPermission([true, false]);

export const getPermissionAdm = () => getPermission([true, false]);

export const getPermissionCongif = () => getPermission([true, false]);

export const getVectorPermissions = () => {
  const vetorPermissions = [];
  vetorPermissions.push(getPermissionVendas());
  vetorPermissions.push(getPermissionCompras());
  vetorPermissions.push(getPermissionEstoque());
  vetorPermissions.push(getPermissionClientes());
  vetorPermissions.push(getPermissionFornecedores());
  vetorPermissions.push(getPermissionCustos());
  vetorPermissions.push(getPermissionGraficos());
  vetorPermissions.push(getPermissionResumo());
  vetorPermissions.push(getPermissionAvarias());
  vetorPermissions.push(getPermissionProdutos());
  vetorPermissions.push(getPermissionAdm());
  vetorPermissions.push(getPermissionCongif());
  return vetorPermissions;
};
