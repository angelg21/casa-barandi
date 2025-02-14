"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
import { PlusIcon } from "@heroicons/react/24/outline";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";
import { useState } from "react";
import { AliadosModalForm } from "../AliadosModalForm/AliadosModalForm";
import { AliadosView } from "../AliadosView/AliadosView";
import { AliadoValues } from "../../interfaces/AliadosSheet";

interface DetailsProps {
    aliados: AliadoValues[];
}

export const Details: React.FC<DetailsProps> = ({ aliados = [] }) => {

    const [isAliadoModalOpen, setIsAliadoModalOpen] = useState(false);
    //const router = useRouter();

    const handleOpenAllieModal = () => {
        setIsAliadoModalOpen(true);
    };

    const handleCloseAllieModal = () => {
        setIsAliadoModalOpen(false);
    };

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="h-calc(100vh) overflow-y-auto px-1">
                <div>
                    <div className='flex flex-col px-6 py-6 sm:px-14 xl:px-16'>
                        <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Aliados</h2>
                        <div
                            className='w-full flex justify-end items-end'
                            onClick={() => handleOpenAllieModal()}
                        >
                            <ButtonWithIconLeft
                                title="Agregar Aliado"
                                textColor="text-white"
                                backgroundColor="bg-cb-green"
                                hover="hover:bg-cb-light-green"
                                icon={<PlusIcon />}
                                iconColor="text-white"
                            />
                        </div>
                        <AliadosView
                            aliados={aliados}
                        />
                    </div>
                </div>
                {isAliadoModalOpen && (
                    <AliadosModalForm
                        onClose={handleCloseAllieModal}
                    //onSave={handleSaveRoles}
                    />
                )}
            </div>
        </AlertProvider>
    )
}
