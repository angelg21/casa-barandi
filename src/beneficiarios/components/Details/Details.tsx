"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
//import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BeneficiarioValues } from "../../interfaces/BeneficiariosSheet";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";
import { BeneficiariosView } from "../BeneficiariosView/BeneficiariosView";
import { BeneficiariosModalForm } from "../BeneficiariosModalForm/BeneficiariosModalForm";





const beneficiariosData: BeneficiarioValues[] = [
    {
        personCi: "V-12345678",
        personName: "Juan Pérez",
        type: "Empleado",
        incorporationDate: "2023-01-15",
        terminationDate: "2024-01-15",
    },
    {
        personCi: "V-87654321",
        personName: "María Rodríguez",
        type: "Consultor",
        incorporationDate: "2022-05-01",
        terminationDate: "2025-05-01",
    },
    {
        personCi: "V-56789012",
        personName: "Carlos López",
        type: "Empleado",
        incorporationDate: "2023-03-10",
        terminationDate: "2024-03-10",
    },
    {
        personCi: "V-24681357",
        personName: "Ana García",
        type: "Freelancer",
        incorporationDate: "2022-11-20",
        terminationDate: "2026-11-20",
    },
    {
        personCi: "V-13579246",
        personName: "Luis Martínez",
        type: "Empleado",
        incorporationDate: "2023-07-05",
        terminationDate: "2025-07-05",
    },
    {
        personCi: "V-98765432",
        personName: "Sofía Ramírez",
        type: "Consultor",
        incorporationDate: "2022-02-25",
        terminationDate: "2027-02-25",
    },
    {
        personCi: "V-76543210",
        personName: "Pedro Sánchez",
        type: "Empleado",
        incorporationDate: "2023-09-18",
        terminationDate: "2024-09-18",
    },
    {
        personCi: "V-43210987",
        personName: "Laura Díaz",
        type: "Freelancer",
        incorporationDate: "2022-06-08",
        terminationDate: "2028-06-08",
    },
    {
        personCi: "V-86420975",
        personName: "Miguel Vargas",
        type: "Empleado",
        incorporationDate: "2023-04-12",
        terminationDate: "2025-04-12",
    },
    {
        personCi: "V-28574196",
        personName: "Isabella Torres",
        type: "Consultor",
        incorporationDate: "2022-12-01",
        terminationDate: "2026-12-01",
    },
];

export default beneficiariosData;


export const Details = () => {

    const [isBeneficiariosModalOpen, setIsBeneficiariosModalOpen] = useState(false);
    //const router = useRouter();

    const handleOpenPersonModal = () => {
        setIsBeneficiariosModalOpen(true);
    };

    const handleClosePersonModal = () => {
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
                            onClick={() => handleOpenPersonModal()}
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
                            beneficiarios={beneficiariosData}
                        />
                    </div>
                </div>
                {isBeneficiariosModalOpen && (
                    <BeneficiariosModalForm
                        onClose={handleClosePersonModal}
                    //onSave={handleSaveRoles}
                    />
                )}
            </div>
        </AlertProvider>
    )
}


