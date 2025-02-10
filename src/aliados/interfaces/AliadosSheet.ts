

export interface AliadoSheetValues {
    name: string;
    companyName: string;
    rif: string;
    incorporationDate: string;
    terminationDate: string;
    members: AliadoMemberFormValues[];
}

export interface AliadoMemberFormValues {
    id?: string;
    fullName: string;
    ci: string;
    role: string;
}