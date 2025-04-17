"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Collaborator } from "../interfaces/Programa";

interface ColaboradoresContextType {
    colaboradores: Collaborator[];
}

const ColaboradoresContext = createContext<ColaboradoresContextType | undefined>(undefined);

export function ColaboradoresProvider({ children, initialData }: { children: ReactNode; initialData: Collaborator[] }) {
    const [colaboradores] = useState<Collaborator[]>(initialData);

    return <ColaboradoresContext.Provider value={{ colaboradores }}>{children}</ColaboradoresContext.Provider>;
}

export function useColaboradores(): Collaborator[] {
    const context = useContext(ColaboradoresContext);
    if (!context) {
        throw new Error("useColaboradores debe usarse dentro de un ColaboradoresProvider");
    }
    return context.colaboradores;
}