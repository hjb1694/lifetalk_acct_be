import { Router } from "express";

import checkAPIKeyMiddleware from "../middleware/global/check_api_key";

const router = Router();

router.post(
    '/register', 
    checkAPIKeyMiddleware
);


export default router;