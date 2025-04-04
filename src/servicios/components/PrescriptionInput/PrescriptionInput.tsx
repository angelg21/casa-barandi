'use client'

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Servicio } from "../../interfaces/Servicio";
import { PrescriptionTable } from "../PrescriptionsTable/PrescriptionsTable";


interface InputProps {
    globalStyle?: string;
}

export const PresciptionInput = ({ globalStyle }: InputProps) => {

    const { values, setFieldValue } = useFormikContext<Servicio>();
    const [prescriptionName, setPrescriptionName] = useState('');
    const [prescriptions, setPrescriptions] = useState<{ prescriptionName: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddPrescription = () => {
        if (!prescriptionName) return;

        if (editingIndex !== null) {
            // Si estamos editando un documento, actualizamos el existente
            const updatedPrescriptions = values.prescriptions.map((prescription, index) =>
                index === editingIndex ? { prescriptionName: prescriptionName } : prescription
            );
            setPrescriptions(updatedPrescriptions);
            setFieldValue("prescriptions", updatedPrescriptions); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newPrescription = { prescriptionName };
            const updatedPrescriptions = Array.isArray(values.prescriptions)
                ? [...values.prescriptions, newPrescription]
                : [newPrescription];
        
            setFieldValue("prescriptions", updatedPrescriptions); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setPrescriptionName('');
    };

    // Función para eliminar pariente
    const handleDeletePrescription = (index: number) => {
        const updatedPhones = values.prescriptions.filter((_, i) => i !== index);
        setFieldValue("prescriptions", updatedPhones);
    };

    // Función para editar pariente
    const handleEditPrescription = (index: number) => {
        setPrescriptionName(values.prescriptions[index].prescriptionName);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (prescriptions.length > 0 && (!values.prescriptions)) {
            setFieldValue("prescriptions", prescriptions);
        }
    }, [prescriptions, setFieldValue]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Prescripciones</span>
            <div className="flex flex-col">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-7 w-full">

                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">
                        <input
                            key="documentNumber"
                            type="text"
                            value={prescriptionName}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Nombre"
                            onChange={(e) => setPrescriptionName(e.target.value)}
                        />

                        <div className="flex ">
                            <button type="button" onClick={handleAddPrescription}>
                                <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Tabla */}
                <div className="flex">
                    {values.prescriptions?.length > 0 &&
                        <PrescriptionTable
                            prescriptions={values.prescriptions}
                            onDelete={handleDeletePrescription}
                            onEdit={handleEditPrescription}
                        />
                    }
                </div>
            </div>
        </div>
    )
}