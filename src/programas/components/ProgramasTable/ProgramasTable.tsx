'use client'

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
import { PencilSquareIcon, TrashIcon, CalendarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { Programa } from '../../interfaces/Programa';
import { deleteProgram } from '../../actions/delete-program';
import ProgramaModal from '../ProgramaModal/ProgramaModal';

interface ProgramasTableProps {
    programas: Programa[];
}

const Actions: TableAction[] = [
    { id: '01', name: 'Citas', Icon: CalendarIcon },
    { id: '02', name: 'Admisiones', Icon: ClipboardDocumentListIcon },
    { id: '03', name: 'Editar', Icon: PencilSquareIcon },
    { id: '04', name: 'Eliminar', Icon: TrashIcon },
];

export default function ProgramasTable({ programas }: ProgramasTableProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | undefined>("")
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState<Programa | undefined>(undefined);
    const router = useRouter();

    const handleClickActions = (action: string, program: Programa) => {
        if (action === '01')
            router.push(`/dashboard/programas/${program.id}/citas`);
        else if (action === '02') {
            router.push(`/dashboard/programas/${program.id}/admisiones`);
        }
        else if (action === '03') {
            setOpenEditModal(true);
            setEditModalData(program)
        } else if (action === "04") {
            setIdToDelete(program.id)
            setOpenDeleteModal(true);
        }
    };

    const handleDeleteProgram = async () => {
        try {
            const response = await deleteProgram (idToDelete); 
            
            if (response.ok) {
                return true;
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            console.error('Error al eliminar el programa: ', error);
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
                                        FECHA / HORA DE INICIO
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        HORA DE CIERRE
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        COMUNIDAD
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
                                {programas.map((programa, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{programa.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{`${programa.dateStart} / ${programa.timeStart}`}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{programa.timeEnd}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{programa.community}</div>
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
                                                                onClick={() => handleClickActions(item.id, programa)}
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
                <ProgramaModal onClose={() => setOpenEditModal(false)} editData={editModalData} />
            )}
            {openDeleteModal && (
                <DeleteModal
                    term={"Programa"}
                    onClose={() => setOpenDeleteModal(false)}
                    onDelete={handleDeleteProgram}
                />
            )}
        </div>
    );
}