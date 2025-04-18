export interface Programa {
    id?: string;
    description: string;
    dateStart: string;
    timeStart: string;
    timeEnd: string;
    peopleLimit: number;
    community: string;
    address: string;          
    state: string;            
    observation?: string;     
    serviceId: string;        
    aliados: Array<Ally>;
    colaboradores: Array<Collaborator>;
  }

export interface Cita {
    id?: string;
    person: {
        id: string;
        name: string;
        ci?: string;
    }
    representative?: {
        id: string;
        name: string;
        ci: string;
        related: string;
    }
    dateMade: string;
    dateConfirmation: string;
    confirmed: boolean;
}
 
export interface PersonCita {
    id: string;
    name: string;
    ci?: string
}

export interface Ally {
    id: string;
    name: string;
    rif: string;
    role?: string;
}

export interface CollaboratorDocument {
    documentType: string;
    documentNumber: string;
}

export interface Collaborator {
    id: string;
    name: string;
    role?: string
    documents: CollaboratorDocument[];
}

export interface Service {
    id: string;
    name: string;
}