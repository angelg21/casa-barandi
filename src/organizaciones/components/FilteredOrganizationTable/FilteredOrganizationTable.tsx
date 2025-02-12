"use client";
import { useEffect, useState } from "react";
import { Organizacion } from "../../interfaces/Organizacion";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft";
import { PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "@/src/components/Pagination/Pagination";
import OrganizationTable from "../OrganizationTable/OrganizationTable";
import OrganizationModal from "../OrganizationModal/OrganizationModal";

interface FilteredOrganizationTableProps {
    organizations: Organizacion[];
}

const matchDocumentation = (term: string, rif: string): boolean => {
    return rif.includes(term);
};

const FilteredOrganizationsTable: React.FC<FilteredOrganizationTableProps> = ({ organizations }) => {
    const [filteredOrganizations, setFilteredOrganizations] = useState<Organizacion[]>(organizations);
    const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let filtered = organizations;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((organization) =>
                organization.razon_social.toLowerCase().includes(lowercasedTerm) ||
                matchDocumentation(lowercasedTerm, organization.rif)
            );
        }

        setFilteredOrganizations(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, organizations]);

    // Calcular las organizaciones de la página actual
    const indexOfLastOrg = currentPage * itemsPerPage;
    const indexOfFirstOrg = indexOfLastOrg - itemsPerPage;
    const currentOrganizations = filteredOrganizations.slice(indexOfFirstOrg, indexOfLastOrg);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOpenOrganizationModal = () => {
        setIsOrganizationModalOpen(true);
    };

    const handleCloseOrganizationModal = () => {
        setIsOrganizationModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SearchBar onSearchChange={setSearchTerm} />
                <div onClick={handleOpenOrganizationModal}>
                    <ButtonWithIconLeft
                        title="Agregar Organización"
                        textColor="text-white"
                        backgroundColor="bg-cb-green"
                        hover="hover:bg-cb-light-green"
                        icon={<PlusIcon />}
                        iconColor="text-white"
                    />
                </div>
            </div>
            <OrganizationTable organizations={currentOrganizations} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrganizations.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            {isOrganizationModalOpen && (
                <OrganizationModal
                    onClose={handleCloseOrganizationModal}
                />
            )}
        </div>
    );
};

export default FilteredOrganizationsTable;