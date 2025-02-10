'use client'
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { PersonaFormValues } from '../interfaces/PersonasForm';
import { getAllPersons } from '../../../personas/actions/get-persons';

interface PersonaProviderProps {
    children: ReactNode;
}

// Definimos el contexto
export const PersonasContext = createContext<PersonaFormValues[]>([]);

const data: PersonaFormValues[] = [
    {
        fullName: 'Juan Pérez',
        gender: 'Masculino',
        dateOfBirth: '1990-05-15',
        bloodType: 'O+',
        educationLevel: 'Universitario',
        community: 'Comunidad 1',
        documents: [
            { documentType: 'Cédula de Identidad', documentNumber: 'V-12345678' },
        ],
        electronicAddresses: [
            { addressType: 'Personal', address: 'juan.perez@email.com' },
            { addressType: 'Trabajo', address: 'juan.perez@empresa.com' },
        ],
        phones: [
            { phoneType: 'Móvil', phoneNumber: '0412-3456789' },
            { phoneType: 'Fijo', phoneNumber: '0212-9876543' },
        ],
        location: {
            houseAddress: 'Calle Ficticia 123',
            parish: 'Parroquia Central',
            municipality: 'Municipio A',
        },
        historyIllness: [
            {
                illnessDescription: 'Gripe',
                dateIllness: '2023-01-15',
                severity: 'Leve',
            },
        ],
        descriptionAllergies: 'Ninguna',
    },
    {
        fullName: 'Ana Gómez',
        gender: 'Femenino',
        dateOfBirth: '1985-08-25',
        bloodType: 'A-',
        educationLevel: 'Secundario',
        community: 'Comunidad 2',
        documents: [
            { documentType: 'Pasaporte', documentNumber: 'P-98765432' },
        ],
        electronicAddresses: [
            { addressType: 'Personal', address: 'ana.gomez@email.com' },
        ],
        phones: [
            { phoneType: 'Móvil', phoneNumber: '0424-1234567' },
        ],
        location: {
            houseAddress: 'Avenida Siempre Viva 456',
            parish: 'Parroquia Sur',
            municipality: 'Municipio B',
        },
        historyIllness: [],
        descriptionAllergies: 'Polen',
    },
    {
        fullName: 'Carlos Martínez',
        gender: 'Masculino',
        dateOfBirth: '2000-03-10',
        bloodType: 'B+',
        educationLevel: 'Técnico',
        community: 'Comunidad 3',
        documents: [
            { documentType: 'Cédula de Identidad', documentNumber: 'V-98765432' },
        ],
        electronicAddresses: [
            { addressType: 'Personal', address: 'carlos.martinez@email.com' },
        ],
        phones: [
            { phoneType: 'Móvil', phoneNumber: '0414-5678901' },
        ],
        location: {
            houseAddress: 'Calle Ejemplo 789',
            parish: 'Parroquia Norte',
            municipality: 'Municipio C',
        },
        historyIllness: [
            {
                illnessDescription: 'Asma',
                dateIllness: '2015-11-20',
                severity: 'Moderado',
            },
        ],
        descriptionAllergies: 'Polvo',
    },
];

export const PersonasProvider: React.FC<PersonaProviderProps> = ({ children }) => {
    const [personas, setPersonas] = useState(data);

    useEffect(() => {
        const fetchPersonas = async () => {
            const response = await getAllPersons()
            setPersonas(response.data);
        };

        fetchPersonas();
    }, []);

    return (
        <PersonasContext.Provider value={personas}>
            {children}
        </PersonasContext.Provider>
    );
};
