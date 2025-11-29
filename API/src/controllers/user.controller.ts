import { Request, Response } from "express";
import prisma from "../config/prisma";

export default {
  async create(req: Request, res: Response) {
    try {
      const { nome, cpf, email, senhaHash, telefone, role, whatsStatus } = req.body;

      const user = await prisma.user.create({
        data: { nome, cpf, email, senhaHash, telefone, role, whatsStatus }
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar usuário", details: err });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao listar usuários", details: err });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: Number(id) }
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao obter usuário", details: err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: req.body
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: "Erro ao atualizar usuário", details: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: { id: Number(id) }
      });

      return res.json({ message: "Usuário deletado" });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao deletar usuário", details: err });
    }
  }
};
