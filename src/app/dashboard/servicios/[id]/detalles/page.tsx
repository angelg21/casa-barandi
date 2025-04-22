import { getPerson } from "@/src/personas/actions/get-person-by-id";
import { redirect } from "next/navigation";
import { PersonViewComponent } from "@/src/personas/components/PersonView/PersonView";
import { Servicio } from "@/src/servicios/interfaces/Servicio";
import { ServicioViewComponent } from "@/src/servicios/components/ServicioView/ServicioView";

const data: Servicio = {
  description: "Análisis de sangre completo",
  type: "Laboratorio",
  subtype: "Hematología",
  prescriptions: [
    { prescriptionName: "Ayuno de 8 horas" },
    { prescriptionName: "No consumir alcohol 24 horas antes" },
  ],
  results: [
    { name: "Hemoglobina" },
    { name: "Glóbulos rojos" },
    { name: "Glóbulos blancos" },
  ],
  precautions: [
    {
      name: "Niveles de glucosa",
      type: "VALUE",
      precautionMetadata: { unidad: "mg/dL" },
    },
    {
      name: "Recuento de plaquetas",
      type: "MIN-MAX",
      precautionMetadata: { unidad: "x10^3/µL" },
    },
    {
      name: "Tipo de sangre",
      type: "ENUM",
      precautionMetadata: { opciones: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
    },
  ],
};

export default async function ServicioViewPage({
  params,
}: {
  // 👇 Declaramos que `params` es una Promise
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getPerson(id);

  if (!response.ok) {
    //redirect("/dashboard/personas");
  }

  return (
    <main>
      <ServicioViewComponent data={data} />
    </main>
  );
}