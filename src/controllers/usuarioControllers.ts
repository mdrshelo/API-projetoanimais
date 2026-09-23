import { Request, Response } from 'express';
import { UsuarioRepository } from '../repositories/usuariorepository';

const usuarioRepository = new UsuarioRepository();

export class UsuarioController {
  // Criar um novo usuário
  async criar(req: Request, res: Response) {
    try {
      const novoUsuario = await usuarioRepository.criar(req.body);
      return res.status(201).json(novoUsuario);
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message || 'Erro ao criar usuário' });
    }
  }

  // Listar todos os usuários
  async listar(req: Request, res: Response) {
    try {
      const usuarios = await usuarioRepository.listarTodos();
      return res.status(200).json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ mensagem: 'Erro ao listar usuários' });
    }
  }

  // Buscar usuário por ID (Sem o erro de tipagem)
  async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id); // Força a conversão do parâmetro para string
      const usuario = await usuarioRepository.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      return res.status(200).json(usuario);
    } catch (error: any) {
      return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
  }

  // Atualizar usuário
  async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id); // Força a conversão do parâmetro para string
      const usuarioAtualizado = await usuarioRepository.atualizar(id, req.body);
      return res.status(200).json(usuarioAtualizado);
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message || 'Erro ao atualizar usuário' });
    }
  }

  // Excluir usuário
  async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id); // Força a conversão do parâmetro para string
      await usuarioRepository.eliminar(id);
      return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message || 'Erro ao deletar usuário' });
    }
  }
}