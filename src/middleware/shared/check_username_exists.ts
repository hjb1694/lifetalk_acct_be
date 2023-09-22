import { NextFunction, Request, Response } from "express";
import dbDataSource from "../../database";
import { User } from "../../database/entity/User.entity";
import ResponseError from "../../util/ResponseError";

export default async function(req: Request, res: Response, next: NextFunction) {

    try{

        const count = await dbDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.username = :username', {username: req.body.username})
        .getCount();

        if(!!count) {
            throw new ResponseError(
                422, 
                'ERR_USERNAME_ALREADY_EXISTS', 
                {
                    message: 'This username already exists.'
                }
            );
        }


    }catch(e){

        return ResponseError.send(res, e);

    }


}