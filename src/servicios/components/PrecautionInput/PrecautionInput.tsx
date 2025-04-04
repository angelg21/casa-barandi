'use client'

import { useFormikContext } from "formik";
import { useState } from "react";
import { Servicio, Precaution, PrecautionMetadataValue, PrecautionMetadataMinMax, PrecautionMetadataEnum } from "../../interfaces/Servicio";
import { PrecautionsTable } from "../PrecautionsTable/PrecautionsTable";


interface PrecautionInputProps {
    globalStyle?: string;
}

export const PrecautionInput = ({ globalStyle }: PrecautionInputProps) => {
    const { values, setFieldValue } = useFormikContext<Servicio>();
    const [name, setName] = useState('');
    const [type, setType] = useState<string>('VALUES');
    const [metadata, setMetadata] = useState<PrecautionMetadataValue | PrecautionMetadataMinMax | PrecautionMetadataEnum>({ unidad: '' });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddPrecaution = () => {
        if (!name) return;

        const newPrecaution: Precaution = {
            name: name,
            type: type,
            precautiontMetadata: metadata,
        };

        if (editingIndex !== null) {
            const updatedPrecautions = values.precautions.map((precaution, index) =>
                index === editingIndex ? newPrecaution : precaution
            );
            setFieldValue("precautions", updatedPrecautions);
            setEditingIndex(null);
        } else {
            const updatedPrecautions = Array.isArray(values.precautions)
                ? [...values.precautions, newPrecaution]
                : [newPrecaution];
            setFieldValue("precautions", updatedPrecautions);
        }

        setName('');
        setMetadata({ unidad: '' });
    };

    const handleDeletePrecaution = (index: number) => {
        const updatedPrecautions = values.precautions.filter((_, i) => i !== index);
        setFieldValue("precautions", updatedPrecautions);
    };

    const handleEditPrecaution = (index: number) => {
        const precaution = values.precautions[index];
        setName(precaution.name);
        setType(precaution.type);
        setMetadata(precaution.precautiontMetadata);
        setEditingIndex(index);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setType(newType);

        switch (newType) {
            case 'VALUES':
                setMetadata({ unidad: '' });
                break;
            case 'MIN-MAX':
                setMetadata({ unidad: '' });
                break;
            case 'ENUM':
                setMetadata({ opciones: [] });
                break;
            default:
                setMetadata({ unidad: '' });
                break;
        }
    };

    const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (type === 'ENUM') {
            setMetadata({ opciones: e.target.value.split(',') });
        } else {
            setMetadata({ ...metadata, unidad: e.target.value });
        }
    };

    return (
        <div className={`${globalStyle}`}>
            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Recaudos</span>
            <div className="flex flex-col">
                <div className="flex flex-col col-span-1 space-y-7 w-full">
                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">
                        <input
                            type="text"
                            value={name}
                            className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Nombre"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <select
                            value={type}
                            onChange={handleTypeChange}
                            className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            <option value="VALUES">VALOR</option>
                            <option value="CHECK">CHECK</option>
                            <option value="MIN-MAX">MÍNIMO Y MÁXIMO</option>
                            <option value="ENUM">OPCIONES</option>
                        </select>
                        {type === 'VALUES' || type === 'MIN-MAX' ? (
                            <input
                                type="text"
                                value={(metadata as PrecautionMetadataValue).unidad || ''}
                                className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                                placeholder="Unidad"
                                onChange={handleMetadataChange}
                            />
                        ) : type === 'ENUM' ? (
                            <textarea
                                value={(metadata as PrecautionMetadataEnum).opciones?.join(',') || ''}
                                className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 h-20 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                                placeholder="Opciones (separadas por comas)"
                                onChange={handleMetadataChange}
                            />
                        ) : null}
                        <div className="flex">
                            <button type="button" onClick={handleAddPrecaution}>
                                <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    {values.precautions?.length > 0 && (
                        <PrecautionsTable
                            precautions={values.precautions}
                            onDelete={handleDeletePrecaution}
                            onEdit={handleEditPrecaution}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};