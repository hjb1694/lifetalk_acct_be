import { IsEmail, IsIn, IsNotEmpty, IsString, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import ResponseError from "../../../util/ResponseError";
import { IsAllowedDOB, IsValidDate, IsValidNewPassword, IsValidUsername } from "../../../util/custom_validators";


class RegistrationDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsValidUsername()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsValidNewPassword()
    password: string;

    @IsNotEmpty()
    @IsValidDate()
    @IsAllowedDOB(16)
    dob: string;

    @IsNotEmpty()
    @IsIn(['male','female'])
    gender: string;

}

export default async function(req: Request, res: Response, next: NextFunction) {

    const registrationDto = new RegistrationDto();

    registrationDto.email = req.body.email;
    registrationDto.username = req.body.username;
    registrationDto.password = req.body.password;
    registrationDto.dob = req.body.dob;
    registrationDto.gender = req.body.gender;

    try{

        await validateOrReject(registrationDto);

        next();

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