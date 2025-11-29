import { Router } from "express";
import * as controller from "../controllers/paciente.controller";

const router = Router();

router.get("/", controller.getAllPacientes);
router.get("/:id", controller.getPacienteById);

router.post("/", controller.createPaciente);
router.put("/:id", controller.updatePaciente);
router.delete("/:id", controller.deletePaciente);

export default router;
