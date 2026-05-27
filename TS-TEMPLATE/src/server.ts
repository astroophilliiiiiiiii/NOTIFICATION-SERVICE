import express from "express" ;
import { serverConfig } from "./config/index.js";
import { pingHandler } from "./controllers/ping.controller.js";
import pingRouter from "./Routers/ping.router.js";

const app = express() ; 

const PORT = serverConfig.PORT ;

app.use( pingRouter ) ; 

app.listen(PORT , ()=>{
    console.log("Server is listening on port:- " , PORT ) ; 
}) 


