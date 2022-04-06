import { EMAIL_DOMEN, ERRORS_SYMPOLS, MAX_COUNT, MAX_COUNT_WORDS, MAX_NAME_LEN, MIN_NAME_LEN } from "./const"
import { ERROR_FORM_EMAIL_BODY, ERROR_FORM_EMAIL_DOMEN, ERROR_FORM_NAME_LEN, 
    ERROR_FORM_NAME_SYMBOL, ERROR_FORM_NAME_UNIQUE, ERROR_FORM_NAME_WORDS_COUNT, 
    ERROR_FORM_NAME_WORDS_UP, ERROR_LIST_MAX_COUNT } from "./redux/errors";

// Функция проверяеть имя на допустимую длину, возвращает ошибку в случае неудачи
export function validationLengthName(name) {
    if(name.length < MIN_NAME_LEN || name.length > MAX_NAME_LEN) { 
        return ERROR_FORM_NAME_LEN; 
    }
    return null;
}

// Функция проверяеть имя на допустимое количество слов и верхний регистр всех первых букв,
// возвращает ошибку в случае неудачи
export function validationWordsName(name) {
    const words = name.split(' ');

    if(words.length > MAX_COUNT_WORDS) { return ERROR_FORM_NAME_WORDS_COUNT; }

    for(let word of words) {
        if(!word[0] || word[0] !== word[0].toUpperCase()) { return ERROR_FORM_NAME_WORDS_UP; } 
    }

    return null;
}

// Функция проверяеть имя на допустимые символы, возвращает ошибку в случае неудачи
export function validationSymbolName(name) {
    const nameSymbols = name.split('');
    if(nameSymbols.some((symbol) => ERRORS_SYMPOLS.includes(symbol))) {
        return ERROR_FORM_NAME_SYMBOL;
    }
    return null;
}

// Функция проверяеть имя на уникальность в получаемом массиве, возвращает ошибку в случае неудачи
export function validationUniqueName(name, names) {
    if(names.indexOf(name) !== -1) { return ERROR_FORM_NAME_UNIQUE; }
    
    return null;
} 

// Функция-агрегатор проводить комплексную проверку с применением всех выше перечисленных валидаций
// возвращает ошибку в случае неудачи 
export function validationName(name, names) {
    let error;
    error = validationLengthName(name);
    if(error) { return error; }
    error = validationWordsName(name);
    if(error) { return error; }
    error = validationSymbolName(name)
    if(error) { return error; }
    error = validationUniqueName(name, names);

    return error;
}

// Функция проверяеть email на соотвествие имени и домену, возвращает ошибку в случае неудачи 
export function validationEmail(email, name) {
    let index = email.indexOf('@');
    if(index < 0) { return ERROR_FORM_EMAIL_DOMEN; }

    let emailTitle = email.substr(0, index).toLowerCase();
    let emailDomen = email.substr(index);

    if(emailDomen !== EMAIL_DOMEN) { return ERROR_FORM_EMAIL_DOMEN; }

    const trueEmail = name.split(' ').join('.').toLowerCase();
    if(emailTitle !== trueEmail) { return ERROR_FORM_EMAIL_BODY; }

 
    return null;
}

// Функция проверяеть не привышает ли количество максимально допустимое, 
// возвращает ошибку в случае неудачи
export function validationCount(count) {
    if(count >= MAX_COUNT) { return ERROR_LIST_MAX_COUNT}
    return null;
}