"use client"
// UserTable.tsx
import React, { useState } from 'react';


import RoleModal from '../NewUserModal/NewUserModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { changeUserRole } from '@/src/users/actions/change-user-role';
import { deleteUser } from '../../actions/delete-user';
import { PersonaFormValues } from '@/src/forms/personas/interfaces/PersonasForm';
import { DocumentTextIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'

export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    image: string;
};

interface UserTableProps {
    users: PersonaFormValues[];
}

interface WorkSheetAction {
    id: string;
    name: string;
    Icon: React.ElementType;
    role: string;
}

const workSheetsActions: WorkSheetAction[] = [
    { id: '01', name: 'Visualizar', Icon: EyeIcon, role: 'reviewer' },
    { id: '02', name: 'Editar', Icon: PencilSquareIcon, role: 'admin' },
    { id: '03', name: 'Eliminar', Icon: TrashIcon, role: 'admin' },
];

export default function UserTable({ users }: UserTableProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenRoleModal = (user: User) => {
        setSelectedUser(user);
        setIsRoleModalOpen(true);
    };

    const handleCloseRoleModal = () => {
        setIsRoleModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveRoles = async (roles: string[]) => {
        if (selectedUser) {
            try {
                await changeUserRole(selectedUser.id, roles);
                return true;
            } catch (error) {
                console.error('Error al cambiar los roles:', error);
                return false;
            }
        }
        return false;
    };

    const handleOpenDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await deleteUser(selectedUser?.id);
                return true;
            } catch (error) {
                console.error('Error al eliminar el usuario: ', error);
                return false;
            }
        }
        return false;
    };
    return (
        <div className="">
            <div className="mt-8 ">
                <div className="overflow-x-auto  lg:max-w-[2000px]">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-gray-300 overflow-hidden rounded-lg">
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
                                {users.map((user) => (
                                    <tr key={user.fullName}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{user.fullName}</div>
                                                    {/* <div className="mt-1 text-gray-500">{user.email}</div>
                                                    <div className="mt-1 text-gray-500">{user.email}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            {user.documents.map((document) => (
                                                <div key={document.documentNumber}>
                                                    <div className="mt-1 text-gray-500">{document.documentType}</div>
                                                    <div className="mt-1 text-gray-500">{document.documentNumber}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{user.dateOfBirth}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 pl-4 pr-3 text-sm min-w-40 max-w-44">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div >
                                                        <div className="font-semibold text-gray-900">Municipio:
                                                            <span className="font-medium text-gray-900">  {user.location.municipaly}</span>
                                                        </div>
                                                        <div className="font-semibold text-gray-900">Parroquia:
                                                            <span className="font-medium text-gray-900">  {user.location.parish}</span>
                                                        </div>
                                                        <div className="font-semibold text-gray-900">Dirección:
                                                            <span className="font-medium text-gray-900">  {user.location.houseAddress}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="flex flex-row gap-6 lg:grid lg:grid-cols-2 lg:gap-4">
                                                <button
                                                    className="xl:hidden text-cb-gray-letter hover:text-gray-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                //onClick={() => handleOpenRoleModal(user)}
                                                >
                                                    <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-gray-500" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="hidden xl:flex text-cb-gray-letter hover:text-gray-500 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                //onClick={() => handleOpenRoleModal(user)}
                                                >
                                                    <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-gray-500" />
                                                    </svg>
                                                    Información
                                                </button>
                                                <button
                                                    className="xl:hidden text-d-red hover:text-red-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                //onClick={() => handleOpenDeleteModal(user)}
                                                >
                                                    <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-red-500" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="hidden xl:flex text-d-red hover:text-red-500 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                //onClick={() => handleOpenDeleteModal(user)}
                                                >
                                                    <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-red-500" />
                                                    </svg>
                                                    Eliminar Usuario
                                                </button>
                                            </div>
                                        </td> */}
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            {user.phones.map((document) => (
                                                <div key={document.phoneNumber}>
                                                    <div className="mt-1 text-gray-500">{document.phoneNumber}</div>
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
                                                    {workSheetsActions.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            <div
                                                                role="button"
                                                                className="flex hover:bg-gray-200 space-x-3 px-3 py-1 text-sm leading-6"
                                                                //onClick={() => handleClickActions(workSheetType, item.id, workSheetId, workSheetStatus)}
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
            {/* {isRoleModalOpen && selectedUser && (
                <RoleModal
                    user={selectedUser}
                    onClose={handleCloseRoleModal}
                    onSave={handleSaveRoles}
                />
            )}
            {isDeleteModalOpen && selectedUser && (
                <DeleteModal
                    user={selectedUser}
                    onClose={handleCloseDeleteModal}
                    onDelete={handleDeleteUser}
                />
            )} */}
        </div>
    );
}