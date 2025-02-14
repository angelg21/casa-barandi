'use client'

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { PersonaFormValues } from "../personas/interfaces/PersonasForm";
import { PhonesTable } from "./PhonesTable";


interface PublicationInputProps {
    globalStyle?: string;
}

export const PhonesInput = ({ globalStyle }: PublicationInputProps) => {

    const { values, setFieldValue } = useFormikContext<PersonaFormValues>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [phones, setPhones] = useState<{ phoneType: string, phoneNumber: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddPhone = () => {
        if (!phoneType || !phoneNumber) return;

        if (editingIndex !== null) {
            // Si estamos editando un documento, actualizamos el existente
            const updatedPhones = values.phones.map((phone, index) =>
                index === editingIndex ? { phoneNumber, phoneType } : phone
            );
            setPhones(updatedPhones);
            setFieldValue("phones", updatedPhones); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newPhone = { phoneNumber, phoneType };
            const updatedPhones = [...phones, newPhone];

            setPhones(updatedPhones);
            setFieldValue("phones", Array.isArray(values.phones)
                ? [...values.phones, newPhone]
                : [newPhone]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setPhoneType('');
        setPhoneNumber('');
    };

    // Función para eliminar pariente
    const handleDeletePhones = (index: number) => {
        const updatedPhones = values.phones.filter((_, i) => i !== index);
        setFieldValue("phones", updatedPhones);
    };

    // Función para editar pariente
    const handleEditPhones = (index: number) => {
        setPhoneType(values.phones[index].phoneType);
        setPhoneNumber(values.phones[index].phoneNumber);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (phones.length > 0 && (!values.phones)) {
            setFieldValue("phones", phones);
        }
    }, [phones, setFieldValue]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Teléfonos</span>
            <div className="flex flex-col">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-7 w-full">

                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">
                        <input
                            id="documentType"
                            type="text"
                            value={phoneType}
                            className={`text-input w-full max-w-36  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Tipo"
                            onChange={(e) => setPhoneType(e.target.value)}
                        />

                        <input
                            key="documentNumber"
                            type="text"
                            value={phoneNumber}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Número"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <div className="flex ">
                            <button type="button" onClick={handleAddPhone}>
                                <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Tabla */}
                <div className="flex">
                    {values.phones?.length > 0 &&
                        <PhonesTable
                            phones={values.phones}
                            onDelete={handleDeletePhones}
                            onEdit={handleEditPhones}
                        />
                    }
                </div>
            </div>
        </div>
    )
}