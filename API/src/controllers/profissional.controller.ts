import { Request, Response } from "express";
import prisma from "../config/prisma";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const profissionais = await prisma.profissional.findMany({
        include: {
          user: true,
          organizacao: true
        }
      });

      return res.json(profissionais);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao listar profissionais",
        details: err
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const profissional = await prisma.profissional.findUnique({
        where: { id: Number(id) },
        include: {
          user: true,
          organizacao: true
        }
      });

      if (!profissional) {
        return res.status(404).json({ error: "Profissional não encontrado" });
      }

      return res.json(profissional);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao buscar profissional",
        details: err
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { userId, organizacaoId, especialidade, registro } = req.body;

      const profissional = await prisma.profissional.create({
        data: {
          userId,
          organizacaoId,
          especialidade,
          registro
        }
      });

      return res.json(profissional);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao criar profissional",
        details: err
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const profissional = await prisma.profissional.update({
        where: { id: Number(id) },
        data: req.body
      });

      return res.json(profissional);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao atualizar profissional",
        details: err
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.profissional.delete({
        where: { id: Number(id) }
      });

      return res.json({ message: "Profissional deletado com sucesso" });
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao deletar profissional",
        details: err
      });
    }
  }
};
