'use client';

import { useEffect, useState } from "react";
import VoluntariosTable from "../VoluntariosTable/VoluntariosTable";
import SearchBar from "@/src/components/SearchBar/SearchBar";


interface Voluntario {
    id: string;
    ci: string;
    name: string;
    email: string;
    roles: string[];
    image: string;
}

interface VoluntariosFilteredTableProps {
    voluntarios: Voluntario[];
}
export const VoluntariosFilteredTable: React.FC<VoluntariosFilteredTableProps> = ({ voluntarios }) => {

    const [filteredVoluntarios, setFilteredVoluntarios] = useState<Voluntario[]>(voluntarios);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let filtered = voluntarios;

        if (selectedRoles.length > 0) {
            filtered = filtered.filter((voluntario) =>
                voluntario.roles.some((role) => selectedRoles.includes(role))
            );
        }

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(lowercasedTerm) ||
                user.email.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredVoluntarios(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [selectedRoles, searchTerm, voluntarios]);

    // Calcular los usuarios de la página actual
    const indexOfLastVoluntario = currentPage * itemsPerPage;
    const indexOfFirstVoluntario = indexOfLastVoluntario - itemsPerPage;
    const currentVoluntarios = filteredVoluntarios.slice(indexOfFirstVoluntario, indexOfLastVoluntario);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between min-[1200px]:grid min-[1200px]:grid-cols-2 min-[1200px]:gap-4">
                <SearchBar onSearchChange={setSearchTerm} />
            </div>
            <VoluntariosTable voluntarios={currentVoluntarios} />
            {/* <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredVoluntarios.length / itemsPerPage)}
                onPageChange={handlePageChange}
            /> */}
        </div>
    )
}