import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pawsyRouter from "./pawsy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pawsyRouter);

export default router;
