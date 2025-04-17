export interface Servicio {
    id?: string;
    description: string;
    type: string;
    subtype: string;
    prescriptions: Presciption[];
    results: Result[];
    precautions: Precaution[]
}


export interface Presciption {
    id?: string;
    prescriptionName: string;
}

export interface Result {
    id?: string;
    name: string;
}

export interface Precaution {
    id?: string;
    name: string;
    type: string;
    precautiontMetadata: PrecautionMetadataValue | PrecautionMetadataMinMax | PrecautionMetadataEnum;
}

export interface PrecautionMetadataValue {
    unidad: string;
}

export interface PrecautionMetadataMinMax {
    unidad?: string;
}

export interface PrecautionMetadataEnum {
    opciones: string[];
}