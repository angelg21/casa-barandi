import { AliadoValues } from "@/src/aliados/interfaces/AliadosSheet";
import { ColaboradorValues } from "@/src/colaboradores/interfaces/ColaboradoresSheet";

export interface Programa {
    id?: string;
    description: string;
    dateStart: string;
    timeStart: string;
    timeEnd: string;
    peopleLimit: number;
    community: string;
    aliados: AliadoValues[];
    colaboradores: ColaboradorValues[];
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