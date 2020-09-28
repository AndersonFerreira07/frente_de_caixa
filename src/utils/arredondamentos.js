function decimalAdjust(type, value, exp) {
    // Se exp é indefinido ou zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Se o valor não é um número ou o exp não é inteiro...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Transformando para string
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Transformando de volta
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}


export function round10(value, exp) {
    return decimalAdjust('round', value, exp);
}

export function floor10(value, exp) {
    return decimalAdjust('floor', value, exp);
}

export function ceil10(value, exp) {
    return decimalAdjust('ceil', value, exp);
}

export function trunc10(value, exp) {
    return decimalAdjust('trunc', value, exp);
}
