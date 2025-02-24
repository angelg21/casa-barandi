'use client'

import SearchBar from "@/src/components/SearchBar/SearchBar"

import { useEffect, useState } from "react";
import Pagination from "@/src/components/Pagination/Pagination";
import { BeneficiarioValues } from "../../interfaces/BeneficiariosSheet";
import { BeneficiariosTable } from "../BeneficiariosTable/BeneficiariosTable";

interface BeneficiariosViewProps {
    beneficiarios: BeneficiarioValues[];
}

export const BeneficiariosView = ({ beneficiarios }: BeneficiariosViewProps) => {

    const [filteredBeneficarios, setFilteredBeneficiarios] = useState<BeneficiarioValues[]>(beneficiarios);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        let filtered = beneficiarios;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((beneficiario) =>
                beneficiario.fullName!.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredBeneficiarios(filtered);
        setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
    }, [searchTerm, beneficiarios]);

    // Calcular los usuarios de la página actual
    const indexOfLastBeneficiario = currentPage * itemsPerPage;
    const indexOfFirstBeneficiario = indexOfLastBeneficiario - itemsPerPage;
    const currentBeneficiarios = filteredBeneficarios.slice(indexOfFirstBeneficiario, indexOfLastBeneficiario);

    // Cambiar la página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between min-[1200px]:grid min-[1200px]:grid-cols-2 min-[1200px]:gap-4">
                <SearchBar onSearchChange={setSearchTerm} />
            </div>
            <BeneficiariosTable beneficiarios={currentBeneficiarios} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredBeneficarios.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    )
}



