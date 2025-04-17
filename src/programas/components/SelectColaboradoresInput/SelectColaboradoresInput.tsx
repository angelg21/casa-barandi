'use client'

import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { Programa, Collaborator } from '../../interfaces/Programa';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ColaboradoresSelectedTable } from "../ColaboradoresSelectedTable/ColaboradoresSelectedTable";
import { useColaboradores } from "../../context/ColaboradoresContext";

interface SelectColaboradoresInputProps {
    globalStyle?: string;
}

export const SelectColaboradoresInput = ({ globalStyle }: SelectColaboradoresInputProps) => {
    const { values, setFieldValue } = useFormikContext<Programa>();
    const [selectedColaborador, setSelectedColaborador] = useState<Collaborator | null>(null);
    const colaboradoresData = useColaboradores();
    const [filteredColaboradores, setFilteredColaboradores] = useState<Collaborator[]>(colaboradoresData);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = colaboradoresData.filter(colaborador => {
            const nameMatch = colaborador.name?.toLowerCase().includes(lowerTerm);
            return nameMatch;
        });
        setFilteredColaboradores(filtered);
    }, [searchTerm, colaboradoresData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const handleColaboradorChange = (value: Collaborator) => {
        setSelectedColaborador(value);
        setSearchTerm(value?.name || '');
    };

    const handleAddColaborador = () => {
        if (selectedColaborador && role) {
            const colaboradorExiste = values.colaboradores.some(
                c => c.id === selectedColaborador.id
            );

            if (!colaboradorExiste) {
                const nuevosColaboradores = [
                    ...values.colaboradores,
                    { id: selectedColaborador.id, name: selectedColaborador.name, role, documents: selectedColaborador.documents }
                ];
                
                setFieldValue('colaboradores', nuevosColaboradores);
                setSearchTerm('');
                setRole('');
                setSelectedColaborador(null);
            }
        }
    };

    const handleDeleteColaborador = (index: number) => {
        const updatedColaboradores = values.colaboradores.filter((_, i) => i !== index);
        setFieldValue('colaboradores', updatedColaboradores);
    };

    return (
        <div className={`${globalStyle}`}>
            <span className="flex text-gray-900 text-sm font-medium leading-6 mb-2">Colaboradores</span>
            <div className="flex flex-col md:flex-row space-x-14">
                <div className="flex flex-col md:flex-row space-x-14">
                    <div className="w-full">
                        <div className="flex flex-row">
                            <div className="flex w-full md:w-[500px]">
                                <input
                                    type="text"
                                    className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md"
                                    placeholder={selectedColaborador ? selectedColaborador.name : 'Seleccionar colaborador...'}
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                                <Listbox value={selectedColaborador} onChange={handleColaboradorChange}>
                                    <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none sm:text-sm sm:leading-6">
                                        <span className="pointer-events-none flex items-center">
                                            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                        </span>
                                    </ListboxButton>
                                    <ListboxOptions className="py-1 text-base font-medium text-gray-900 absolute z-10 w-full max-w-[240px] rounded-md bg-white shadow-lg overflow-y-auto max-h-60 mt-10">
                                        {filteredColaboradores.map((colaborador, index) => (
                                            <ListboxOption
                                                key={index}
                                                value={colaborador}
                                                className={({ active }) =>
                                                    `max-w-[240px] relative cursor-default select-none py-2 pr-4 ${active ? 'bg-cb-green text-white' : 'text-gray-900'
                                                    }`
                                                }
                                            >
                                                <span className="text-sm font-medium ml-3">{colaborador.name}</span>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            </div>
                        </div>
                        <div className="md:w-[500px]">
                            <div className="mt-4">
                                <input
                                    type="text"
                                    className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-md"
                                    placeholder="Ingrese el rol"
                                    value={role}
                                    onChange={handleRoleChange}
                                />
                            </div>
                            <div className="flex mt-8 justify-end">
                                <button type="button" onClick={handleAddColaborador} disabled={!searchTerm || !role}>
                                    <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    {values.colaboradores.length > 0 && (
                        <ColaboradoresSelectedTable
                            colaboradores={values.colaboradores}
                            onDelete={handleDeleteColaborador}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};