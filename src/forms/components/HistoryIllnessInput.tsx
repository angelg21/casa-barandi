'use client'

import { useFormikContext } from "formik";
// import { GroupingFormValues } from "../interfaces/GroupingForm";
import { useEffect, useState } from "react";
import { PersonaFormValues } from "../personas/interfaces/PersonasForm";
import { ExpandableInputWithoutFormik } from "./ExpandableInputWithoutFormik";
import { SelectDateWithProps } from "./SelectDateWithProps";
// import { ExpandableInputWork } from "../../WorksFormComponents/EpandableInputWork/ExpandableInputWork";
// import { GroupingPublicationTable } from "./GroupingPublicationTable";
import { HistoryIllnessTable } from './HistoryIllnessTable';


interface InputProps {
    globalStyle?: string;
}
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const HistoryIllnessInput = ({ globalStyle }: InputProps) => {

    const { values, setFieldValue } = useFormikContext<PersonaFormValues>();
    const [illnessDescription, setIllnessDescription] = useState('');
    const [dateIllness, setDateIllness] = useState('');
    const [severity, setSeverity] = useState('');

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const [historyIllness, setHistoryIllness] = useState<{ illnessDescription: string; dateIllness: string; severity: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddHistoryIllness = () => {
        if (!illnessDescription) return;

        if (editingIndex !== null) {
            // Si estamos editando un documento, actualizamos el existente
            const updatedHistoryIllness = values.historyIllness.map((illness, index) =>
                index === editingIndex ? { illnessDescription, dateIllness, severity } : illness
            );
            setHistoryIllness(updatedHistoryIllness);
            setFieldValue("historyIllness", updatedHistoryIllness); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newHistoryIllness = { illnessDescription, dateIllness, severity };
            const updatedHistoryIllness = Array.isArray(historyIllness)
                ? [...historyIllness, newHistoryIllness]
                : [newHistoryIllness];

            setHistoryIllness(updatedHistoryIllness);
            setFieldValue("historyIllness", Array.isArray(values.historyIllness)
                ? [...values.historyIllness, newHistoryIllness]
                : [newHistoryIllness]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setDateIllness('');
        setIllnessDescription('');
        setSeverity('');
        setSelectedDay(null);
        setSelectedMonth(null);
        setSelectedYear(null);
    };

    // Función para eliminar pariente
    const handleDeleteHistoryIllness = (index: number) => {
        const updatedHistoryIllness = values.historyIllness.filter((_, i) => i !== index);
        setFieldValue("historyIllness", updatedHistoryIllness);
    };

    // Función para editar pariente
    const handleEditHistoryIllness = (index: number) => {
        const { dateIllness, illnessDescription, severity } = values.historyIllness[index];

        // Actualizar los estados con los valores del registro a editar
        setDateIllness(dateIllness);
        setIllnessDescription(illnessDescription);
        setSeverity(severity);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando

        // Descomponer la fecha si está en formato "Día de Mes de Año"
        const fullDateRegex = /(\d{1,2}) de (\w+) de (\d{4})/;
        const match = dateIllness.match(fullDateRegex);

        if (match) {
            const day = parseInt(match[1], 10);
            const month = monthNames.indexOf(match[2]) + 1; // Obtener el índice del mes
            const year = parseInt(match[3], 10);

            setSelectedDay(day);
            setSelectedMonth(month);
            setSelectedYear(year);
        } else {
            // Si el formato de fecha es incorrecto o no coincide
            setSelectedDay(null);
            setSelectedMonth(null);
            setSelectedYear(null);
        }
    };

    useEffect(() => {
        if (historyIllness.length > 0 && (!values.historyIllness)) {
            setFieldValue("historyIllness", historyIllness);
        }
    }, [historyIllness]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Antecedentes de Enfermedades</span>
            <div className="flex flex-col">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-6 w-full">
                    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 mb-6">

                        <ExpandableInputWithoutFormik
                            id="criticisms-description"
                            value={illnessDescription}
                            onChange={(e) => setIllnessDescription(e.target.value)}
                            label={"Descripción o resumen"}
                            labelTextStyle={"text-gray-900 text-sm"}
                            globalStyle={"w-full max-w-[900px]"}
                        />

                        <div className="flex w-full flex-col space-y-8">

                            <SelectDateWithProps
                                title="Fecha de primer diagnostico"
                                globalStyle="col-span-1"
                                setState={setDateIllness}
                                state={dateIllness}
                                setSelectedDay={setSelectedDay}
                                setSelectedMonth={setSelectedMonth}
                                setSelectedYear={setSelectedYear}
                                selectedMonth={selectedMonth}
                                selectedYear={selectedYear}
                                selectedDay={selectedDay}
                            />

                            <input
                                id="severity"
                                type="text"
                                value={severity}
                                className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#08a49c] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                                placeholder="Severidad"
                                onChange={(e) => setSeverity(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="flex ">
                        <button onClick={handleAddHistoryIllness}>
                            <span className="text-sm font-medium rounded-full text-white px-3 py-2 bg-cb-green">Agregar</span>
                        </button>
                    </div>

                </div>

                {/* Tabla */}
                <div className="flex mt-8">
                    {values.historyIllness?.length > 0 &&
                        <HistoryIllnessTable
                            historyIllness={values.historyIllness}
                            onDelete={handleDeleteHistoryIllness}
                            onEdit={handleEditHistoryIllness}
                        />
                    }
                </div>
            </div>
        </div>
    )
}