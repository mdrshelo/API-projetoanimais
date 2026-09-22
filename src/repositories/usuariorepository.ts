export interface Usuario {
    id?: string;
    nome: string;
    email: string;
    criadoEm?: Date;
  }
  
  export class UsuarioRepository {
    private usuarios: Usuario[] = [];
  
    // Criar utilizador
    async criar(usuario: Usuario): Promise<Usuario> {
      const novoUsuario = {
        ...usuario,
        id: Math.random().toString(36).substring(2, 9),
        criadoEm: new Date()
      };
      this.usuarios.push(novoUsuario);
      return novoUsuario;
    }
  
    // Listar todos os utilizadores
    async listarTodos(): Promise<Usuario[]> {
      return this.usuarios;
    }
  
    // Buscar utilizador por ID
    async buscarPorId(id: string): Promise<Usuario | undefined> {
      return this.usuarios.find(u => u.id === id);
    }
  
    // Atualizar utilizador
    async atualizar(id: string, dados: Partial<Usuario>): Promise<Usuario | null> {
      const index = this.usuarios.findIndex(u => u.id === id);
      if (index === -1) return null;
  
      this.usuarios[index] = { ...this.usuarios[index], ...dados };
      return this.usuarios[index];
    }
  
    // Remover utilizador
    async eliminar(id: string): Promise<boolean> {
      const index = this.usuarios.findIndex(u => u.id === id);
      if (index === -1) return false;
  
      this.usuarios.splice(index, 1);
      return true;
    }
  }