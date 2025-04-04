"use client"
import React, { useState } from 'react';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import { useRouter } from 'next/navigation';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { TableAction } from '@/src/components/interfaces/TableActions';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Servicio } from '../../interfaces/Servicio';
import ServicioModal from '../ServicioModal/ServicioModal';

interface ServicioTableProps {
    servicios: Servicio[];
}

const Actions: TableAction[] = [
    { id: '01', name: 'Visualizar', Icon: EyeIcon },
    { id: '02', name: 'Editar', Icon: PencilSquareIcon },
    { id: '03', name: 'Eliminar', Icon: TrashIcon },
];

export default function OrganizationTable({ servicios }: ServicioTableProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | undefined>("")
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState<Servicio | undefined>(undefined);
    const router = useRouter();

    const handleClickActions = (action: string, servicio: Servicio) => {
        if (action === '01')
            router.push(`/dashboard/servicios/${servicio.id}/detalles`);
        else if (action === '02') {
            setOpenEditModal(true);
            setEditModalData(servicio)
        } else if (action === "03") {
            setIdToDelete(servicio.id)
            setOpenDeleteModal(true);
        }
    };

    const handleDeleteOrganization = async () => {
        try {
            const response = await deleteOrg(idToDelete);

            if (response.ok) {
                return true;
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            console.error('Error al eliminar la organización: ', error);
            return false;
        }
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
                                        DESCRIPCIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        TIPO
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        SUBTIPO
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        RECAUDOS
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
                                {servicios.map((servicio, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{servicio.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="font-medium text-gray-900">{servicio.type}</div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="font-medium text-gray-900">{servicio.subtype}</div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            {servicio.precautions.map((precaution, index) => (
                                                <div key={index}>
                                                    <div className="mt-1 text-gray-500">{precaution.name}</div>
                                                </div>
                                            ))}
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
                                                                onClick={() => handleClickActions(item.id, servicio)}
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
                <ServicioModal onClose={() => setOpenEditModal(false)} editData={editModalData}/>
            )}
            {openDeleteModal && (
                <DeleteModal
                    term={"Organización"}
                    onClose={() => setOpenDeleteModal(false)}
                    onDelete={handleDeleteOrganization}
                />
            )}
        </div>
    );
}