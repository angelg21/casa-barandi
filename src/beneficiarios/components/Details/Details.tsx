"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
//import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BeneficiarioValues } from "../../interfaces/BeneficiariosSheet";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";
import { BeneficiariosView } from "../BeneficiariosView/BeneficiariosView";
import { BeneficiariosModalForm } from "../BeneficiariosModalForm/BeneficiariosModalForm";

interface DetailsProps {
    beneficiarios: BeneficiarioValues[];
}

export const Details: React.FC<DetailsProps> = ({ beneficiarios = [] }) => {

    const [isBeneficiariosModalOpen, setIsBeneficiariosModalOpen] = useState(false);
    //const router = useRouter();
    console.log("Beneficiarios: ",beneficiarios)

    const handleOpenBeneficiariosModal = () => {
        setIsBeneficiariosModalOpen(true);
    };

    const handleCloseBeneficiarioModal = () => {
        setIsBeneficiariosModalOpen(false);
    };

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="h-calc(100vh) overflow-y-auto px-1">
                <div>
                    <div className='flex flex-col px-6 py-6 sm:px-14 xl:px-16'>
                        <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Beneficiarios</h2>
                        <div
                            className='w-full flex justify-end items-end'
                            onClick={() => handleOpenBeneficiariosModal()}
                        >
                            <ButtonWithIconLeft
                                title="Agregar Beneficiario"
                                textColor="text-white"
                                backgroundColor="bg-cb-green"
                                hover="hover:bg-cb-light-green"
                                icon={<PlusIcon />}
                                iconColor="text-white"
                            />
                        </div>
                        <BeneficiariosView
                            beneficiarios={beneficiarios}
                        />
                    </div>
                </div>
                {isBeneficiariosModalOpen && (
                    <BeneficiariosModalForm
                        onClose={handleCloseBeneficiarioModal}
                    //onSave={handleSaveRoles}
                    />
                )}
            </div>
        </AlertProvider>
    )
}


