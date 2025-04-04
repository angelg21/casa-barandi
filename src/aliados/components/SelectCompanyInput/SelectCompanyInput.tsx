import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

export interface Company {
  id: string;
  name: string;
}

/**
 * Props genéricos que aceptan cualquier tipo de Formik Values (FormValues).
 * - `idField`: campo donde guardar el ID de la organización.
 * - `nameField` (opcional): campo donde guardar el nombre de la organización.
 */
interface CompanySelectProps<FormValues> {
  title: string;
  companies: Company[];
  /** Campo en Formik donde se guardará el ID. Ej: "companyId" o "organizationId" */
  idField: keyof FormValues & string;
  /** Campo en Formik donde se guardará el nombre. Si no lo necesitas, puedes pasarlo como `undefined` o no usarlo. */
  nameField?: keyof FormValues & string; // Opcional
}

export function SelectCompanyInput<FormValues>({
  title,
  companies,
  idField,
  nameField,
}: CompanySelectProps<FormValues>) {

  const { values, setFieldValue } = useFormikContext<FormValues>();

  // Extrae el valor actual de ID y de nombre del form (si aplica).
  const selectedId = (values[idField] as unknown as string) || "";
  const selectedName = nameField ? ((values[nameField] as unknown as string) || "") : "";

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para controlar el filtrado y la preselección
  useEffect(() => {
    // Si existe un nombre en el form, reflejarlo en el estado local
    if (selectedName) {
      setSelectedCompany({
        id: selectedId,
        name: selectedName,
      });
    }
    // Filtra las compañías al escribir en la barra de búsqueda
    const filtered = companies.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies, selectedName, selectedId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-3">
      <span className="block text-sm font-medium leading-6 text-gray-900">
        {title}
      </span>
      <div className="relative mt-2">
        <div className="flex w-full">
          <input
            ref={inputRef}
            type="text"
            className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 
                       focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 
                       placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 
                       rounded-tl-md rounded-bl-md"
            placeholder={
              selectedName 
                ? selectedName 
                : "Seleccionar organización..."
            }
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Listbox
            value={selectedCompany}
            onChange={(value: Company | null) => {
              // Limpia el término de búsqueda
              setSearchTerm('');
              setSelectedCompany(value);
              // Actualiza el campo ID en Formik
              setFieldValue(idField, value ? value.id : '');
              // Si pasaste un campo de nombre, también actualízalo
              if (nameField) {
                setFieldValue(nameField, value ? value.name : '');
              }
              // Remueve el foco del input
              inputRef.current?.blur();
            }}
          >
            <ListboxButton
              className="relative w-10 cursor-default rounded-tr-md rounded-br-md 
                         bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm 
                         ring-1 ring-inset ring-gray-300 hover:ring-gray-400 
                         focus:outline-none sm:text-sm sm:leading-6"
            >
              <span className="pointer-events-none flex items-center">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxButton>
            <ListboxOptions
              className="py-1 text-base font-medium text-gray-900 
                         absolute z-10 w-full rounded-md bg-white 
                         shadow-lg overflow-y-auto max-h-60 mt-10"
            >
              {filteredCompanies.map((company) => (
                <ListboxOption
                  key={company.id}
                  value={company}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pr-4 ${
                      active ? 'bg-cb-green text-white' : 'text-gray-900'
                    }`
                  }
                >
                  <span className="text-sm font-medium ml-3">
                    {company.name}
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
    </div>
  );
}