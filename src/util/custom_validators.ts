import { ValidationOptions, registerDecorator } from "class-validator";
import stringLength from "../vendor/string_length";
import { DateTime } from "luxon";

export function IsValidUsername(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string){
        registerDecorator({
            name: 'IsValidUsername', 
            target: object.constructor, 
            propertyName, 
            options: validationOptions, 
            validator: {
                validate(value: any){
                    return (
                        stringLength(value) > 6 &&
                        stringLength(value) <= 15 &&
                        /^[A-Z]{1,}\_?[A-Z]{1,}$/i.test(value)
                    )
                }
            }
        });

    }
}


export function IsValidNewPassword(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidNewPassword', 
            target: object.constructor, 
            propertyName, 
            options: validationOptions, 
            validator: {
                validate(value: any){

                    const regs = {
                        uppercase: /[A-Z]/, 
                        lowercase: /[a-z]/, 
                        number: /[0-9]/
                    }

                    return (
                        stringLength(value) >= 12 &&
                        stringLength(value) <= 100 &&
                        regs.uppercase.test(value) && 
                        regs.lowercase.test(value) && 
                        regs.number.test(value)
                    )
                }
            }
        });
    }
}


export function IsValidDate(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidDate', 
            target: object.constructor, 
            propertyName, 
            options: validationOptions, 
            validator: {
                validate(value: any){

                    return (
                        /^[1-2][0-9]{3}\-[0-1][0-9]\-[0-3][0-9]$/.test(value) &&
                        DateTime.fromFormat(value,'yyyy-MM-dd').isValid
                    )

                }
            }
        });
    }
}

export function IsAllowedDOB(age: number, validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsAllowedDOB', 
            target: object.constructor, 
            propertyName, 
            options: validationOptions, 
            validator: {
                validate(value: string){

                    const formattedDOB = DateTime.fromFormat(value,'yyyy-MM-dd');
                    const now = DateTime.now();

                    return now.diff(formattedDOB).toObject().years! < age;
                    
                }
            }
        });
    }
}