'use client'

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Servicio } from "../../interfaces/Servicio";
import { ResultsTable } from "../ResultsTable/ResultsTable";


interface InputProps {
    globalStyle?: string;
}

export const ResultInput = ({ globalStyle }: InputProps) => {

    const { values, setFieldValue } = useFormikContext<Servicio>();
    const [name, setName] = useState('');
    const [results, setResults] = useState<{ name: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddResult = () => {
        if (!name) return;

        if (editingIndex !== null) {
            // Si estamos editando un documento, actualizamos el existente
            const updatedResults = values.results.map((result, index) =>
                index === editingIndex ? { name: name } : result
            );
            setResults(updatedResults);
            setFieldValue("results", updatedResults); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newResult = { name: name };
            const updatedResults = Array.isArray(values.results)
                ? [...values.results, newResult]
                : [newResult];

            setFieldValue("results", updatedResults); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setName('');
    };

    // Función para eliminar pariente
    const handleDeleteResult = (index: number) => {
        const updatedPhones = values.results.filter((_, i) => i !== index);
        setFieldValue("results", updatedPhones);
    };

    // Función para editar pariente
    const handleEditResult = (index: number) => {
        setName(values.results[index].name);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (results.length > 0 && (!values.results)) {
            setFieldValue("results", results);
        }
    }, [results, setFieldValue]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Resultados</span>
            <div className="flex flex-col">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-7 w-full">

                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">
                        <input
                            type="text"
                            value={name}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Nombre"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="flex ">
                            <button type="button" onClick={handleAddResult}>
                                <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Tabla */}
                <div className="flex">
                    {values.results?.length > 0 &&
                        <ResultsTable
                            results={values.results}
                            onDelete={handleDeleteResult}
                            onEdit={handleEditResult}

                        />
                    }
                </div>
            </div>
        </div>
    )
}