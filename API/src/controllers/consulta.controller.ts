import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ConsultaController {

  async createConsulta(req: Request, res: Response) {
    try {
      const {
        pacienteId,
        profissionalId,
        organizacaoId,
        dataHora,
        prioridade,
        status,
        compareceu
      } = req.body;

      const consulta = await prisma.consulta.create({
        data: {
          pacienteId,
          profissionalId,
          organizacaoId,
          dataHora: new Date(dataHora),
          prioridade,
          status,
          compareceu
        }
      });

      return res.status(201).json(consulta);
    } catch (error) {
      console.error("Erro ao criar consulta:", error);
      return res.status(500).json({ error: "Erro ao criar consulta" });
    }
  }

  async getAllConsultas(req: Request, res: Response) {
    try {
      const consultas = await prisma.consulta.findMany({
        include: {
          paciente: true,
          profissional: true,
          organizacao: true,
        },
      });

      return res.json(consultas);
    } catch (error) {
      console.error("Erro ao listar consultas:", error);
      return res.status(500).json({ error: "Erro ao listar consultas" });
    }
  }

  async getConsultaById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const consulta = await prisma.consulta.findUnique({
        where: { id: Number(id) },
        include: {
          paciente: true,
          profissional: true,
          organizacao: true,
        },
      });

      if (!consulta) {
        return res.status(404).json({ error: "Consulta não encontrada" });
      }

      return res.json(consulta);
    } catch (error) {
      console.error("Erro ao buscar consulta:", error);
      return res.status(500).json({ error: "Erro ao buscar consulta" });
    }
  }

  async updateConsulta(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const {
        pacienteId,
        profissionalId,
        organizacaoId,
        dataHora,
        prioridade,
        status,
        compareceu
      } = req.body;

      const consulta = await prisma.consulta.update({
        where: { id: Number(id) },
        data: {
          pacienteId,
          profissionalId,
          organizacaoId,
          dataHora: dataHora ? new Date(dataHora) : undefined,
          prioridade,
          status,
          compareceu
        },
      });

      return res.json(consulta);
    } catch (error) {
      console.error("Erro ao atualizar consulta:", error);
      return res.status(500).json({ error: "Erro ao atualizar consulta" });
    }
  }

  async deleteConsulta(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.consulta.delete({
        where: { id: Number(id) },
      });

      return res.json({ message: "Consulta deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar consulta:", error);
      return res.status(500).json({ error: "Erro ao deletar consulta" });
    }
  }
}

export default new ConsultaController();
