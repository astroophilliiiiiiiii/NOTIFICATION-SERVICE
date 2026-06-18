import { Worker , Job } from "bullmq" ;
import { MAILER_QUEUE, mailerQueue } from "../queues/mailer.queue.js" ;
import { getRedisConnObject } from "../config/config.redis.js" ;
import { NotificationDto } from "../dto/notification.dto.js";
import { MAILER_PAYLOAD } from "../producers/email.producer.js";
import { renderMailTemplate } from "../templates/templates.handler.js";
import { sendEmail } from "../service/mailer.service.js";

export const setupMailerWorker = ()=>{
    
// 3 parameters -- name of queue , logic , connection 
const emailProcessor = new Worker<NotificationDto>(
    // 1.) name of the queue 
    MAILER_QUEUE,

    // 2.) Process function 
    async( job : Job )=>{
        if( job.name !== MAILER_PAYLOAD ){
            throw new Error( "invalid job name !! ")
        }

        // call to service layer to perform the buisness logic 
        const payload = job.data 
        console.log("Processing email for:- " , JSON.stringify(payload))

        // gives us the whole email -- substituting the params
        // welcome + data ( jo populate krna h )
        const emailContent = await renderMailTemplate( payload.templateId , payload.params )

        // sending the email -- server file logic 
        await sendEmail( payload.to , payload.subject , emailContent )
    },

    // 3.) Connection with the redis 
    { connection : getRedisConnObject() }
)

    emailProcessor.on("completed" , ()=>{
        console.log("Email Processing completed successfullyy ! ")
    })

    emailProcessor.on("failed" , (job , err)=>{
         console.error("Email processing failed ! ");
    })
}


