import { Request, Response } from "express";
import prisma from "../config/prisma";

const attendanceStatsController = {
  async getAll(req: Request, res: Response) {
    try {
      const stats = await prisma.attendanceStats.findMany();
      return res.json(stats);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar estatísticas", details: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const stats = await prisma.attendanceStats.findUnique({
        where: { id: Number(id) },
      });

      if (!stats) {
        return res.status(404).json({ error: "Estatística não encontrada" });
      }

      return res.json(stats);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao obter estatística", details: err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { pacienteId, total, presencas } = req.body;

      const stats = await prisma.attendanceStats.create({
        data: {
          pacienteId,
          total: total ?? 0,
          presencas: presencas ?? 0,
        },
      });

      return res.status(201).json(stats);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar estatística", details: err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const stats = await prisma.attendanceStats.update({
        where: { id: Number(id) },
        data: req.body,
      });

      return res.json(stats);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao atualizar estatística", details: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.attendanceStats.delete({
        where: { id: Number(id) },
      });

      return res.json({ message: "Estatística deletada" });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao deletar estatística", details: err });
    }
  },
};

export default attendanceStatsController;
