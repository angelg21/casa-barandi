"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft";
import { PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "@/src/components/Pagination/Pagination";
import { Servicio } from "../../interfaces/Servicio";
import ServiciosTable from "../ServiciosTable/ServiciosTable";
import ServicioModal from "../ServicioModal/ServicioModal";

interface FilteredServiciosTableProps {
    servicios: Servicio[];
}


const FilteredServiciosTable: React.FC<FilteredServiciosTableProps> = ({ servicios }) => {
    const [filteredServicios, setFilteredServicios] = useState<Servicio[]>(servicios);
    const [isServicioModalOpen, setIsServicioModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let filtered = servicios;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((servicio) =>
                servicio.description.toLowerCase().includes(lowercasedTerm) ||
                servicio.type.toLowerCase().includes(lowercasedTerm) ||
                servicio.subtype.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredServicios(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, servicios]);

    // Calcular las organizaciones de la página actual
    const indexOfLastServ = currentPage * itemsPerPage;
    const indexOfFirstServ = indexOfLastServ - itemsPerPage;
    const currentServicios = filteredServicios.slice(indexOfFirstServ, indexOfLastServ);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOpenOrganizationModal = () => {
        setIsServicioModalOpen(true);
    };

    const handleCloseOrganizationModal = () => {
        setIsServicioModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SearchBar onSearchChange={setSearchTerm} />
                <div onClick={handleOpenOrganizationModal}>
                    <ButtonWithIconLeft
                        title="Agregar Servicio"
                        textColor="text-white"
                        backgroundColor="bg-cb-green"
                        hover="hover:bg-cb-light-green"
                        icon={<PlusIcon />}
                        iconColor="text-white"
                    />
                </div>
            </div>
            <ServiciosTable servicios={currentServicios}/>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredServicios.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            {isServicioModalOpen && (
                <ServicioModal
                    onClose={handleCloseOrganizationModal}
                />
            )}
        </div>
    );
};

export default FilteredServiciosTable;