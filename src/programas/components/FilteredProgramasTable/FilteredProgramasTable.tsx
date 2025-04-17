'use client'

import React, { useState, useEffect } from 'react';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import Pagination from '@/src/components/Pagination/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ButtonWithIconLeft } from '@/src/components/ButtonWithIconLeft/ButtonWithIconLeft';
import { Programa } from '../../interfaces/Programa';
import ProgramasTable from '../ProgramasTable/ProgramasTable';
import ProgramaModal from '../ProgramaModal/ProgramaModal';

interface FilteredProgramasTableProps {
    programas: Programa[];
}

const FilteredProgramasTable: React.FC<FilteredProgramasTableProps> = ({ programas }) => {
    const [filteredProgramas, setFilteredProgramas] = useState<Programa[]>(programas);
    const [isProgramaFormModalOpen, setIsProgramaFormModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let filtered = programas;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((programa) =>
                programa.description.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredProgramas(filtered);
        setCurrentPage(1);
    }, [searchTerm, programas]);

    const indexOfLastProgram = currentPage * itemsPerPage;
    const indexOfFirstProgram = indexOfLastProgram - itemsPerPage;
    const currentPrograms = filteredProgramas.slice(indexOfFirstProgram, indexOfLastProgram);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOpenPersonModal = () => {
        setIsProgramaFormModalOpen(true);
    };

    const handleClosePersonModal = () => {
        setIsProgramaFormModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SearchBar onSearchChange={setSearchTerm} />
                <div onClick={handleOpenPersonModal}>
                    <ButtonWithIconLeft
                        title="Crear Programa"
                        textColor="text-white"
                        backgroundColor="bg-cb-green"
                        hover="hover:bg-cb-light-green"
                        icon={<PlusIcon />}
                        iconColor="text-white"
                    />
                </div>
            </div>
            <ProgramasTable programas={currentPrograms} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProgramas.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            {isProgramaFormModalOpen && (
                <ProgramaModal
                    onClose={handleClosePersonModal} 
                />
            )}
        </div>
    );
};

export default FilteredProgramasTable;