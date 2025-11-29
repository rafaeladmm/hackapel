import { Router } from "express";
import agendaProfissionalController from "../controllers/agendaProfissional.controller";

const router = Router();

router.get("/", agendaProfissionalController.getAll);
router.get("/:id", agendaProfissionalController.getById);
router.post("/", agendaProfissionalController.create);
router.put("/:id", agendaProfissionalController.update);
router.delete("/:id", agendaProfissionalController.delete);

export default router;
