
const EMAIL_EXISTS_MESSAGE = 'EMAIL_EXISTS'
const INVALID_EMAIL_MESSAGE = 'INVALID_EMAIL'

export function errorHandler (error) {

    switch (error) {

        case EMAIL_EXISTS_MESSAGE:
            return "The email exists";
            break;

        case INVALID_EMAIL_MESSAGE:
            return "The email is invalid";
            break;
    
        default:
            return '';
    }
}