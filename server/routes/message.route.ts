import express, { Router } from "express"
import { protectRoute } from "../middleware/auth.middleware";
import { getMessages } from "../controllers/getMessages";
import { sendMessages } from "../controllers/sendMessages";

const router: Router = express.Router();

router.get("/:id", protectRoute, getMessages as express.RequestHandler)
router.post("/send/:id", protectRoute, sendMessages as express.RequestHandler)

export default router