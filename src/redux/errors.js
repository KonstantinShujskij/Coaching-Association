import { MAX_COUNT, MIN_NAME_LEN, MAX_NAME_LEN, MAX_COUNT_WORDS, 
    ERRORS_SYMPOLS, EMAIL_DOMEN } from "../const";

export const ERROR_FORM_NAME_LEN = 'FORM/NEME_LEN';
export const ERROR_FORM_NAME_WORDS_COUNT = 'FORM/NEME_WORDS_COUNT';
export const ERROR_FORM_NAME_WORDS_UP = 'FORM/NEME_WORDS_UP';
export const ERROR_FORM_NAME_SYMBOL = 'FORM/NEME_SYMBOL';
export const ERROR_FORM_NAME_UNIQUE = 'FORM/NEME_UNIQUE';
export const ERROR_FORM_EMAIL_DOMEN = 'FORM/EMAIL_DOMEN';
export const ERROR_FORM_EMAIL_BODY = 'FORM/EMAIL_BODY';
export const ERROR_LIST_MAX_COUNT = 'LIST/MAX_COUNT';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

const errorDescription = [
    {
        id: ERROR_FORM_NAME_LEN,
        title: `Name length must be between ${MIN_NAME_LEN} and ${MAX_NAME_LEN} characters`
    },
    {
        id: ERROR_FORM_NAME_WORDS_COUNT,
        title: `Name can be up to ${MAX_COUNT_WORDS} words`
    },
    {
        id: ERROR_FORM_NAME_WORDS_UP,
        title: 'All words in the name must begin with a capital letter'
    },
    {
        id: ERROR_FORM_NAME_SYMBOL,
        title: `Name cannot contain numbers or symbols ${ERRORS_SYMPOLS}`
    },
    {
        id: ERROR_FORM_NAME_UNIQUE,
        title: 'The name must be unique. This name is already taken'
    },
    {
        id: ERROR_FORM_EMAIL_DOMEN,
        title: `The domain of the email address must be ${EMAIL_DOMEN}`
    },
    {
        id: ERROR_FORM_EMAIL_BODY,
        title: 'The email address must consist of the words used in the name, separated by a dot'
    },
    {
        id: ERROR_LIST_MAX_COUNT,
        title: `The maximum number of coaches has been reached. (${MAX_COUNT})`
    }
]

export function getErrorDescription(error) {
    const errorObjs = errorDescription.filter((item) => item.id === error);
    if(errorObjs.length) { return errorObjs[0]; }

    return { id: UNKNOWN_ERROR, title: 'Error' };
}