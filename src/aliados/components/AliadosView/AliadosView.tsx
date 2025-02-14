
import React, { useEffect, useState } from 'react'
import { AliadoValues } from '../../interfaces/AliadosSheet';
import { AliadosTable } from '../AliadosTable/AliadosTable';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import Pagination from '@/src/components/Pagination/Pagination';

interface AliadosViewProps {
    aliados: AliadoValues[];
}

export const AliadosView = ({ aliados }: AliadosViewProps) => {

    const [filteredAliados, setFilteredAliados] = useState<AliadoValues[]>(aliados);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        let filtered = aliados;


        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((aliado) =>
                aliado.razon_social!.toLowerCase().includes(lowercasedTerm) 
            );
        }

        setFilteredAliados(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, aliados]);

    // Calcular los usuarios de la página actual
    const indexOfLastAliado = currentPage * itemsPerPage;
    const indexOfFirstAliado = indexOfLastAliado - itemsPerPage;
    const currentAliados = filteredAliados.slice(indexOfFirstAliado, indexOfLastAliado);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between min-[1200px]:grid min-[1200px]:grid-cols-2 min-[1200px]:gap-4">
                <SearchBar onSearchChange={setSearchTerm} />
            </div>
            <AliadosTable aliados={currentAliados}/>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredAliados.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
