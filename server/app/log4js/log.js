const Logger = require('./logger');


exports.log = (content, appender) => {
    // console.log(`[Logger - ${appender || 'info'}]`, content);
    switch (appender) {
        case 'e':
        case 'err':
        case 'error':
            return Logger.error(content);
        default:
            return Logger.info(content);
    }
}
