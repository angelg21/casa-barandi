

export interface AliadoValues {
    id?: string;
    companyId?: string;
    incorporationDate: string;
    terminationDate: string;
    type: string;
    rif?: string;
    razon_social?: string;
    phones?: {
        phoneType: string;
        phoneNumber: string;
    }[];
    electronicAddresses?: {
        addressType: string;
        address: string;
    }[];
}

export interface Company {
    id: string;
    name: string;
}
