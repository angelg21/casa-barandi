import { getAllServicios } from "@/src/servicios/actions/get-servicios";
import FilteredServiciosTable from "@/src/servicios/components/FilteredServiciosTableProps/FilteredServiciosTableProps";
//import { Servicio } from "@/src/servicios/interfaces/Servicio";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";

export default async function Servicios() {

  const { data = [] } = await getAllServicios();

  return (
    <AlertProvider> {/* Envolver todo en AlertProvider */}
      <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
        <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Servicios</h2>
        <FilteredServiciosTable servicios={data} />
      </div>
    </AlertProvider>
  );
}