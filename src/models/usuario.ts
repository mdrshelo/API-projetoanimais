export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senhaHash: string;
    ativo: boolean;
    criadoEm: Date;
    atualizadoEm?: Date;
  }
  
  // Classe com método para ocultar a senha em respostas de API
  export class UsuarioModel implements Usuario {
    id: number;
    nome: string;
    email: string;
    senhaHash: string;
    ativo: boolean;
    criadoEm: Date;
    atualizadoEm?: Date;
  
    constructor(
      id: number,
      nome: string,
      email: string,
      senhaHash: string,
      ativo: boolean = true,
      criadoEm: Date = new Date()
    ) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senhaHash = senhaHash;
      this.ativo = ativo;
      this.criadoEm = criadoEm;
    }
  
    // Retorna os dados do usuário sem a senha (segurança)
    public toJSON() {
      const { senhaHash, ...usuarioSemSenha } = this;
      return usuarioSemSenha;
    }
  }