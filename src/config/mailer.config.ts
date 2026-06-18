import nodemailer from "nodemailer"
import { serverConfig } from "./index.js";

// transporter object that is gonna finally tansport the email with the help of smtp( gmail server )
const transporter = nodemailer.createTransport({
    // configure the transport object 
    service : "gmail" , 
    "auth": {
        user : serverConfig.MAIL_USER, // kritibansal318@gmail.com
        pass : serverConfig.MAIL_PASS , // app password ( false password ) secondary password for the email account 
        // byaz psko szvs qlhn
    }
}) 

export default transporter;


