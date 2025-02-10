

export interface PersonasValues {
    personas: PersonaFormValues[];
}

export interface PersonaFormValues {
    id?: string;
    fullName: string;
    gender: string;
    dateOfBirth: string;
    bloodType: string;
    educationLevel: string;
    community: string;
    documents: {
        documentType: string;
        documentNumber: string;
    }[];
    electronicAddresses: {
        addressType: string;
        address: string;
    }[];
    phones: {
        phoneType: string;
        phoneNumber: string;
    }[];
    location: {
        houseAddress: string;
        parish: string;
        municipality: string;
    };
    historyIllness: {
        illnessDescription: string;
        dateIllness: string;
        severity: string;
    }[];
    descriptionAllergies: string; 
}