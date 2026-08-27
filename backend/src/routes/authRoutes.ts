import {Router} from "express";
import {getMe} from "../controllers/authController";
import { protectedRoute } from "../middleware/auth";

const router=Router();


router.get("/me",protectedRoute,getMe);
router.post("/callback",authCallBack);



export default router;