"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Person } from "../interfaces/BeneficiariosSheet";

interface PersonaContextType {
    persons: Person[];
}

const PersonsContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonProvider({ children, initialData }: { children: ReactNode; initialData: Person[] }) {
    const [persons] = useState<Person[]>(initialData);

    return <PersonsContext.Provider value={{ persons }}>{children}</PersonsContext.Provider>;
}

export function usePersons(): Person[] {
    const context = useContext(PersonsContext);
    if (!context) {
        throw new Error("usePersons debe usarse dentro de un PersonsProvider");
    }
    return context.persons;
}