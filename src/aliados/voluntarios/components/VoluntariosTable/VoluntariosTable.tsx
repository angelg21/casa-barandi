"use client"
// UserTable.tsx
import React, { useState } from 'react';



import { DataModal } from '../DataModal/DataModal';
import Voluntarios from '../../../../app/dashboard/aliados/voluntarios/page';
import { useRouter } from 'next/navigation';

export interface Voluntario {
    id: string;
    name: string;
    ci: string;
    email: string;
    roles: string[];
    image: string;
};

interface VoluntariosTableProps {
    voluntarios: Voluntario[];
}

export default function VoluntariosTable({ voluntarios }: VoluntariosTableProps) {
    const [selectedVoluntario, setSelectedVoluntario] = useState<Voluntario | null>(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();
    
    const handleOpenRoleModal = (voluntario: Voluntario) => {
        setSelectedVoluntario(voluntario);
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

    const handleOpenDeleteModal = (user: Voluntario) => {
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

    const handleModifyClick = () => {

        router.push(`/dashboard/formularios/aliados/voluntarios`);
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
                                        VOLUNTARIO
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        CÉDULA
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
                                {voluntarios.map((voluntario) => (
                                    <tr key={voluntario.email}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="font-medium text-gray-900">{voluntario.name}</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <div className="font-medium text-gray-900">{voluntario.ci}</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="flex flex-row gap-6 lg:grid lg:grid-cols-3 lg:gap-4">
                                                <button
                                                    className="xl:hidden text-cb-gray-letter hover:text-gray-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    onClick={() => handleOpenRoleModal(voluntario)}
                                                >
                                                    <svg className='mr-4' width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                                    </svg>

                                                </button>
                                                <button
                                                    className="hidden xl:flex text-cb-gray-letter hover:text-gray-500 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    onClick={() => handleOpenRoleModal(voluntario)}
                                                >
                                                    <svg className='mr-4' width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                                    </svg>

                                                    Visualizar Datos
                                                </button>
                                                <button
                                                    className="xl:hidden text-cb-gray-letter hover:text-gray-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    onClick={() => handleOpenRoleModal(voluntario)}
                                                >
                                                    <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#343434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-gray-500" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="hidden xl:flex text-cb-gray-letter hover:text-gray-500 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    onClick={() => handleModifyClick()}
                                                >
                                                    <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#343434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-gray-500" />
                                                    </svg>
                                                    Modificar Datos
                                                </button>
                                                <button
                                                    className="xl:hidden text-d-red hover:text-red-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    onClick={() => handleOpenDeleteModal(voluntario)}
                                                >
                                                    <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-red-500" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="hidden xl:flex text-d-red hover:text-red-500 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    onClick={() => handleOpenDeleteModal(voluntario)}
                                                >
                                                    <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-red-500" />
                                                    </svg>
                                                    Eliminar Voluntario
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isRoleModalOpen && selectedVoluntario && (
                <DataModal
                    voluntario={selectedVoluntario}
                    onClose={handleCloseRoleModal}
                />
            )}
        </div>
    );
}