export type StatusAdocao = 'DISPONIVEL' | 'EM_ANALISE' | 'ADOTADO';
export type SexoAnimal = 'MACHO' | 'FEMEA';
export type PorteAnimal = 'PEQUENO' | 'MEDIO' | 'GRANDE';

export interface Animal {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: number; // Pode ser em anos ou meses, especificado na UI
    sexo: SexoAnimal | string;
    porte: PorteAnimal | string;
    descricao: string;
    imagemUrl: string;
    
    // --- Adições essenciais para o funcionamento do site ---
    status: StatusAdocao;          // Controla se o animal ainda está disponível para adoção
    usuarioId: number;             // Relacionamento: ID do usuário/ong que cadastrou o animal
    criadoEm: Date;                // Auditoria de cadastro
    atualizadoEm?: Date;           // Auditoria de atualização
}

// Classe opcional caso queira padronizar o comportamento igual ao UsuarioModel
export class AnimalModel implements Animal {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    sexo: string;
    porte: string;
    descricao: string;
    imagemUrl: string;
    status: StatusAdocao;
    usuarioId: number;
    criadoEm: Date;
    atualizadoEm?: Date;

    constructor(
        id: number,
        nome: string,
        especie: string,
        raca: string,
        idade: number,
        sexo: string,
        porte: string,
        descricao: string,
        imagemUrl: string,
        usuarioId: number,
        status: StatusAdocao = 'DISPONIVEL',
        criadoEm: Date = new Date()
    ) {
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.raca = raca;
        this.idade = idade;
        this.sexo = sexo;
        this.porte = porte;
        this.descricao = descricao;
        this.imagemUrl = imagemUrl;
        this.usuarioId = usuarioId;
        this.status = status;
        this.criadoEm = criadoEm;
    }
}