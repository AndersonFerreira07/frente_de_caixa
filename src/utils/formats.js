export function formatRG(rg) {
    return rg ? `${rg.substring(0, 2)}.${rg.substring(2, 5)}.${rg.substring(
        5,
        8
    )}-${rg.substring(8)}` : '';
}

export function formatCPF(cpf) {
    return cpf ? `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(
        6,
        9
    )}-${cpf.substring(9)}` : '';
}

export function formatCNPJ(cnpj) {
    return cnpj ? `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(
        5,
        8
    )}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}` : '';
}

export function formatCEP(cep) {
    return cep ? `${cep.substring(0, 5)}-${cep.substring(5)}` : '';
}

export function formatTelefone(telefone) {
    return telefone ? `(${telefone.substring(0, 2)}) ${telefone.substring(
        2,
        7
    )}-${telefone.substring(7)}` : '';
}
