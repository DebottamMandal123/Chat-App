import express, { Router } from "express"
import { protectRoute } from "../middleware/auth.middleware";
import { getUsers } from "../controllers/getUsers";

const router: Router = express.Router();

router.get("/users", protectRoute, getUsers as express.RequestHandler);

export default router