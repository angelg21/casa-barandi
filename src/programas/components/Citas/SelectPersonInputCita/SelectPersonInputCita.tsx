'use client';

import { useFormikContext } from "formik";
import { useEffect, useState, useRef } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PersonCita } from "@/src/programas/interfaces/Programa";

interface PersonSelectProps {
    title: string;
    people: any[]; // Aquí es un array de personas con representantes y representados
}

export const SelectPersonInputCita = ({ title, people }: PersonSelectProps) => {
    const { values, setFieldValue, handleChange } = useFormikContext();
    const [selectedPerson, setSelectedPerson] = useState<PersonCita | null>(null);
    const [filteredPeople, setFilteredPeople] = useState<any[]>(people);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const inputRef = useRef<HTMLInputElement>(null);

    // Filtra los representantes y sus dependientes basado en el término de búsqueda
    useEffect(() => {
        const filtered = people.filter(person => {
            // Filtra por los documentos del representante o nombre
            const representativeMatches = person.representative?.documents.some((doc: any) =>
                doc.documentNumber.includes(searchTerm)
            );
            const nameMatches = person.representative?.fullName.toLowerCase().includes(searchTerm.toLowerCase());

            const dependentsMatches = person.representados?.some((dep: any) =>
                dep.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return representativeMatches || nameMatches || dependentsMatches;
        });
        setFilteredPeople(filtered);
    }, [searchTerm, people]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="mb-3">
            <span className="block text-sm font-medium leading-6 text-gray-900">{title}</span>
            <div className="relative mt-2">
                <div className="flex w-full">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md"
                        placeholder={values.person.name != '' ? values.person.name : 'Seleccionar persona...'}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <Listbox
                        value={selectedPerson}
                        onChange={(value: PersonCita | null) => {
                            setSearchTerm(''); // Limpia el término de búsqueda al seleccionar una opción
                            setSelectedPerson(value);
                            setFieldValue('person.id', value ? value.id : '');
                            setFieldValue('person.name', value ? value.name : '');
                            setFieldValue('person.ci', value ? value.ci : '');
                            handleChange('personId');
                            if (inputRef.current) {
                                inputRef.current.blur(); // Quita el foco del input
                            }
                        }}
                    >
                        <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none sm:text-sm sm:leading-6">
                            <span className="pointer-events-none flex items-center">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                        </ListboxButton>
                        <ListboxOptions className="py-1 text-base font-medium text-gray-900 absolute z-10 w-full rounded-md bg-white shadow-lg overflow-y-auto max-h-60 mt-10">
                            {filteredPeople.map((person) => (
                                <>
                                    {/* Representante */}
                                    <ListboxOption
                                        key={person.representative.id}
                                        value={person.representative}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pr-4 ${active ? 'bg-cb-green text-white' : 'text-gray-900'}`}
                                    >
                                        <span className="text-sm font-medium ml-3">{person.representative.fullName}</span>
                                    </ListboxOption>

                                    {/* Representados */}
                                    {person.representados?.map((dep: any, index: number) => (
                                        <ListboxOption
                                            key={dep.id}
                                            value={dep}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pr-4 pl-8 ${active ? 'bg-cb-green text-white' : 'text-gray-900'}`}
                                        >
                                            <span className="text-sm font-medium ml-3">{dep.fullName} - {dep.relationship}</span>
                                        </ListboxOption>
                                    ))}
                                </>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
            </div>
        </div>
    );
}