import isCPF from "./verifyCPF.js";
import isMajorAge from "./verifyAge.js";
const formFields = document.querySelectorAll("[required]");
const form = document.querySelector("[data-formulario]");

form.addEventListener("submit", e => {
    e.preventDefault();

    const responsesList = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("register", JSON.stringify(responsesList));
    window.location.href = './abrir-conta-form-2.html'
})

formFields.forEach((field) => {
    field.addEventListener("blur", () => verifyField(field));
    field.addEventListener("invalid", event => event.preventDefault());
})

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verifyField(field) {
    let message = "";
    field.setCustomValidity("");
    if (field.name == "cpf" && field.value.length >= 11) {
        isCPF(field);
    }
    if (field.name == "aniversario" && field.value != "") {
        isMajorAge(field);
    }
    errorTypes.forEach(error => {
        if(field.validity[error]) {
            message = mensagens[field.name][error];
        }
    })
    const errorMessage = field.parentNode.querySelector('.mensagem-erro');
    const verifyInput = field.checkValidity();

    if (!verifyInput) {
        errorMessage.textContent = message;
    } else {
        errorMessage.textContent = "";
    }
}

