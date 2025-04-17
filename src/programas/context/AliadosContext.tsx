"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Ally } from "../interfaces/Programa";

interface AliadosContextType {
    aliados: Ally[];
}

const AliadosContext = createContext<AliadosContextType | undefined>(undefined);

export function AliadosProvider({ children, initialData }: { children: ReactNode; initialData: Ally[] }) {
    const [aliados] = useState<Ally[]>(initialData);

    return <AliadosContext.Provider value={{ aliados }}>{children}</AliadosContext.Provider>;
}

export function useAliados(): Ally[] {
    const context = useContext(AliadosContext);
    if (!context) {
        throw new Error("useAliados debe usarse dentro de un AliadosProvider");
    }
    return context.aliados;
}