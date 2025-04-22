'use client'

import React from "react";
import { Servicio, Precaution, PrecautionMetadataValue, PrecautionMetadataMinMax, PrecautionMetadataEnum } from "../../interfaces/Servicio";

interface ServicioViewComponentProps {
    data: Servicio;
}

export const ServicioViewComponent: React.FC<ServicioViewComponentProps> = ({
    data,
}) => {
    const getMetadataDisplay = (precaution: Precaution): string => {
        if (precaution.type === 'VALUE' && (precaution.precautionMetadata as PrecautionMetadataValue)?.unidad) {
            return `Unidad: ${(precaution.precautionMetadata as PrecautionMetadataValue).unidad}`;
        } else if (precaution.type === 'MIN-MAX' && (precaution.precautionMetadata as PrecautionMetadataMinMax)?.unidad) {
            return `Unidad (Min/Max): ${(precaution.precautionMetadata as PrecautionMetadataMinMax).unidad}`;
        } else if (precaution.type === 'ENUM' && (precaution.precautionMetadata as PrecautionMetadataEnum)?.opciones) {
            return `Opciones: ${(precaution.precautionMetadata as PrecautionMetadataEnum).opciones.join(', ')}`;
        }
        return 'N/A';
    };

    return (
        <div className="pb-10">

            {/* Sección: Datos del Servicio */}
            <div className="my-10 mx-10">
                <div className="mb-8">
                    <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Información del servicio</h2>
                </div>
                <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
                    <h3 className="text-base font-semibold leading-7 text-white">
                        Datos del Servicio
                    </h3>
                </div>
                <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        {/* Descripción */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Descripción
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.description}
                            </dd>
                        </div>

                        {/* Tipo */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Tipo
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.type}
                            </dd>
                        </div>

                        {/* Subtipo */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Subtipo
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.subtype}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Sección: Prescripciones */}
            {data.prescriptions?.length > 0 && (
                <div className="my-10 mx-10">
                    <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
                        <h3 className="text-base font-semibold leading-7 text-white">
                            Prescripciones
                        </h3>
                    </div>
                    <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {data.prescriptions.map((prescription, index) => (
                                <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Prescripción {index + 1}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {prescription.prescriptionName}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            )}

            {/* Sección: Resultados */}
            {data.results?.length > 0 && (
                <div className="my-10 mx-10">
                    <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
                        <h3 className="text-base font-semibold leading-7 text-white">
                            Resultados Esperados
                        </h3>
                    </div>
                    <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {data.results.map((result, index) => (
                                <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Resultado {index + 1}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {result.name}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            )}

            {/* Sección: Precauciones */}
            {data.precautions?.length > 0 && (
                <div className="mt-10 mx-10">
                    <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
                        <h3 className="text-base font-semibold leading-7 text-white">
                            Recaudos
                        </h3>
                    </div>
                    <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {data.precautions.map((precaution, index) => (
                                <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        {precaution.name}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <p>Tipo: {precaution.type}</p>
                                        <p>Metadatos: {getMetadataDisplay(precaution)}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            )}

            {/* Mensaje si no hay precauciones */}
            {data.precautions?.length === 0 && (
                <div className="mt-10 mx-10">
                    <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
                        <h3 className="text-base font-semibold leading-7 text-white">
                            Precauciones
                        </h3>
                    </div>
                    <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                        <div className="px-4 py-6">
                            <p className="text-sm leading-6 text-gray-700">
                                No hay precauciones registradas para este servicio.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};