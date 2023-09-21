import { NextFunction, Request, Response } from "express";
import ResponseError from "../../util/ResponseError";
import config from "../../config"

export default function(req: Request, res: Response, next: NextFunction) {

    try{

        const headerAPIKey = req.headers.api_key;

        if(!headerAPIKey){
            throw new ResponseError(
                401, 
                'ERR_API_KEY', 
                {
                    message: 'Absent API Key'
                }
            );
        }

        if(headerAPIKey !== config.api_key){
            throw new ResponseError(
                401, 
                'ERR_API_KEY', 
                {
                    message: 'API Key mismatch'
                }
            );
        }

        next();

    }catch(e){
        return ResponseError.send(res, e);
    }


}