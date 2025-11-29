import { Router } from "express";
import logAdminController from "../controllers/logAdmin.controller";

const router = Router();

router.get("/", logAdminController.getAll);
router.get("/:id", logAdminController.getById);
router.post("/", logAdminController.create);
router.delete("/:id", logAdminController.delete);

export default router;
