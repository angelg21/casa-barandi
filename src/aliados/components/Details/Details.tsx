"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
//import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AliadoValues } from "../../interfaces/AliadosSheet";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";
import { useState } from "react";
import { AliadosModalForm } from "../AliadosModalForm/AliadosModalForm";
import { AliadosView } from "../AliadosView/AliadosView";



const aliados: AliadoValues[] = [
    {
        id: '1',
        companyName: 'UCAB',
        companyId: '101',
        incorporationDate: '2000-01-15',
        terminationDate: '2025-12-31',
        type: 'Universidad',
    },
    {
        id: '2',
        companyName: 'Rotary International',
        companyId: '102',
        incorporationDate: '1905-02-23',
        terminationDate: '', // Sin fecha de terminación
        type: 'Organización sin fines de lucro',
    },
    {
        id: '3',
        companyName: 'Compañía C',
        companyId: '103',
        incorporationDate: '2010-05-10',
        terminationDate: '2022-06-30',
        type: 'Comercial',
    },
    {
        id: '4',
        companyName: 'Organización XYZ',
        companyId: '104',
        incorporationDate: '1995-11-01',
        terminationDate: '',
        type: 'Sin fines de lucro',
    },
    {
        id: '5',
        companyName: 'Empresa ABC',
        companyId: '105',
        incorporationDate: '2008-07-18',
        terminationDate: '2024-08-15',
        type: 'Comercial',
    },
    {
        id: '6',
        companyName: 'Corporación DEF',
        companyId: '106',
        incorporationDate: '2015-03-05',
        terminationDate: '',
        type: 'Comercial',
    },
    {
        id: '7',
        companyName: 'Asociación GHI',
        companyId: '107',
        incorporationDate: '1980-09-20',
        terminationDate: '2023-10-31',
        type: 'Gremial',
    },
    {
        id: '8',
        companyName: 'Fundación JKL',
        companyId: '108',
        incorporationDate: '2002-04-12',
        terminationDate: '',
        type: 'Sin fines de lucro',
    },
    {
        id: '9',
        companyName: 'Sociedad MNO',
        companyId: '109',
        incorporationDate: '2012-12-08',
        terminationDate: '2026-01-31',
        type: 'Comercial',
    },
    {
        id: '10',
        companyName: 'Cooperativa PQR',
        companyId: '110',
        incorporationDate: '1998-06-25',
        terminationDate: '',
        type: 'Cooperativa',
    },
    // ... Puedes agregar más aliados aquí
];


export const Details = () => {

    const [isAliadoModalOpen, setIsAliadoModalOpen] = useState(false);
    //const router = useRouter();

    const handleOpenPersonModal = () => {
        setIsAliadoModalOpen(true);
    };

    const handleClosePersonModal = () => {
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
                            onClick={() => handleOpenPersonModal()}
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
                        onClose={handleClosePersonModal}
                    //onSave={handleSaveRoles}
                    />
                )}
            </div>
        </AlertProvider>
    )
}
