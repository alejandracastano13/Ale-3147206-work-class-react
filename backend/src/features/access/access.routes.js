

import { Router } from "express";
import { accessController} from "./access.controller.js";
import { authenticateToken} from "../../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/test/:userId",
    authenticateToken,
    accessController.testPermission
);

export default router;