import { validationCount, validationEmail, validationLengthName, validationSymbolName, validationUniqueName, validationWordsName } from "./validation";
import { ERROR_FORM_EMAIL_BODY, ERROR_FORM_EMAIL_DOMEN, ERROR_FORM_NAME_LEN, 
    ERROR_FORM_NAME_SYMBOL, ERROR_FORM_NAME_UNIQUE, ERROR_FORM_NAME_WORDS_COUNT, 
    ERROR_FORM_NAME_WORDS_UP, ERROR_LIST_MAX_COUNT } from "./redux/errors";
import { ERRORS_SYMPOLS, MAX_COUNT, MAX_COUNT_WORDS, MAX_NAME_LEN, MIN_NAME_LEN } from "./const";

test('Should return null if the length is in the allowed range, otherwise an error', () => {
    expect(validationLengthName('N'.repeat(MIN_NAME_LEN))).toBeNull();
    expect(validationLengthName('N'.repeat(MIN_NAME_LEN - 1))).toBe(ERROR_FORM_NAME_LEN);
    expect(validationLengthName('N'.repeat(MAX_NAME_LEN + 1))).toBe(ERROR_FORM_NAME_LEN);
});

test('Must return null if all words start with a capital letter and their number does not exceed' +  
     'the maximum allowed, otherwise an error', () => {
    expect(validationWordsName('hello')).toBe(ERROR_FORM_NAME_WORDS_UP);
    expect(validationWordsName('Hello '.repeat(MAX_COUNT_WORDS + 1))).toBe(ERROR_FORM_NAME_WORDS_COUNT);
    expect(validationWordsName('Hello')).toBeNull();
});

test('Must return an error if illegal characters are used otherwise null', () => {
    const symbolsArr = ERRORS_SYMPOLS.split('');

    for(let symbol of symbolsArr) {
        expect(validationSymbolName('ivanov ivan' + symbol)).toBe(ERROR_FORM_NAME_SYMBOL);
    }

    expect(validationSymbolName('ivanov ivan')).toBeNull();
    
});

test('Should return an error if the name is not unique, otherwise null', () => {
    const names = ['Ivan Ivanov', 'Admin'];
    
    expect(validationUniqueName('Ivan Ivanov', names)).toBe(ERROR_FORM_NAME_UNIQUE);
    expect(validationUniqueName('Oleg Ivanov', names)).toBeNull();
});

test('Should return an error if the email does not match the name or the domain does not match,' +
     'otherwise null', () => {
    expect(validationEmail('ivan.ivanov@example.com', 'Ivan Ivanov')).toBeNull();
    expect(validationEmail('ivan.ivanov@example.com', 'Oleg Ivanov')).toBe(ERROR_FORM_EMAIL_BODY);
    expect(validationEmail('ivan.ivanov@gmail.com', 'Ivan Ivanov')).toBe(ERROR_FORM_EMAIL_DOMEN);
    expect(validationEmail('ivan.ivanovexample.com', 'Ivan Ivanov')).toBe(ERROR_FORM_EMAIL_DOMEN);
});

test('Should return an error if the number is greater than the allowed value, otherwise null', () => {
    expect(validationCount(MAX_COUNT - 1)).toBeNull();
    expect(validationCount(MAX_COUNT)).toBe(ERROR_LIST_MAX_COUNT);
});