import express from "express" ;
import { serverConfig } from "./config/index.js";
import { pingHandler } from "./controllers/ping.controller.js";

const app = express() ; 

const PORT = serverConfig.PORT ; 

app.get("/ping" , pingHandler ) ; 

app.listen(PORT , ()=>{
    console.log("Server is listening on port:- " , PORT ) ; 
}) 

