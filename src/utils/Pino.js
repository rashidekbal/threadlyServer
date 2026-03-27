import { Router } from "express";
import pino, { destination } from "pino"

const logger=pino({
    transport:{
        target:"pino/file",
        options:{destination:"../public/errorLogs/log.txt",mkdir:true}
    }
});
export const formErrorBody=(error,req)=>{
     return({ err: error,Apipath:req?req.route.path:"no route" ,code: error.statusCode || 500 }, error.message || "Internal Server Error");
}
export default logger