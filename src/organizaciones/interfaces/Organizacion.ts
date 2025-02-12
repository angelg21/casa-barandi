export interface Organizacion {
    id?: string;
    rif: string;
    razon_social: string;
    phones: {
        phoneType: string;
        phoneNumber: string;
    }[];
    electronicAddresses: {
        addressType: string;
        address: string;
    }[];
}