import { Request, Response } from "express";
import prisma from "../config/prisma";

const logAdminController = {
  async getAll(req: Request, res: Response) {
    try {
      const logs = await prisma.logAdmin.findMany({
        include: { admin: true }
      });

      return res.json(logs);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar logs", details: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const log = await prisma.logAdmin.findUnique({
        where: { id: Number(id) },
        include: { admin: true }
      });

      if (!log) {
        return res.status(404).json({ error: "Log não encontrado" });
      }

      return res.json(log);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao obter log", details: err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { adminId, acao, detalhes } = req.body;

      const log = await prisma.logAdmin.create({
        data: { adminId, acao, detalhes }
      });

      return res.status(201).json(log);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar log", details: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.logAdmin.delete({
        where: { id: Number(id) }
      });

      return res.json({ message: "Log deletado" });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao deletar log", details: err });
    }
  }
};

export default logAdminController;
