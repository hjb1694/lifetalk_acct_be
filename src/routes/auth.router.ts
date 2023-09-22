import { Router } from "express";

import checkAPIKeyMiddleware from "../middleware/global/check_api_key";
import registrationDtoValidationMiddleware from "../middleware/feature/registration/dto_validation";
import checkUsernameAlreadyExistsMiddleware from "../middleware/shared/check_username_exists";
import checkEmailAlreadyExistsMiddleware from "../middleware/shared/check_email_already_exists";

const router = Router();

router.post(
    '/register', 
    checkAPIKeyMiddleware,
    registrationDtoValidationMiddleware, 
    checkUsernameAlreadyExistsMiddleware, 
    checkEmailAlreadyExistsMiddleware
);


export default router;