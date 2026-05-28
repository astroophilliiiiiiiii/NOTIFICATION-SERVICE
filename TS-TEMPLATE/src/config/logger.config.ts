import winston from "winston"
import { getCorrelationId } from "../utils/helpers/request.helper.js";
import DailyRotateFile from "winston-daily-rotate-file";
import "winston-mongodb";

export const logger = winston.createLogger({
    // format + transport 
    format : winston.format.combine(
        winston.format.timestamp({format:"MM-DD-YYY HH:mm:ss"}) , 
        winston.format.json() , 
        winston.format.printf(({level , message , timestamp , correlationId , ...data })=>{
            const output = { level , message , timestamp ,correlationId : getCorrelationId()  , data } ; 
            return JSON.stringify(output) ; 
        })
    ) , 
    transports : [ 
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'application-%DATE%app.log',
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            maxFiles: '14d'
        }) , 
        // TODO -- mongoDb to integrate 
    ]
})
