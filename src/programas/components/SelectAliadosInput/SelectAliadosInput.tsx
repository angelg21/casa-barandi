'use client'

import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { Programa } from "../../interfaces/Programa";
import { AliadoValues } from "@/src/aliados/interfaces/AliadosSheet";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { AliadosSelectedTable } from "../AliadosSelectedTable/AliadosSelectedTable";

interface SelectAliadosInputProps {
    globalStyle?: string;
}

const aliadosData: AliadoValues[] = [
    {
        id: "1",
        incorporationDate: "2023-01-15",
        terminationDate: "2025-12-31",
        type: "Empresa",
        rif: "J-12345678-9",
        razon_social: "Desarrollos Web Avanzados C.A.",
        phones: [
            { phoneType: "Oficina", phoneNumber: "0212-1234567" },
            { phoneType: "Móvil", phoneNumber: "0412-1234567" },
        ],
        electronicAddresses: [
            { addressType: "Correo", address: "info@desarrollosweb.com" },
            { addressType: "Sitio Web", address: "www.desarrollosweb.com" },
        ],
    },
    {
        id: "2",
        incorporationDate: "2022-05-01",
        terminationDate: "2024-10-31",
        type: "Comunidad",
        rif: "G-98765432-1",
        razon_social: "Comunidad React Venezuela",
        phones: [
            { phoneType: "Móvil", phoneNumber: "0424-9876543" },
        ],
        electronicAddresses: [
            { addressType: "Correo", address: "reactvenezuela@gmail.com" },
            { addressType: "Discord", address: "discord.gg/reactvz" },
        ],
    },
    {
        id: "3",
        incorporationDate: "2023-03-10",
        terminationDate: "2026-06-30",
        type: "Institución",
        rif: "J-56789012-3",
        razon_social: "Instituto de Investigación en IA",
        phones: [
            { phoneType: "Oficina", phoneNumber: "0212-5678901" },
        ],
        electronicAddresses: [
            { addressType: "Correo", address: "investigacionia@instituto.edu.ve" },
            { addressType: "Sitio Web", address: "www.institutoia.edu.ve" },
        ],
    },
    {
        id: "4",
        incorporationDate: "2022-11-20",
        terminationDate: "2027-09-30",
        type: "ONG",
        rif: "G-24681357-9",
        razon_social: "Fundación Ayuda Digital",
        phones: [
            { phoneType: "Móvil", phoneNumber: "0416-2468135" },
        ],
        electronicAddresses: [
            { addressType: "Correo", address: "ayudadigital@fundacion.org" },
            { addressType: "Facebook", address: "facebook.com/ayudadigital" },
        ],
    },
    {
        id: "5",
        incorporationDate: "2023-07-05",
        terminationDate: "2025-08-31",
        type: "Empresa",
        rif: "J-13579246-8",
        razon_social: "Marketing Digital Avanzado",
        phones: [
            { phoneType: "Oficina", phoneNumber: "0212-1357924" },
            { phoneType: "Móvil", phoneNumber: "0412-1357924" },
        ],
        electronicAddresses: [
            { addressType: "Correo", address: "marketing@marketingdigital.com" },
            { addressType: "Sitio Web", address: "www.marketingdigital.com" },
        ],
    },
];



export const SelectAliadosInput = ({ globalStyle }: SelectAliadosInputProps) => {

    const { values, setFieldValue } = useFormikContext<Programa>();
    const [selectedAliado, setSelectedAliado] = useState<AliadoValues | null>();
    const [aliados, setAliados] = useState<AliadoValues[]>([]);
    const [filteredAliados, setFilteredAliados] = useState<AliadoValues[]>(aliadosData);
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda


    const handleAliadoChange = (value: AliadoValues) => {
        setSelectedAliado(value);
    };

    const handleAddAliado = () => {
        if (selectedAliado) {
            // Verificar si el aliado ya existe en el array
            const aliadoExiste = values.aliados.some(aliado => aliado.id === selectedAliado.id);
    
            if (!aliadoExiste) {
                // Si el aliado no existe, lo agregamos
                const nuevosAliados = [...aliados, selectedAliado];
                setAliados(nuevosAliados);
                setFieldValue('aliados', nuevosAliados);
                setSearchTerm('');
                setSelectedAliado(null);
            } else {
                console.log("El aliado ya existe en la lista.");
                // Opcional: Mostrar un mensaje al usuario indicando que el aliado ya existe
            }
        }
    };

    const handleDeleteAliado = (index: number) => {
        const updatedAliados = aliados.filter((_, i) => i !== index);
        setAliados(updatedAliados);
        setFieldValue('aliados', updatedAliados);
    };



    useEffect(() => {

        const filtered = aliadosData.filter(aliado =>
            aliado.razon_social && aliado.razon_social.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAliados(filtered);
    }, [selectedAliado, searchTerm, aliadosData]);

    return (
        <div className={`${globalStyle}`}>
            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Aliados</span>
            <div className="flex flex-col md:flex-row space-x-14">
                <div className="mb-3">
                    <div className="flex flex-row mt-2 ">
                        <div className="flex w-full md:w-[350px]"> {/* Contenedor para el input y el botón */}
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md" // Estilos para el input
                                placeholder={selectedAliado ? selectedAliado?.razon_social : 'Seleccionar aliado...'}
                                value={searchTerm}
                                //onChange={handleInputChange}
                            />
                            <Listbox
                                value={selectedAliado}
                                onChange={handleAliadoChange}
                            >
                                <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none  sm:text-sm sm:leading-6">
                                    <span className="pointer-events-none flex items-center">
                                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                    </span>
                                </ListboxButton>
                                <ListboxOptions className="py-1 text-base font-medium text-gray-900 absolute z-10 w-full max-w-[240px] rounded-md bg-white shadow-lg overflow-y-auto max-h-60 mt-10">
                                    {filteredAliados.map((aliado, index) => (
                                        <ListboxOption
                                            key={index}
                                            value={aliado}
                                            className={({ active }) =>
                                                `max-w-[240px] relative cursor-default select-none py-2 pr-4 ${active ? 'bg-cb-green text-white' : 'text-gray-900'
                                                }`
                                            }
                                        >
                                            <span className="text-sm font-medium ml-3">{aliado.razon_social}</span>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Listbox>
                            <div className="flex ml-6">
                                <button type="button" onClick={handleAddAliado}>
                                    <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {values.aliados.length >= 0 &&
                        <AliadosSelectedTable
                            onDelete={handleDeleteAliado}
                        />
                    }
                </div>
            </div>
        </div>
    );
};
