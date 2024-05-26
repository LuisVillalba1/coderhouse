import winston from "winston";

const customLevelsOptions = {
    levels : {
        fatal : 0,
        error : 1,
        warning : 2,
        info : 3,
        debug : 4,
    },
    colors : {
        fatal : "red",
        error : "red",
        warning : "yellow",
        info : "blue",
        debug : "cyan",
    }
}


const logger = winston.createLogger({
    levels : customLevelsOptions.levels,
    transports : [
        new winston.transports.Console({
            level : "info",
            format : winston.format.combine(
                winston.format.colorize({colors : customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level : "warning",
            filename : "./warnings.log",
            format : winston.format.simple()
        }),
        new winston.transports.File({
            level : "error",
            filename : "./error.log",
            format : winston.format.simple()
        })
    ]
})


export const addLogger = (req,res,next)=>{
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date()}`)
    next()
}

export const createLoggerWarning = (req,e)=>{
    req.logger.warning(`${e} en ${req.url} - ${new Date()}`);
}

export const createLoggerError = (req,message)=>{
    req.logger.error(`${message} en ${req.url} - ${new Date()}`);
}