
import FilteredProgramasTable from "@/src/programas/components/FilteredProgramasTable/FilteredProgramasTable";
import { AliadosProvider } from "@/src/programas/context/AliadosContext";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";
import { ColaboradoresProvider } from '../../../programas/context/ColaboradoresContext';
import { getAllAlliesNames } from "@/src/programas/actions/get-aliados-list";
import { getAllCollaboratorsNames } from "@/src/programas/actions/get-colaboradores-list";
import { getAllServicesNames } from "@/src/programas/actions/get-services-list";
import { ServiceProvider } from "@/src/programas/context/ServiceContext";
import { getAllPrograms } from "@/src/programas/actions/get-programs";

export default async function Programas() {
    const { data: aliadosData = [] } = await getAllAlliesNames();
    const { data: colaboradoresData = [] } = await getAllCollaboratorsNames();
    const { data: servicesData = [] } = await getAllServicesNames();
    const { data: programsData = [] } = await getAllPrograms();
    
    return (
        <AliadosProvider initialData={aliadosData}>
            <ColaboradoresProvider initialData={colaboradoresData}>
                <ServiceProvider initialData={servicesData}>
                    <AlertProvider>
                        <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                            <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Programas</h2>
                            <FilteredProgramasTable programas={programsData} />
                        </div>
                    </AlertProvider>
                </ServiceProvider>
            </ColaboradoresProvider>
        </AliadosProvider>
    );
}