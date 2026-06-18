import dotenv from "dotenv" ; 
dotenv.config() ; // all the variables in the .env file will be loaded into process.env

type ServerConfig = {
    PORT : number , 
    MONGO_URI : string , 
    REDIS_HOST : string ,
    REDIS_PORT : number , 
    MAIL_PASS : string , 
    MAIL_USER : string , 
}

export const serverConfig : ServerConfig = {
    PORT : Number( process.env.PORT ) || 3000 , 
    MONGO_URI : process.env.MONGO_URI || "",
    REDIS_HOST : process.env.REDIS_HOST || "localhost" ,
    REDIS_PORT : Number( process.env.REDIS_PORT ) || 6379, 
    MAIL_PASS : process.env.MAIL_PASS || "", 
    MAIL_USER : process.env.MAIL_USER || "", 
}
