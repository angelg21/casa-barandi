"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AliadosFilteredSheets } from "../AliadosFilteredSheets/AliadosFilteredSheets";
import { AliadoSheetValues } from "../../interfaces/AliadosSheet";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";

const aliadosData: AliadoSheetValues[] = [
    {
        name: "Aliado 1",
        companyName: "Empresa Ejemplo 1",
        rif: "J-12345678-9",
        incorporationDate: "2020-01-15",
        terminationDate: "2024-01-15",
        members: [
            {
                fullName: "Juan Pérez",
                ci: "V-12345678",
                role: "Gerente General",
            },
            {
                fullName: "María Rodríguez",
                ci: "V-87654321",
                role: "Gerente de Ventas",
            },
            {
                fullName: "Carlos López",
                ci: "V-56789012",
                role: "Analista de Sistemas",
            },
            {
                fullName: "Ana García",
                ci: "V-24681357",
                role: "Asistente Administrativo",
            },
            {
                fullName: "Luis Martínez",
                ci: "V-13579246",
                role: "Contador",
            },
        ],
    },
    {
        name: "Aliado 2",
        companyName: "Otra Empresa",
        rif: "G-98765432-1",
        incorporationDate: "2019-05-01",
        terminationDate: "2025-05-01",
        members: [
            {
                fullName: "Ana Gómez",
                ci: "V-23456789",
                role: "Directora de Marketing",
            },
            {
                fullName: "Pedro Sánchez",
                ci: "V-98765432",
                role: "Jefe de Producción",
            },
            {
                fullName: "Sofía Ramírez",
                ci: "V-76543210",
                role: "Diseñadora Gráfica",
            },
            {
                fullName: "José Fernández",
                ci: "V-43210987",
                role: "Programador",
            },
            {
                fullName: "Laura Díaz",
                ci: "V-86420975",
                role: "Especialista en RRHH",
            },
        ],
    },
    {
        name: "Aliado 3",
        companyName: "Nueva Empresa",
        rif: "J-87654321-0",
        incorporationDate: "2021-11-10",
        terminationDate: "2026-11-10",
        members: [
            {
                fullName: "Pedro Sánchez",
                ci: "V-98765432",
                role: "Presidente",
            },
            {
                fullName: "Carla Morales",
                ci: "V-65432109",
                role: "Vicepresidenta",
            },
            {
                fullName: "Miguel Vargas",
                ci: "V-32109876",
                role: "Tesorero",
            },
            {
                fullName: "Isabella Torres",
                ci: "V-97531864",
                role: "Secretaria",
            },
            {
                fullName: "Javier Castro",
                ci: "V-28574196",
                role: "Vocal",
            },
        ],
    },
];

export default aliadosData;


export const Details = () => {

    const router = useRouter();

    const handleAddAliado = () => {
        router.push(`/dashboard/formularios/aliados/voluntarios`); // Al presionar el botón, mostrar el formulario
    };

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="h-calc(100vh) overflow-y-auto px-1">
                <div>
                    <div className='flex flex-col px-6 py-6 sm:px-14 xl:px-16'>
                        <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Aliados</h2>
                        <div
                            className='w-full flex justify-end items-end'
                            onClick={() => handleAddAliado()}
                        >
                            <ButtonWithIconLeft
                                title="Agregar Aliado"
                                textColor="text-white"
                                backgroundColor="bg-cb-green"
                                hover="hover:bg-d-green-light"
                                icon={<PlusIcon />}
                                iconColor="text-white"
                            />
                        </div>
                        <AliadosFilteredSheets
                            aliados={aliadosData}
                        />
                    </div>
                </div>
            </div>
        </AlertProvider>
    )
}
