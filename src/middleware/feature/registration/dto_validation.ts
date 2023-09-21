import { IsEmail, IsNotEmpty, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import ResponseError from "../../../util/ResponseError";


class RegistrationDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

}

export default async function(req: Request, res: Response, next: NextFunction) {

    const registrationDto = new RegistrationDto();

    registrationDto.email = req.body.email;

    try{

        await validateOrReject(registrationDto);

    }catch(e){

        return ResponseError.send(
            res,
            new ResponseError(
                422, 
                'ERR_VALIDATION', 
                {
                    message: 'Validation errors are present.', 
                    errors: e
                }
            )
        );

    }

}