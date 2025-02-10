
import React, { useEffect, useState } from 'react'
import { AliadoSheetValues } from '../../interfaces/AliadosSheet';
import { AliadosSheet } from '../AliadosSheet/AliadosSheet';
import SearchBar from '@/src/components/SearchBar/SearchBar';

interface AliadosFilteredSheetsProps {
    aliados: AliadoSheetValues[];
}

export const AliadosFilteredSheets = ({ aliados }: AliadosFilteredSheetsProps) => {

    const [filteredAliados, setFilteredAliados] = useState<AliadoSheetValues[]>(aliados);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        let filtered = aliados;


        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((aliado) =>
                aliado.companyName.toLowerCase().includes(lowercasedTerm) ||
                aliado.name.toLowerCase().includes(lowercasedTerm)
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
            <AliadosSheet aliados={currentAliados}/>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredVoluntarios.length / itemsPerPage)}
                onPageChange={handlePageChange}
            /> */}
        </div>
    )
}
