import { Request, Response } from "express";
import prisma from "../config/prisma";

const agendaProfissionalController = {
  async getAll(req: Request, res: Response) {
    try {
      const agendas = await prisma.agendaProfissional.findMany();
      return res.json(agendas);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar agendas", details: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const agenda = await prisma.agendaProfissional.findUnique({
        where: { id: Number(id) },
      });

      if (!agenda) {
        return res.status(404).json({ error: "Agenda não encontrada" });
      }

      return res.json(agenda);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao obter agenda", details: err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { profissionalId, inicio, fim, disponivel } = req.body;

      const agenda = await prisma.agendaProfissional.create({
        data: {
          profissionalId,
          inicio: new Date(inicio),
          fim: new Date(fim),
          disponivel: disponivel ?? true,
        },
      });

      return res.status(201).json(agenda);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar agenda", details: err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const agenda = await prisma.agendaProfissional.update({
        where: { id: Number(id) },
        data: {
          ...req.body,
          inicio: req.body.inicio ? new Date(req.body.inicio) : undefined,
          fim: req.body.fim ? new Date(req.body.fim) : undefined,
        },
      });

      return res.json(agenda);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao atualizar agenda", details: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.agendaProfissional.delete({
        where: { id: Number(id) },
      });

      return res.json({ message: "Agenda deletada" });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao deletar agenda", details: err });
    }
  },
};

export default agendaProfissionalController;
