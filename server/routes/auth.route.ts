import express, { Router } from "express"
import { signup } from "../controllers/signup";
import { login } from "../controllers/login";
import { logout } from "../controllers/logout";
import { updateProfile } from "../controllers/updateProfile";
import { protectRoute } from "../middleware/auth.middleware";
import { checkAuth } from "../controllers/checkAuth";

const router: Router = express.Router();

router.post("/signup", signup as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
router.post("/logout", logout as express.RequestHandler);
router.put("/update-profile", protectRoute, updateProfile as express.RequestHandler)
router.get("/check", protectRoute, checkAuth as express.RequestHandler)

export default router