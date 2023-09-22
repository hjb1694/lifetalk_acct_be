import { NextFunction, Request, Response } from "express";
import ResponseError from "../../util/ResponseError";
import dbDataSource from "../../database";
import { User, UserStatus } from "../../database/entity/User.entity";

export default async function(req: Request, res: Response, next: NextFunction) {

    try {

        const account = await dbDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.email = :email', {email: req.body.email})
        .orderBy('user.id', 'DESC')
        .limit(1)
        .getOne();

        if(account && account.status !== UserStatus.SELF_DEACTIVATED){
            throw new ResponseError(
                422, 
                'ERR_EMAIL_ALREADY_EXISTS', 
                {
                    message: 'An account with this email address already exists.'
                }
            );
        }

        next();


    }catch(e){

        return ResponseError.send(res, e);

    }

}