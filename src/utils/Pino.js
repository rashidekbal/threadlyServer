import { json, Router } from "express";
import pino, { destination } from "pino"

const logger=pino({
    transport:{
        target:"pino/file",
        options:{destination:"./src/public/errorLogs/log.txt",mkdir:true}
    }
});
export const formErrorBody=(error,req)=>{
    const apiPath=req?req.route.path:"no path"
     return ({ err: error,Apipath:apiPath,code: error.statusCode || 500 });
}
export default logger