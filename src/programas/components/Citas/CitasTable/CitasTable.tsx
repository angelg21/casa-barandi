'use client'

import React, { useState } from 'react';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import { useRouter } from 'next/navigation';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { TableAction } from '@/src/components/interfaces/TableActions';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Cita, Programa } from '../../../interfaces/Programa';

interface CitasTableProps {
    citas: Cita[];
}

const Actions: TableAction[] = [
    { id: '01', name: 'Visualizar', Icon: EyeIcon },
    { id: '02', name: 'Editar', Icon: PencilSquareIcon },
    { id: '03', name: 'Eliminar', Icon: TrashIcon },
];

export default function CitasTable({ citas }: CitasTableProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | undefined>("")
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState<Programa | undefined>(undefined);
    const router = useRouter();
    const [localCitas, setLocalCitas] = useState([...citas]); 

    const handleClickActions = (action: string, cita: Cita) => {
        if (action === '01')
            router.push(`/dashboard/personas/${cita.id}/detalles`);
        else if (action === '02') {
            setOpenEditModal(true);
            //setEditModalData(cita)
        } else if (action === "03") {
            setIdToDelete(cita.id)
            setOpenDeleteModal(true);
        }
    };

    const handleDeleteUser = async () => {
        try {
            // // const response = await deletePerson(idToDelete);
            // const response = addHookAliases;

            // if (response.ok) {
            //     return true;
            // } else {
            //     console.error(response.message);
            //     return false;
            // }
        } catch (error) {
            console.error('Error al eliminar el usuario: ', error);
            return false;
        }
    };

    const handleConfirmChange = (citaId: string, checked: boolean) => {
        const updatedCitas = localCitas.map(cita => {
            if (cita.id == citaId) {
                const now = new Date().toISOString().split('T')[0];
                return {
                    ...cita,
                    confirmed: checked,
                    dateConfirmation: checked ? now : "", // Eliminar fecha si se desmarca
                };
            }
            return cita;
        });
        setLocalCitas(updatedCitas);
    };

    return (
        <div className="">
            <div className="mt-8 ">
                <div className="lg:max-w-[2000px]">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-300 rounded-lg">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        BENEFICIARIO
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        FECHA REALIZADA
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        FECHA CONFIRMADA
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        CONFIRMAR CITA
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        ACCIONES
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {localCitas.map((cita, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    {
                                                        cita.representative && 

                                                        <div className='my-4'>
                                                            <div className="font-medium text-gray-900">{cita.representative.name}</div>
                                                            <div className="font-medium text-gray-900">{cita.representative.related}</div>
                                                        </div>
                                                    }
                                                    <div className="font-medium text-gray-900">{cita.person.name}</div>
                                                    <div className="font-medium text-gray-900">{cita.person.ci || ''}</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{cita.dateMade}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{cita.dateConfirmation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <input
                                                        type="checkbox"
                                                        checked={cita.confirmed}
                                                        onChange={(e) => handleConfirmChange(cita.id as string, e.target.checked)}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-9 py-5">
                                            <Menu as="div" className='relative'>
                                                <MenuButton>
                                                    <EllipsisHorizontalIcon className="w-7 h-7 text-d-gray-text" />
                                                </MenuButton>
                                                <MenuItems
                                                    transition
                                                    className="absolute right-0 z-10  w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                >
                                                    {Actions.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            <div
                                                                role="button"
                                                                className="flex hover:bg-gray-200 space-x-3 px-3 py-1 text-sm leading-6"
                                                                onClick={() => handleClickActions(item.id, cita)}
                                                            >
                                                                {item.Icon && <item.Icon className={`h-5 w-5 ${item.name === 'Eliminar' ? 'text-red-500' : 'text-d-gray-text'}`} />}
                                                                <span className="text-gray-700 data-[focus]:bg-gray-50"> {item.name} </span>
                                                            </div>
                                                        </MenuItem>
                                                    ))}
                                                </MenuItems>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {openEditModal && (
                // <PersonModal onClose={() => setOpenEditModal(false)} editData={editModalData} />
                <div></div>
            )}
            {openDeleteModal && (
                <DeleteModal
                    term={"Persona"}
                    onClose={() => setOpenDeleteModal(false)}
                    onDelete={handleDeleteUser}
                />
            )}
        </div>
    );
}