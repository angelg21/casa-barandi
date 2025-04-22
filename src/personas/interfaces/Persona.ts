export interface Persona {
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
    organizationId: string,
    role: string,
    familyRepresentativeId: string,
    relationship: string,
    representados?: {
        fullName: string;
        relationship: string;
    }[];
    representative?: {
        fullName: string;
        documents: {
            documentType: string;
            documentNumber: string;
        }[];
        phones: {
            phoneType: string;
            phoneNumber: string;
        }[];
        relationship: string;
    };
}

export interface Person {
    ci: string;
    name: string;
}