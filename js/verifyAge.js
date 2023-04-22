export default function isMajorAge(field) {
    const birth = new Date(field.value);
    if (!verifyAge(birth)) {
        field.setCustomValidity('O usuário não é maior de idade!');
    }
}

function verifyAge(date) {
    const currentDate = new Date();
    const majorDate = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());

    return currentDate >= majorDate;
}