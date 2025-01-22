'use client'

import { useFormikContext } from "formik";
// import { GroupingFormValues } from "../interfaces/GroupingForm";
import { useEffect, useState } from "react";
import { PersonaFormValues } from "../personas/interfaces/PersonasForm";
import { EmailAddressesTable } from "./EmailAddressesTable";
// import { ExpandableInputWork } from "../../WorksFormComponents/EpandableInputWork/ExpandableInputWork";
// import { GroupingPublicationTable } from "./GroupingPublicationTable";


interface InputProps {
    globalStyle?: string;
}

export const EmailAddressesInput = ({ globalStyle }: InputProps) => {

    const { values, setFieldValue } = useFormikContext<PersonaFormValues>();
    const [address, setAddress] = useState('');
    const [addressType, setAddressType] = useState('');
    const [emailAddresses, setEmailAddresses] = useState<{ addressType: string; address: string; }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddEmailAddress = () => {
        if (!addressType || !address) return;

        if (editingIndex !== null) {
            // Si estamos editando un documento, actualizamos el existente
            const updatedEmailAddresses = values.electronicAddresses.map((electronicAddress, index) =>
                index === editingIndex ? { address, addressType } : electronicAddress
            );
            setEmailAddresses(updatedEmailAddresses);
            setFieldValue("electronicAddresses", updatedEmailAddresses); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newEmailAddress = { address, addressType };
            const updatedEmailAddresses = [...emailAddresses, newEmailAddress];

            setEmailAddresses(updatedEmailAddresses);
            setFieldValue("electronicAddresses", Array.isArray(values.electronicAddresses)
                ? [...values.electronicAddresses, newEmailAddress]
                : [newEmailAddress]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setAddressType('');
        setAddress('');
    };

    // Función para eliminar pariente
    const handleDeleteEmailAddresses = (index: number) => {
        const updatedEmailAddresses = values.electronicAddresses.filter((_, i) => i !== index);
        setFieldValue("electronicAddresses", updatedEmailAddresses);
    };

    // Función para editar pariente
    const handleEditEmailAddresses = (index: number) => {
        setAddressType(values.electronicAddresses[index].addressType);
        setAddress(values.electronicAddresses[index].address);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (emailAddresses.length > 0 && (!values.electronicAddresses)) {
            setFieldValue("electronicAddresses", emailAddresses);
        }
    }, [emailAddresses]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Direcciones Elestrónicas</span>
            <div className="flex flex-col">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-7 w-full">

                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">
                        <input
                            id="documentNumber"
                            type="text"
                            value={address}
                            className={`text-input w-full max-w-36  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Tipo"
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <input
                            key="documentType"
                            type="text"
                            value={addressType}
                            className={`text-input w-full max-w-[360px] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Dirección"
                            onChange={(e) => setAddressType(e.target.value)}
                        />

                        <div className="flex ">
                            <button onClick={handleAddEmailAddress}>
                                <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Tabla */}
                <div className="flex">
                    {values.electronicAddresses?.length > 0 &&
                        <EmailAddressesTable
                            electronicAddresses={values.electronicAddresses}
                            onDelete={handleDeleteEmailAddresses}
                            onEdit={handleEditEmailAddresses}
                        />
                    }
                </div>
            </div>
        </div>
    )
}