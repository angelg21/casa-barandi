import { PersonasProvider } from "@/src/forms/personas/context/PersonasContext";
import { FilteredUserTable } from "@/src/users/components/FilteredUserTable/FilteredUserTable";
import { AlertProvider } from "@/src/users/contex/AlertContext";




export default function Usuarios() {

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <PersonasProvider>
                <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                    <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Personas</h2>
                    <FilteredUserTable />
                </div>
            </PersonasProvider>
        </AlertProvider>
    );
}