import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class OrganizacaoController {
  
  async createOrganizacao(req: Request, res: Response) {
    try {
      const { nome, tipo, endereco } = req.body;

      const organizacao = await prisma.organizacao.create({
        data: {
          nome,
          tipo,
          endereco,
        },
      });

      return res.status(201).json(organizacao);
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      return res.status(500).json({ error: "Erro ao criar organização" });
    }
  }

  async getAllOrganizacoes(req: Request, res: Response) {
    try {
      const organizacoes = await prisma.organizacao.findMany({
        include: {
          profissionais: true,
          consultas: true,
        },
      });

      return res.json(organizacoes);
    } catch (error) {
      console.error("Erro ao buscar organizações:", error);
      return res.status(500).json({ error: "Erro ao buscar organizações" });
    }
  }

  async getOrganizacaoById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const organizacao = await prisma.organizacao.findUnique({
        where: { id: Number(id) },
        include: {
          profissionais: true,
          consultas: true,
        },
      });

      if (!organizacao) {
        return res.status(404).json({ error: "Organização não encontrada" });
      }

      return res.json(organizacao);
    } catch (error) {
      console.error("Erro ao buscar organização:", error);
      return res.status(500).json({ error: "Erro ao buscar organização" });
    }
  }

  async updateOrganizacao(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, tipo, endereco } = req.body;

      const organizacao = await prisma.organizacao.update({
        where: { id: Number(id) },
        data: {
          nome,
          tipo,
          endereco,
        },
      });

      return res.json(organizacao);
    } catch (error) {
      console.error("Erro ao atualizar organização:", error);
      return res.status(500).json({ error: "Erro ao atualizar organização" });
    }
  }

  async deleteOrganizacao(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.organizacao.delete({
        where: { id: Number(id) },
      });

      return res.json({ message: "Organização deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar organização:", error);
      return res.status(500).json({ error: "Erro ao deletar organização" });
    }
  }
}

export default new OrganizacaoController();
