enum errorUserMessage {
    SERVER = 'Internal Server Error',
    INVALID_DATA = 'The data is wrong or invalid',
    doesNotCreated = "User doesn't created",
    doesNotUpdated = "User doesn't updated",
    doesNotDeleted = "User doesn't deleted",
    emailExists = ' This is Email already exists',
    notFoundUser = 'This account does not exist',
    wrongCredentials = 'This credentials is wrong',
    notUpdated = "User's data doesn't update",
    MAX_5_LOGIN = "You have exceeded the minimum number of incorrect attempts, try again after:",
    ACCOUNT_BLOCKED = "This Account is blocked temporary, please check it later",
    haveNotSource = "You don't have any source",
};



export default errorUserMessage;