'use client'

import React, { useState, useEffect } from 'react';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import Pagination from '@/src/components/Pagination/Pagination';

import { PlusIcon } from '@heroicons/react/24/outline';
import { ButtonWithIconLeft } from '@/src/components/ButtonWithIconLeft/ButtonWithIconLeft';

import { Cita } from '../../../interfaces/Programa';
import CitasTable from '../CitasTable/CitasTable';
import CitaModal from '../CitaModal/CitaModal';

interface FilteredCitasTableProps {
    citas: Cita[];
}

const FilteredCitasTable: React.FC<FilteredCitasTableProps> = ({ citas }) => {
    const [filteredCitas, setFilteredCitas] = useState<Cita[]>(citas);
    const [isCitaFormModalOpen, setIsCitaFormModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let filtered = citas;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((cita) =>
                cita.person.name.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredCitas(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, citas]);

    // Calcular los programas de la página actual
    const indexOfLastCita = currentPage * itemsPerPage;
    const indexOfFirstCita = indexOfLastCita - itemsPerPage;
    const currentCitas = filteredCitas.slice(indexOfFirstCita, indexOfLastCita);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOpenPersonModal = () => {
        setIsCitaFormModalOpen(true);
    };

    const handleClosePersonModal = () => {
        setIsCitaFormModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SearchBar onSearchChange={setSearchTerm} />
                <div onClick={handleOpenPersonModal}>
                    <ButtonWithIconLeft
                        title="Crear Cita"
                        textColor="text-white"
                        backgroundColor="bg-cb-green"
                        hover="hover:bg-cb-light-green"
                        icon={<PlusIcon />}
                        iconColor="text-white"
                    />
                </div>
            </div>
            <CitasTable citas={currentCitas}/>
            {/* <PersonTable persons={currentPrograms} /> */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredCitas.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            {isCitaFormModalOpen && (
                <CitaModal
                    onClose={handleClosePersonModal} 
                />
            )}
        </div>
    );
};

export default FilteredCitasTable;