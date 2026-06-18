import { serverConfig } from "../config/index.js";
import { logger } from "../config/logger.config.js";
import transporter from "../config/mailer.config.js";
import { InternalServerError } from "../utils/errors/app.error.js";

export async function sendEmail( to:string , subject:string , body : string ){

    try{
        const info = await transporter.sendMail({
        from : serverConfig.MAIL_USER,
        to , 
        subject, 
        html : body 
        });


        logger.info(`Email sent to ${to} with subject ${subject }`)
    }catch(error){
         console.error(error);   // <-- print the REAL error
         throw new InternalServerError("Failed to send Email!! ");            // <-- don't create a new error yet
    }
     
}


