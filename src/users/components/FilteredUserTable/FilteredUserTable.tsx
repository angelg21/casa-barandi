'use client';

import { useContext, useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import CheckFilter from "../CheckFilter/CheckFilter";
import UserTable from "../UserTable/UserTable";
import Pagination from "../Pagination/Pagination";
import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PersonasContext } from "@/src/forms/personas/context/PersonasContext";
import RoleModal from "../NewUserModal/NewUserModal";



export const FilteredUserTable: React.FC = () => {
    const personas = useContext(PersonasContext);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');



    // Calcular los usuarios de la página actual
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = personas.slice(indexOfFirstUser, indexOfLastUser);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOpenRoleModal = () => {
        setIsRoleModalOpen(true);
    };

    const handleCloseRoleModal = () => {
        setIsRoleModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ">
                <SearchBar onSearchChange={setSearchTerm} />
                <div onClick={handleOpenRoleModal}>
                    <ButtonWithIconLeft
                        title="Agregar Persona"
                        textColor="text-white"
                        backgroundColor="bg-cb-green"
                        hover="hover:bg-cb-light-green"
                        icon={<PlusIcon />}
                        iconColor="text-white"
                    />
                </div>
            </div>
            <UserTable users={currentUsers} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(personas.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            {isRoleModalOpen && (
                <RoleModal
                    onClose={handleCloseRoleModal}
                //onSave={handleSaveRoles}
                />
            )}
        </div>
    )
}

