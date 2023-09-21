import { Response } from "express";

export default class ResponseError {

    constructor(
        public status_code: number, 
        public short_msg: string, 
        public body: any
    ){}

    static send(res: Response, error: any) {

        if(error instanceof ResponseError){

            return res.status(error.status_code).json(error);

        }else{

            return res.status(500).json(new ResponseError(500, 'GEN_SVR_ERROR', {
                message: error.message
            }));

        }

    }


}