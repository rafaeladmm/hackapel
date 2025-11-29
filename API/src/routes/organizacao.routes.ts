import { Router } from "express";
import organizacaoController from "../controllers/organizacao.controller";

const router = Router();

router.post("/", organizacaoController.createOrganizacao);
router.get("/", organizacaoController.getAllOrganizacoes);
router.get("/:id", organizacaoController.getOrganizacaoById);
router.put("/:id", organizacaoController.updateOrganizacao);
router.delete("/:id", organizacaoController.deleteOrganizacao);

export default router;
