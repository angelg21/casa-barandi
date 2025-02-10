"use client";
import React, { useState, useEffect } from 'react';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import Pagination from '@/src/components/Pagination/Pagination';
import { Persona } from '../../interfaces/Persona';
import PersonTable from '../PersonTable/PersonTable';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ButtonWithIconLeft } from '@/src/components/ButtonWithIconLeft/ButtonWithIconLeft';
import PersonModal from '../PersonModal/PersonModal';

interface FilteredPersonTableProps {
    persons: Persona[];
}

const matchDocumentation = (term: string, documents: {documentType: string, documentNumber: string}[]): boolean => {
    return documents.some(d => d.documentNumber.includes(term));
};

const FilteredPersonsTable: React.FC<FilteredPersonTableProps> = ({ persons }) => {
    const [filteredPersons, setFilteredPersons] = useState<Persona[]>(persons);
    const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let filtered = persons;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((person) =>
                person.fullName.toLowerCase().includes(lowercasedTerm) ||
                matchDocumentation(lowercasedTerm, person.documents)
            );
        }

        setFilteredPersons(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, persons]);

    // Calcular los usuarios de la página actual
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentPersons = filteredPersons.slice(indexOfFirstUser, indexOfLastUser);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOpenPersonModal = () => {
        setIsPersonModalOpen(true);
    };

    const handleClosePersonModal = () => {
        setIsPersonModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SearchBar onSearchChange={setSearchTerm} />
                <div onClick={handleOpenPersonModal}>
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
            <PersonTable persons={currentPersons} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredPersons.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            {isPersonModalOpen && (
                <PersonModal
                    onClose={handleClosePersonModal}
                //onSave={handleSaveRoles}
                />
            )}
        </div>
    );
};

export default FilteredPersonsTable;