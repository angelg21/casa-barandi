'use client'

import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { Programa, Ally } from '../../interfaces/Programa';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { AliadosSelectedTable } from "../AliadosSelectedTable/AliadosSelectedTable";
import { useAliados } from "../../context/AliadosContext";

interface SelectAliadosInputProps {
  globalStyle?: string;
}

export const SelectAliadosInput = ({ globalStyle }: SelectAliadosInputProps) => {

  const { values, setFieldValue } = useFormikContext<Programa>();
  const [selectedAliado, setSelectedAliado] = useState<Ally | null>(null);
  const aliadosData = useAliados();
  const [filteredAliados, setFilteredAliados] = useState<Ally[]>(aliadosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('');  // Estado para almacenar el rol

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = aliadosData.filter(aliado => {
      const nameMatch = aliado.name?.toLowerCase().includes(lowerTerm);
      const rifMatch = aliado.rif?.toLowerCase().includes(lowerTerm);
      return nameMatch || rifMatch;
    });
    setFilteredAliados(filtered);
  }, [searchTerm, aliadosData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);  // Actualiza el rol
  };

  const handleAliadoChange = (value: Ally) => {
    setSelectedAliado(value);
    setSearchTerm(value?.name || '');
  };
  
  const handleAddAliado = () => {
    if (selectedAliado && role) {
      const aliadoExiste = values.aliados.some(
        a => a.id === selectedAliado.id
      );

      if (!aliadoExiste) {
        const nuevosAliados = [
          ...values.aliados,
          { id: selectedAliado.id, name: selectedAliado.name, role, rif: selectedAliado.rif }
        ];
        
        setFieldValue('aliados', nuevosAliados);
        setSearchTerm('');
        setRole('');
        setSelectedAliado(null);
      }
    }
  };

  const handleDeleteAliado = (index: number) => {
    const updatedAliados = values.aliados.filter((_, i) => i !== index);
    setFieldValue('aliados', updatedAliados);
  };


  return (
    <div className={`${globalStyle}`}>
      <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Aliados</span>
      <div className="flex flex-col md:flex-row space-x-14">
        <div className="flex flex-col md:flex-row space-x-14">
            <div className="w-full">
            <div className="flex flex-row">
                <div className="flex w-full md:w-[500px]">
                <input
                    type="text"
                    className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md"
                    placeholder={selectedAliado ? selectedAliado.name : 'Seleccionar aliado...'}
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <Listbox value={selectedAliado} onChange={handleAliadoChange}>
                    <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none sm:text-sm sm:leading-6">
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
                            `max-w-[240px] relative cursor-default select-none py-2 pr-4 ${
                            active ? 'bg-cb-green text-white' : 'text-gray-900'
                            }`
                        }
                        >
                        <span className="text-sm font-medium ml-3">{aliado.name}</span>
                        </ListboxOption>
                    ))}
                    </ListboxOptions>
                </Listbox>
                </div>
            </div>
            {/* Input de rol */}
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
                {/* Botón para agregar */}
                <div className="flex mt-8 justify-end">
                    <button type="button" onClick={handleAddAliado} disabled={!searchTerm || !role}>
                    <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
        {/* Tabla de aliados seleccionados */}
        <div className="flex">
            {values.aliados.length > 0 && (
            <AliadosSelectedTable
                aliados={values.aliados}
                onDelete={handleDeleteAliado}
            />
            )}
        </div>
      </div>

    </div>
  );
};