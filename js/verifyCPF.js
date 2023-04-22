export default function isCPF(field) {
    const cpf = field.value.replace(/\.|-/g, "");
    if(verifyRepeatedNumbers(cpf) || verifyFirstDigit(cpf) || verifySecondDigit(cpf)) {
        field.setCustomValidity('Esse cpf não é válido!');
    } 
}

function verifyRepeatedNumbers(cpf) {
    const repeatedNumbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return repeatedNumbers.includes(cpf);
}

function verifyFirstDigit(cpf) {
    let sum = 0;
    let mult = 10;

    for(let i = 0; i < 9; i++) {
        sum += cpf[i] * mult;
        mult--;
    }

    sum = (sum * 10) % 11;

    if (sum == 10 || sum == 11) {
        sum = 0;
    }

    return sum != cpf[9];
}

function verifySecondDigit(cpf) {
    let sum = 0;
    let mult = 11;

    for(let i = 0; i < 10; i++) {
        sum += cpf[i] * mult;
        mult--;
    }

    sum = (sum * 10) % 11;

    if (sum == 10 || sum == 11) {
        sum = 0;
    }

    return sum != cpf[10];
}