import { Router } from "express";
import consultaController from "../controllers/consulta.controller";

const router = Router();

router.post("/", consultaController.createConsulta);
router.get("/", consultaController.getAllConsultas);
router.get("/:id", consultaController.getConsultaById);
router.put("/:id", consultaController.updateConsulta);
router.delete("/:id", consultaController.deleteConsulta);

export default router;
