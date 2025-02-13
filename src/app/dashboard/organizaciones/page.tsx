import { getAllOrgs } from "@/src/organizaciones/actions/get-orgs";
import FilteredOrganizationsTable from "@/src/organizaciones/components/FilteredOrganizationTable/FilteredOrganizationTable";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";

export default async function Organizaciones() {

    const { data = [] } = await getAllOrgs();

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
                <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                    <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Organizaciones</h2>
                    <FilteredOrganizationsTable organizations={data} />
                </div>
        </AlertProvider>
    );
}