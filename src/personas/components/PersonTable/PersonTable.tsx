"use client"
import React, { useState } from 'react';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import { Persona } from '../../interfaces/Persona';
import { deletePerson } from '../../actions/delete-person';
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
import PersonModal from '../PersonModal/PersonModal';

interface PersonTableProps {
  persons: Persona[];
}

const Actions: TableAction[] = [
    { id: '01', name: 'Visualizar', Icon: EyeIcon },
    { id: '02', name: 'Editar', Icon: PencilSquareIcon },
    { id: '03', name: 'Eliminar', Icon: TrashIcon },
];

export default function PersonTable({ persons }: PersonTableProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | undefined>("")
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState<Persona | undefined>(undefined);
    const router = useRouter();

    const handleClickActions = (action: string, person: Persona) => {
        if (action === '01') 
            router.push(`/dashboard/personas/${person.id}/detalles`);
        else if (action === '02') {
            setOpenEditModal(true);
            setEditModalData(person)
        } else if (action === "03") {
            setIdToDelete(person.id)
            setOpenDeleteModal(true);
        }
    };

  const handleDeleteUser = async () => {
    try {
        const response = await deletePerson(idToDelete);;

            if (response.ok) {
                return true;
            } else {
                console.error(response.message);
                return false;
            }
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
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
                                    USUARIO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    DOCUMENTO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    NACIMIENTO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    DIRECCIÓN
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    TELÉFONOS
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
                            {persons.map((person) => (
                                <tr key={person.fullName}>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        <div className="flex items-center">
                                            <div className="">
                                                <div className="font-medium text-gray-900">{person.fullName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        {person.documents.map((document) => (
                                            <div key={document.documentNumber}>
                                                <div className="mt-1 text-gray-500">{document.documentType}</div>
                                                <div className="mt-1 text-gray-500">{document.documentNumber}</div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        <div className="flex items-center">
                                            <div className="">
                                                <div className="font-medium text-gray-900">{person.dateOfBirth}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 pl-4 pr-3 text-sm min-w-40 max-w-44">
                                        <div className="flex items-center">
                                            <div className="">
                                                <div >
                                                    <div className="font-semibold text-gray-900">Municipio:
                                                        <span className="font-medium text-gray-900">  {person.location.municipality}</span>
                                                    </div>
                                                    <div className="font-semibold text-gray-900">Parroquia:
                                                        <span className="font-medium text-gray-900">  {person.location.parish}</span>
                                                    </div>
                                                    <div className="font-semibold text-gray-900">Dirección:
                                                        <span className="font-medium text-gray-900">  {person.location.houseAddress}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        {person.phones.map((p) => (
                                            <div key={p.phoneNumber}>
                                                <div className="mt-1 text-gray-500">{p.phoneType}</div>
                                                <div className="mt-1 text-gray-500">{p.phoneNumber}</div>
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
                                                            onClick={() => handleClickActions(item.id, person)}
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
            <PersonModal onClose={() => setOpenEditModal(false)} editData={editModalData} />
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