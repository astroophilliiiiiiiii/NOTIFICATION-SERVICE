import { Request , Response , NextFunction } from "express";
import { success } from "zod";
import { z } from "zod";

export const validateRequestBody = ( schema : z.ZodTypeAny )=>{
    return async( req:Request , res:Response , next:NextFunction ) =>{
        try{
            await schema.parseAsync( req.body ) ; 
            console.log("Request body is valid !! ") ;
            next() ; 
        }catch( error ){
            res.status( 400 ).json({
                message : "Invalid Request Body " , 
                success : "False " , 
                error : error 
            }) ;
        }
    }
}


