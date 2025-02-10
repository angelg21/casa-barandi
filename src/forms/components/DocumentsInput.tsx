'use client'

import { useFormikContext } from "formik";
// import { GroupingFormValues } from "../interfaces/GroupingForm";
import { useEffect, useState } from "react";
import { DocumentsTable } from "./DocumentsTable";
import { PersonaFormValues } from "../personas/interfaces/PersonasForm";
// import { ExpandableInputWork } from "../../WorksFormComponents/EpandableInputWork/ExpandableInputWork";
// import { GroupingPublicationTable } from "./GroupingPublicationTable";


interface PublicationInputProps {
    globalStyle?: string;
}

export const DocumentsInput = ({ globalStyle }: PublicationInputProps) => {

    const { values, setFieldValue } = useFormikContext<PersonaFormValues>();
    const [documentNumber, setDocumentNumber] = useState('');
    const [documentType, setDocumenType] = useState('');
    const [documents, setDocuments] = useState<{ documentType: string, documentNumber: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddDocument = () => {
        if (!documentType || !documentNumber) return;

        if (editingIndex !== null) {
            // Si estamos editando un documento, actualizamos el existente
            const updatedDocuments = values.documents.map((document, index) =>
                index === editingIndex ? { documentNumber, documentType } : document
            );
            setDocuments(updatedDocuments);
            setFieldValue("documents", updatedDocuments); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newDocument = { documentNumber, documentType };
            const updatedDocuments = [...documents, newDocument];

            setDocuments(updatedDocuments);
            setFieldValue("documents", Array.isArray(values.documents)
                ? [...values.documents, newDocument]
                : [newDocument]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setDocumenType('');
        setDocumentNumber('');
    };

    // Función para eliminar pariente
    const handleDeleteDocuments = (index: number) => {
        const updatedDocuments = values.documents.filter((_, i) => i !== index);
        setFieldValue("documents", updatedDocuments);
    };

    // Función para editar pariente
    const handleEditDocuments = (index: number) => {
        setDocumenType(values.documents[index].documentType);
        setDocumentNumber(values.documents[index].documentNumber);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (documents.length > 0 && (!values.documents)) {
            setFieldValue("documents", documents);
        }
    }, [documents, setFieldValue, values.documents]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Documentos</span>
            <div className="flex flex-col">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-7 w-full">

                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">
                        <input
                            id="documentType"
                            type="text"
                            value={documentType}
                            className={`text-input w-full max-w-36  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Tipo"
                            onChange={(e) => setDocumenType(e.target.value)}
                        />

                        <input
                            key="documentNumber"
                            type="text"
                            value={documentNumber}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Número"
                            onChange={(e) => setDocumentNumber(e.target.value)}
                        />

                        <div className="flex ">
                            <button type="button" onClick={handleAddDocument}>
                                <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Tabla */}
                <div className="flex">
                    {values.documents?.length > 0 &&
                        <DocumentsTable
                            documents={values.documents}
                            onDelete={handleDeleteDocuments}
                            onEdit={handleEditDocuments}
                        />
                    }
                </div>
            </div>
        </div>
    )
}