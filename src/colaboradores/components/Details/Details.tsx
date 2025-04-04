"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
//import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";
import { BeneficiarioColaboradorValues } from "@/src/beneficiarios/interfaces/BeneficiariosColaboradorSheet";
import { ColaboradoresView } from "../ColaboradoresView/ColaboradoresView";
import { ColaboradoresModalForm } from "../ColaboradoresModalForm/ColaboradoresModalForm";

interface DetailsProps {
    colaboradores: BeneficiarioColaboradorValues[];
}

export const Details: React.FC<DetailsProps> = ({ colaboradores = [] }) => {

    const [isColaboradoresModalOpen, setIsColaboradoresModalOpen] = useState(false);
    //const router = useRouter();
    console.log("Colaboradores: ", colaboradores)

    const handleOpenColaboradoresModal = () => {
        setIsColaboradoresModalOpen(true);
    };

    const handleCloseColaboradorModal = () => {
        setIsColaboradoresModalOpen(false);
    };

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="h-calc(100vh) overflow-y-auto px-1">
                <div>
                    <div className='flex flex-col px-6 py-6 sm:px-14 xl:px-16'>
                        <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Colaboradores</h2>
                        <div
                            className='w-full flex justify-end items-end'
                            onClick={() => handleOpenColaboradoresModal()}
                        >
                            <ButtonWithIconLeft
                                title="Agregar Colaborador"
                                textColor="text-white"
                                backgroundColor="bg-cb-green"
                                hover="hover:bg-cb-light-green"
                                icon={<PlusIcon />}
                                iconColor="text-white"
                            />
                        </div>
                        <ColaboradoresView
                            colaboradores={colaboradores}
                        />
                    </div>
                </div>
                {isColaboradoresModalOpen && (
                    <ColaboradoresModalForm
                        onClose={handleCloseColaboradorModal}
                    //onSave={handleSaveRoles}
                    />
                )}
            </div>
        </AlertProvider>
    )
}


