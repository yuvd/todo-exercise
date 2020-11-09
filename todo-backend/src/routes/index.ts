import { Router } from "express";
import TasksRouter from "./tasks.router";

const router: Router = Router();

router.use(TasksRouter);

export default router;
