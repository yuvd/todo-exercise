import express from "express";
const router = express.Router();
import tasksController from "../controllers/task.controller";

router.post("/addTask", tasksController.addTask);
router.get("/getTasks", tasksController.getTasks);
router.put("/updateTask", tasksController.updateTask);
router.delete("/deleteTask", tasksController.deleteTask);

export default router;
