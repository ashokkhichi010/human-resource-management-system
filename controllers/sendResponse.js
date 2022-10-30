module.exports = (statusCode, message, data, status = true, showMessage = true) => {
    return {
        statusCode: statusCode,
        message: message,
        status: status,
        showMessage: showMessage,
        data: data
    }
}