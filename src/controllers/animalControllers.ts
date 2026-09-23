import { Request, Response } from 'express';
import { AnimalRepository } from '../repositories/animalrepository';

const animalRepository = new AnimalRepository();

export class AnimalController {
  // Criar um novo animal
  async criar(req: Request, res: Response) {
    try {
      const novoAnimal = await animalRepository.criar(req.body);
      return res.status(201).json(novoAnimal);
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message || 'Erro ao cadastrar animal' });
    }
  }

  // Listar todos os animais
  async listar(req: Request, res: Response) {
    try {
      const animais = await animalRepository.listarTodos();
      return res.status(200).json(animais);
    } catch (error: any) {
      return res.status(500).json({ mensagem: 'Erro ao listar animais' });
    }
  }

  // Buscar animal por ID (Corrigido usando Number)
  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id); // Converte para número para alinhar com o repositório
      const animal = await animalRepository.buscarPorId(id);

      if (!animal) {
        return res.status(404).json({ mensagem: 'Animal não encontrado' });
      }

      return res.status(200).json(animal);
    } catch (error: any) {
      return res.status(500).json({ mensagem: 'Erro ao buscar animal' });
    }
  }

  // Atualizar animal
  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id); // Converte para número
      const animalAtualizado = await animalRepository.atualizar(id, req.body);
      return res.status(200).json(animalAtualizado);
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message || 'Erro ao atualizar animal' });
    }
  }

  // Deletar animal
  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id); // Converte para número
      await animalRepository.deletar(id);
      return res.status(200).json({ mensagem: 'Animal removido com sucesso' });
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message || 'Erro ao deletar animal' });
    }
  }
}