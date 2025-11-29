import { Router } from "express";
import attendanceStatsController from "../controllers/attendanceStats.controller";

const router = Router();

router.get("/", attendanceStatsController.getAll);
router.get("/:id", attendanceStatsController.getById);
router.post("/", attendanceStatsController.create);
router.put("/:id", attendanceStatsController.update);
router.delete("/:id", attendanceStatsController.delete);

export default router;
