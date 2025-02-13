import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { AliadoValues, Company } from "../../interfaces/AliadosSheet";




interface CompanySelectProps {
    title: string;
    companies: Company[];
}

const SelectCompanyInput: React.FC<CompanySelectProps> = ({ title, companies }) => {

    const { values, setFieldValue, handleChange } = useFormikContext<AliadoValues>();
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const inputRef = useRef<HTMLInputElement>(null);
    // Ref para el input dentro del botón

    useEffect(() => {
        if (values.companyName != '') {
            const company: Company = {
                id: values.companyId,
                name: values.companyName || '',
            };
            setSelectedCompany(company);
        }
        const filtered = companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(filtered);
    }, [searchTerm, companies, ]); // El efecto se ejecuta cuando searchTerm o companies cambian

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="mb-3">
            <span className="block text-sm font-medium leading-6 text-gray-900">{title}</span>
            <div className="relative mt-2">
                <div className="flex w-full"> {/* Contenedor para el input y el botón */}
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md" // Estilos para el input
                        placeholder={ values.companyName != '' ? values.companyName : 'Seleccionar organización...'}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <Listbox
                        value={selectedCompany}
                        onChange={(value: Company | null) => {
                            setSearchTerm(''); // Limpia el término de búsqueda al seleccionar una opción
                            setSelectedCompany(value);
                            setFieldValue('companyId', value ? value.id : '');
                            setFieldValue('companyName', value ? value.name : '');
                            handleChange('companyId');
                            if (inputRef.current) {
                                inputRef.current.blur(); // Quita el foco del input
                            }
                        }}
                    >
                        <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none  sm:text-sm sm:leading-6">
                            <span className="pointer-events-none flex items-center">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                        </ListboxButton>
                        <ListboxOptions className="py-1 text-base font-medium text-gray-900 absolute z-10 w-full rounded-md bg-white shadow-lg overflow-y-auto max-h-60 mt-10">
                            {filteredCompanies.map((company) => (
                                <ListboxOption
                                    key={company.id}
                                    value={company}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pr-4 ${active ? 'bg-cb-green text-white' : 'text-gray-900'
                                        }`
                                    }
                                >
                                    <span className="text-sm font-medium ml-3">{company.name}</span>
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
            </div>
        </div>
    )
}

export default SelectCompanyInput;