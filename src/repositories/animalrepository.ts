import { Animal, AnimalModel } from "../models/animal";

export class AnimalRepository {
    private animais: Animal[] = [];
    private ultimoId: number = 0;

    /**
     * Cadastra um novo animal
     */
    public criar(dados: Omit<Animal, 'id' | 'criadoEm'>): Animal {
        this.ultimoId++;
        
        const novoAnimal = new AnimalModel(
            this.ultimoId,
            dados.nome,
            dados.especie,
            dados.raca,
            dados.idade,
            dados.sexo,
            dados.porte,  
            dados.descricao,
            dados.imagemUrl,
            dados.usuarioId,
            dados.status || 'DISPONIVEL',
            new Date()
        );

        this.animais.push(novoAnimal);
        return novoAnimal;
    }

    /**
     * Retorna todos os animais cadastrados
     */
    public listarTodos(): AnimalModel[] {
        return this.animais;
    }

    /**
     * Busca um animal pelo ID
     */
    public buscarPorId(id: number): AnimalModel | undefined {
        return this.animais.find(animal => animal.id === id);
    }

    /**
     * Retorna apenas os animais disponíveis para adoção
     */
    public listarDisponiveis(): AnimalModel[] {
        return this.animais.filter(animal => animal.status === 'DISPONIVEL');
    }

    /**
     * Filtra animais por espécie (ex: 'Cachorro', 'Gato')
     */
    public buscarPorEspecie(especie: string): AnimalModel[] {
        return this.animais.filter(
            animal => animal.especie.toLowerCase() === especie.toLowerCase()
        );
    }

    /**
     * Retorna os animais cadastrados por um usuário/ONG específico
     */
    public buscarPorUsuario(usuarioId: number): AnimalModel[] {
        return this.animais.filter(animal => animal.usuarioId === usuarioId);
    }

    /**
     * Atualiza os dados de um animal existente
     */
    public atualizar(id: number, dadosAtualizados: Partial<Animal>): AnimalModel | null {
        const animalIndex = this.animais.findIndex(animal => animal.id === id);
        
        if (animalIndex === -1) {
            return null; // Animal não encontrado
        }

        const animalAtual = this.animais[animalIndex];

        // Mescla os dados antigos com os novos e atualiza a data de modificação
        const animalAtualizado = Object.assign(new AnimalModel(
            animalAtual.id,
            animalAtual.nome,
            animalAtual.especie,
            animalAtual.raca,
            animalAtual.idade,
            animalAtual.sexo,
            animalAtual.porte,
            animalAtual.descricao,
            animalAtual.imagemUrl,
            animalAtual.usuarioId,
            animalAtual.status,
            animalAtual.criadoEm
        ), dadosAtualizados, { atualizadoEm: new Date() });

        this.animais[animalIndex] = animalAtualizado;
        return animalAtualizado;
    }

    /**
     * Remove um animal do sistema
     */
    public deletar(id: number): boolean {
        const animalIndex = this.animais.findIndex(animal => animal.id === id);
        
        if (animalIndex === -1) {
            return false;
        }

        this.animais.splice(animalIndex, 1);
        return true;
    }
}