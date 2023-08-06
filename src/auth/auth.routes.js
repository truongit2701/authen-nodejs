import { Router } from "express";
const router = Router();

import { register } from "./auth.controller";

router.post("/register", register);

export default router;
