import { ValidationOptions, registerDecorator } from "class-validator";
import stringLength from "../vendor/string_length";

export function IsValidUsername(property: string, validationOptions?: ValidationOptions) {
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