"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Service } from '../interfaces/Programa';

type ServiceContextType = {
    services: Service[];
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children, initialData }: { children: ReactNode, initialData: Service[] }) => {
    const [services, setServices] = useState<Service[]>(initialData);
    return (
        <ServiceContext.Provider value={{ services, setServices }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useService = (): ServiceContextType => {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useServiceContext must be used within a ServiceProvider');
    }
    return context;
};
