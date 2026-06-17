import express from "express" ;
import { serverConfig } from "./config/index.js";
import pingRouter from "./Routers/v1/ping.router.js";
import { v1Router } from "./Routers/v1/index.router.js";
import { genericErrorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./config/logger.config.js"
import { attachcorrelationIdMiddleware } from "./middlewares/correlation.middleware.js";
import { setupMailerWorker } from "./processors/email.processor.js";
import { NotificationDto } from "./dto/notification.dto.js";
import { addEmailToQueue } from "./producers/email.producer.js";

const app = express() ;  
app.use(express.json() ) ; 
app.use(express.text() ) ; 
app.use( express.urlencoded() ); 

const PORT = serverConfig.PORT ; 

app.use( attachcorrelationIdMiddleware ) ;  // adding the logger 
app.use( '/api/v1' ,  v1Router ) ; // applicable to every coming request to the server

app.use( genericErrorHandler ) ;   
 
app.listen(PORT , ()=>{
    console.log("Server is listening on port:- " , PORT ) ; 
    logger.info("press Ctrl+C to stop the server " , {"kriti":"bansal"})


    // setting up the worker --- conection done !!! -- email.processor.ts
    // notification added to queue --- email.producer.ts
    // processing of this mail will happen -- email.processor.ts 
    // and in processing we console logged !!!
    // pehle worker setup krdiyaa and fir queue m data daaldiyaa -- worker apne aap usko process  

    setupMailerWorker() ; 
    console.log("Mailer worker setup completed !! ")

    // const SampleNotification : NotificationDto = {
    //     to : "sample", 
    //     subject : "Sample Email", 
    //     templateId : "Sample-template",
    //     params : {
    //         name : "kriti bansal",
    //         orderId : "12345"
    //     }
    // }

    // addEmailToQueue(SampleNotification)
}) 

 
