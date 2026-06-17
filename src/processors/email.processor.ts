import { Worker , Job } from "bullmq" ;
import { MAILER_QUEUE, mailerQueue } from "../queues/mailer.queue.js" ;
import { getRedisConnObject } from "../config/config.redis.js" ;
import { NotificationDto } from "../dto/notification.dto.js";
import { MAILER_PAYLOAD } from "../producers/email.producer.js";

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

    },

    // 3.) Connection with the redis 
    { connection : getRedisConnObject() }
)

    emailProcessor.on("failed" , ()=>{
        console.error("Email Processing failed! ")
    })

    emailProcessor.on("completed" , ()=>{
        console.error("Email Processing completed successfullyy ! ")
    })

}