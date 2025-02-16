'use client'

import SearchBar from "@/src/components/SearchBar/SearchBar"
import { ColaboradorValues } from "../../interfaces/ColaboradoresSheet";
import { useEffect, useState } from "react";
import Pagination from "@/src/components/Pagination/Pagination";
import { ColaboradoresTable } from "../ColaboradoresTable/ColaboradoresTable";

interface ColaboradoresViewProps {
    colaboradores: ColaboradorValues[];
}

export const ColaboradoresView = ({ colaboradores }: ColaboradoresViewProps) => {

    const [filteredColaboradores, setFilteredColaboradores] = useState<ColaboradorValues[]>(colaboradores);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        let filtered = colaboradores;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((colaborador) =>
                colaborador.personName.toLowerCase().includes(lowercasedTerm) ||
                colaborador.personCi.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredColaboradores(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, colaboradores]);

    // Calcular los usuarios de la página actual
    const indexOfLastColaborador = currentPage * itemsPerPage;
    const indexOfFirstColaborador = indexOfLastColaborador - itemsPerPage;
    const currentColaboradores = filteredColaboradores.slice(indexOfFirstColaborador, indexOfLastColaborador);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between min-[1200px]:grid min-[1200px]:grid-cols-2 min-[1200px]:gap-4">
                <SearchBar onSearchChange={setSearchTerm} />
            </div>
            <ColaboradoresTable colaboradores={currentColaboradores} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredColaboradores.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
