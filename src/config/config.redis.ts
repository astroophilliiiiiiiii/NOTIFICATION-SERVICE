// redis connection configuration file
import Redis  from "ioredis" ;
import { serverConfig } from "./index.js" ; // connection details 

// singleton pattern to connect to redis 
function connectToRedis(){

    try{
        let connection : Redis ;

        const redisConfig = {
            port :  serverConfig.REDIS_PORT , 
            host :  serverConfig.REDIS_HOST,
            maxRetriesPerRequest:null, 
        }
        
        // checking the availability 
        return ()=>{
            if( !connection ){
                connection = new Redis(redisConfig); 
                return connection ; 
            }
            return connection ; // returning already existing connection object !!! 
        }

    }catch( error ){
        console.error("Error connecting to the redis server ") ; 
        throw error ; 
    }
}

export const getRedisConnObject = connectToRedis() ; 

