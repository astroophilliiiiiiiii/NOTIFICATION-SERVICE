import { Request , Response } from "express"

export const pingHandler = ( req:Request , res:Response ) =>{
    console.log( req.body ) ; 
    console.log( req.query ) ; 
    console.log( req.params ) ; 
    res.send("pong-gitcodespace") ; 
}
