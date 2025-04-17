'use client'

import { useFormikContext } from "formik";
import { useRef, useState, useEffect } from "react";
import { Service, Programa } from "../../interfaces/Programa"; 
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useService } from "../../context/ServiceContext";

interface SelectServiceInputProps {
  globalStyle?: string;
}

export const SelectServiceInput = ({ globalStyle }: SelectServiceInputProps) => {
  const { values, setFieldValue } = useFormikContext<Programa>();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { services: servicesData } = useService();
  const [filteredServices, setFilteredServices] = useState<Service[]>(servicesData);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (values.serviceId && servicesData.length > 0 && !selectedService) {
      const matched = servicesData.find((s) => s.id === values.serviceId);
      if (matched) {
        setSelectedService(matched);
        setSearchTerm(matched.name);
      }
    }
  }, [values.serviceId, servicesData, selectedService]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = servicesData.filter(service => {
      const nameMatch = service.name?.toLowerCase().includes(lowerTerm);
      return nameMatch;
    });
    setFilteredServices(filtered);
  }, [searchTerm, servicesData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Si el input se vacía, resetear el valor del campo en Formik
    if (!newSearchTerm) {
      setSelectedService(null);
      setFieldValue('serviceId', '');  // Se resetea el valor en Formik
    }
  };

  const handleServiceChange = (value: Service) => {
    setSelectedService(value);
    setSearchTerm(value?.name || '');
    // Actualiza el campo en Formik con el id del servicio
    setFieldValue('serviceId', value.id);
  };

  return (
    <div className={`${globalStyle} w-full`}>
      <span className="flex text-gray-900 text-sm font-medium leading-6 mb-2">
        Servicio
      </span>
      <div className="flex flex-col md:flex-row space-x-14">
        <div className="w-full">
          <div className="flex flex-row">
            <div className="flex w-full md:w-full">
              <input
                ref={inputRef}
                type="text"
                className="w-full border-none hover:ring-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-gray-400 bg-white py-1.5 pl-3 pr-8 text-gray-900 placeholder:text-gray-500 focus:ring-1 sm:text-sm sm:leading-6 rounded-tl-md rounded-bl-md"
                placeholder={selectedService ? selectedService.name : 'Buscar por nombre o descripción...'}
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Listbox value={selectedService} onChange={handleServiceChange}>
                <ListboxButton className="relative w-10 cursor-default rounded-tr-md rounded-br-md bg-white py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none sm:text-sm sm:leading-6">
                  <span className="pointer-events-none flex items-center">
                    <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </span>
                </ListboxButton>
                <ListboxOptions className="py-1 text-base font-medium text-gray-900 absolute z-10 w-full max-w-[240px] rounded-md bg-white shadow-lg overflow-y-auto max-h-60 mt-10">
                  {filteredServices.map((service, index) => (
                    <ListboxOption
                      key={index}
                      value={service}
                      className={({ active }) =>
                        `max-w-[240px] relative cursor-default select-none py-2 pr-4 ${
                          active ? 'bg-cb-green text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      <div className="ml-3">
                        <span className="text-sm font-medium block">{service.name}</span>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};