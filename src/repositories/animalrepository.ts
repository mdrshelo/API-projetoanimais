export interface Animal {
    id?: string;
    nome: string;
    especie: string;
    raca?: string;
    idade?: number;
    criadoEm?: Date;
  }
  
  export class AnimalRepository {
    private animais: Animal[] = [];
  
    // Criar animal
    async criar(animal: Animal): Promise<Animal> {
      const novoAnimal = {
        ...animal,
        id: Math.random().toString(36).substring(2, 9),
        criadoEm: new Date()
      };
      this.animais.push(novoAnimal);
      return novoAnimal;
    }
  
    // Listar todos os animais
    async listarTodos(): Promise<Animal[]> {
      return this.animais;
    }
  
    // Buscar animal por ID
    async buscarPorId(id: string): Promise<Animal | undefined> {
      return this.animais.find(a => a.id === id);
    }
  
    // Atualizar animal
    async atualizar(id: string, dados: Partial<Animal>): Promise<Animal | null> {
      const index = this.animais.findIndex(a => a.id === id);
      if (index === -1) return null;
  
      this.animais[index] = { ...this.animais[index], ...dados };
      return this.animais[index];
    }
  
    // Remover animal
    async eliminar(id: string): Promise<boolean> {
      const index = this.animais.findIndex(a => a.id === id);
      if (index === -1) return false;
  
      this.animais.splice(index, 1);
      return true;
    }
  }