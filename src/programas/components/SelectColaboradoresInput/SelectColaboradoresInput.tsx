'use client'

import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { Programa } from "../../interfaces/Programa";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ColaboradorValues } from "@/src/colaboradores/interfaces/ColaboradoresSheet";
import { ColaboradoresSelectedTable } from "../ColaboradoresSelectedTable/ColaboradoresSelectedTable";

interface SelectColaboradoresInputProps {
    globalStyle?: string;
}

const colaboradoresData: ColaboradorValues[] = [
    {
        id: '1',
      personCi: "V-12345678",
      personName: "Juan Pérez",
      type: "Empleado",
      incorporationDate: "2023-01-15",
      terminationDate: "2024-01-15",
    },
    {
        id: '2',
      personCi: "V-87654321",
      personName: "María Rodríguez",
      type: "Consultor",
      incorporationDate: "2022-05-01",
      terminationDate: "2025-05-01",
    },
    {
        id: '3',
      personCi: "V-56789012",
      personName: "Carlos López",
      type: "Empleado",
      incorporationDate: "2023-03-10",
      terminationDate: "2024-03-10",
    },
    {
        id: '4',
      personCi: "V-24681357",
      personName: "Ana García",
      type: "Freelancer",
      incorporationDate: "2022-11-20",
      terminationDate: "2026-11-20",
    },
    {
        id: '5',
      personCi: "V-13579246",
      personName: "Luis Martínez",
      type: "Empleado",
      incorporationDate: "2023-07-05",
      terminationDate: "2025-07-05",
    },
    {
        id: '6',
      personCi: "V-98765432",
      personName: "Sofía Ramírez",
      type: "Consultor",
      incorporationDate: "2022-02-25",
      terminationDate: "2027-02-25",
    },
    {
        id: '7',
      personCi: "V-76543210",
      personName: "Pedro Sánchez",
      type: "Empleado",
      incorporationDate: "2023-09-18",
      terminationDate: "2024-09-18",
    },
    {
        id: '8',
      personCi: "V-43210987",
      personName: "Laura Díaz",
      type: "Freelancer",
      incorporationDate: "2022-06-08",
      terminationDate: "2028-06-08",
    },
    {
        id: '9',
      personCi: "V-86420975",
      personName: "Miguel Vargas",
      type: "Empleado",
      incorporationDate: "2023-04-12",
      terminationDate: "2025-04-12",
    },
    {
        id: '10',
      personCi: "V-28574196",
      personName: "Isabella Torres",
      type: "Consultor",
      incorporationDate: "2022-12-01",
      terminationDate: "2026-12-01",
    },
  ];
  




export const SelectColaboradoresInput = ({ globalStyle }: SelectColaboradoresInputProps) => {

    const { values, setFieldValue } = useFormikContext<Programa>();
    const [selectedColaborador, setSelectedColaborador] = useState<ColaboradorValues | null>();
    const [colaboradores, setColaboradores] = useState<ColaboradorValues[]>([]);
    const [filteredColaboradores, setFilteredColaboradores] = useState<ColaboradorValues[]>(colaboradoresData);
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda


    const handleColaboradorChange = (value: ColaboradorValues) => {
        setSelectedColaborador(value);
    };

    const handleAddColaborador = () => {
        if (selectedColaborador) {
            // Verificar si el aliado ya existe en el array
            const colaboradorExists = values.colaboradores.some(colaborador => colaborador.id === selectedColaborador.id);
    
            if (!colaboradorExists) {
                // Si el aliado no existe, lo agregamos
                const nuevosColaboradores = [...colaboradores, selectedColaborador];
                setColaboradores(nuevosColaboradores);
                setFieldValue('colaboradores', nuevosColaboradores);
                setSearchTerm('');
                setSelectedColaborador(null);
            } else {
                console.log("El colaborador ya existe en la lista.");
                // Opcional: Mostrar un mensaje al usuario indicando que el aliado ya existe
            }
        }
    };

    const handleDeleteColaborador = (index: number) => {
        const updatedColaboradores = colaboradores.filter((_, i) => i !== index);
        setColaboradores(updatedColaboradores);
        setFieldValue('colaboradores', updatedColaboradores);
    };



    useEffect(() => {

        const filtered = colaboradoresData.filter(colaborador =>
            colaborador.personName && colaborador.personName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredColaboradores(filtered);
    }, [selectedColaborador, searchTerm, colaboradoresData]);

    return (
        <div className={`${globalStyle}`}>
            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Colaboradores</span>
            <div className="flex flex-col md:flex-row space-x-14">
                <div className="mb-3">
                    <div className="flex flex-row mt-2 ">
                        <div className="flex w-full md:w-[350px]"> {/* Contenedor para el input y el botón */}
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md" // Estilos para el input
                                placeholder={selectedColaborador ? selectedColaborador?.personName : 'Seleccionar colaborador...'}
                                value={searchTerm}
                                //onChange={handleInputChange}
                            />
                            <Listbox
                                value={selectedColaborador}
                                onChange={handleColaboradorChange}
                            >
                                <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none  sm:text-sm sm:leading-6">
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
                                            <span className="text-sm font-medium ml-3">{colaborador.personName}</span>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Listbox>
                            <div className="flex ml-6">
                                <button type="button" onClick={handleAddColaborador}>
                                    <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {values.colaboradores.length >= 0 &&
                        <ColaboradoresSelectedTable
                            onDelete={handleDeleteColaborador}
                        />
                    }
                </div>
            </div>
        </div>
    );
};
