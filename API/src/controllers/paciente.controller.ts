import { Request, Response } from "express";
import prisma from "../config/prisma";

// GET /pacientes
export const getAllPacientes = async (req: Request, res: Response) => {
  try {
    const pacientes = await prisma.paciente.findMany();
    return res.json(pacientes);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar pacientes", details: err });
  }
};

// GET /pacientes/:id
export const getPacienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(id) },
    });

    if (!paciente) {
      return res.status(404).json({ error: "Paciente não encontrado" });
    }

    return res.json(paciente);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar paciente", details: err });
  }
};

// POST /pacientes
export const createPaciente = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const paciente = await prisma.paciente.create({
      data,
    });

    return res.status(201).json(paciente);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar paciente", details: err });
  }
};

// PUT /pacientes/:id
export const updatePaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const paciente = await prisma.paciente.update({
      where: { id: Number(id) },
      data,
    });

    return res.json(paciente);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar paciente", details: err });
  }
};

// DELETE /pacientes/:id
export const deletePaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.paciente.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Paciente deletado com sucesso" });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao deletar paciente", details: err });
  }
};
