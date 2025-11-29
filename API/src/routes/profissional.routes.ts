import { Router } from "express";
import profissionalController from "../controllers/profissional.controller";

const router = Router();

router.get("/", profissionalController.getAll);
router.get("/:id", profissionalController.getById);

router.post("/", profissionalController.create);
router.put("/:id", profissionalController.update);
router.delete("/:id", profissionalController.delete);

export default router;
