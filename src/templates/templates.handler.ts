import fs from "fs/promises" ; // to be able to read the template file 
import path from "path" ;  // for template file path 
import Handlerbars from "handlebars" // that will read template and populate the data 
import { InternalServerError } from "../utils/errors/app.error.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// takes template file name and params to populate into it 
// returns string data file --- whole mail as a string 
export async function renderMailTemplate( templateId:string , params:Record<string,any> ):Promise<string>{

//__dirname (current folder) m mailers folder hoga, uske andar ${templateId}.hbs (jaise welcome.hbs) naam ki file ko yeh point karega.
    const TemplatePath = path.join(__dirname , 'mailers', `${templateId}.hbs` )

    try{
        // .hbs file ko coding text (utf-8 format) mein read karta hai.
        const content = await fs.readFile( TemplatePath , 'utf-8' ) // reading the file 
        // creates the template final in which we can populate the data 
        const finalTemplate = Handlerbars.compile(content) // passing the adata in it  
        return finalTemplate(params) // -- final mail returned

    }catch(error){
        throw new InternalServerError(`Template not found !! ${templateId}`)
    }
}