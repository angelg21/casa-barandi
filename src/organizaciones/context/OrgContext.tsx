"use client";

import { Company } from "@/src/aliados/interfaces/AliadosSheet";
import { createContext, useContext, useState, ReactNode } from "react";

interface OrgContextType {
    orgs: Company[];
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export function OrgProvider({ children, initialData }: { children: ReactNode; initialData: Company[] }) {
    const [orgs] = useState<Company[]>(initialData);

    return <OrgContext.Provider value={{ orgs }}>{children}</OrgContext.Provider>;
}

export function useOrgs(): Company[] {
    const context = useContext(OrgContext);
    if (!context) {
        throw new Error("useOrgs debe usarse dentro de un OrgProvider");
    }
    return context.orgs;
}