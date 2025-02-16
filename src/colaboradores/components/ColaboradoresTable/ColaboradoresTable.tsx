import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TableAction } from "@/src/components/interfaces/TableActions";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import DeleteModal from "@/src/components/DeleteModal/DeleteModal";
import { ColaboradorValues } from "../../interfaces/ColaboradoresSheet";
import { ColaboradoresModalForm } from "../ColaboradoresModalForm/ColaboradoresModalForm";


interface ColaboradoresViewProps {
    colaboradores: ColaboradorValues[];
}

const Actions: TableAction[] = [
    //{ id: '01', name: 'Visualizar', Icon: EyeIcon },
    { id: '02', name: 'Editar', Icon: PencilSquareIcon },
    { id: '03', name: 'Eliminar', Icon: TrashIcon },
];

export const ColaboradoresTable = ({colaboradores}: ColaboradoresViewProps) => {

        const [openDeleteModal, setOpenDeleteModal] = useState(false);
        const [openEditModal, setOpenEditModal] = useState(false);
        const [editModalData, setEditModalData] = useState<ColaboradorValues | undefined>(undefined);
        const [idToDelete, setIdToDelete] = useState<string | undefined>("")
    
        const handleClickActions = (action: string, person: ColaboradorValues) => {
            if (action === '02') {
                setOpenEditModal(true);
                setEditModalData(person)
            } else if (action === "03") {
                setIdToDelete(person.id)
                setOpenDeleteModal(true);
            }
        };
    
        const handleDeleteUser = async () => {
            console.log(idToDelete)
                // try {
                //     const response = await deletePerson(idToDelete);;
        
                //     if (response.ok) {
                //         return true;
                //     } else {
                //         console.error(response.message);
                //         return false;
                //     }
                // } catch (error) {
                //     console.error('Error al eliminar el usuario: ', error);
                //     return false;
                // }
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
                                        COLABORADOR
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        IDENTIFICACIÓN
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
                                        FECHA DE INCORPORACIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                    >
                                        FECHA DE DESVINCULACIÓN
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
                                {colaboradores.map((colaborador, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{colaborador.personName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{colaborador.personCi}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{colaborador.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{colaborador.incorporationDate}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{colaborador.terminationDate}</div>
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
                                                                onClick={() => handleClickActions(item.id, colaborador)}
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
                <ColaboradoresModalForm onClose={() => setOpenEditModal(false)} editValues={editModalData} />
            )}
            {openDeleteModal && (
                <DeleteModal
                    term={"Persona"}
                    onClose={() => setOpenDeleteModal(false)}
                    onDelete={handleDeleteUser}
                />
            )}
        </div>
    )
}
