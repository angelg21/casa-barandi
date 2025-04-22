import { getAllServicios } from "@/src/servicios/actions/get-servicios";
import FilteredServiciosTable from "@/src/servicios/components/FilteredServiciosTableProps/FilteredServiciosTableProps";
//import { Servicio } from "@/src/servicios/interfaces/Servicio";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";

// const data: Servicio[] = [
//     {
//       description: "Análisis de sangre completo",
//       type: "Laboratorio",
//       subtype: "Hematología",
//       prescriptions: [
//         { prescriptionName: "Ayuno de 8 horas" },
//         { prescriptionName: "No consumir alcohol 24 horas antes" },
//       ],
//       results: [
//         { name: "Hemoglobina" },
//         { name: "Glóbulos rojos" },
//         { name: "Glóbulos blancos" },
//       ],
//       precautions: [
//         {
//           name: "Niveles de glucosa",
//           type: "VALUES",
//           precautiontMetadata: { unidad: "mg/dL" },
//         },
//         {
//           name: "Recuento de plaquetas",
//           type: "MIN-MAX",
//           precautiontMetadata: { unidad: "x10^3/µL" },
//         },
//         {
//           name: "Tipo de sangre",
//           type: "ENUM",
//           precautiontMetadata: { opciones: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
//         },
//       ],
//     },
//     {
//       description: "Radiografía de tórax",
//       type: "Imagenología",
//       subtype: "Rayos X",
//       prescriptions: [{ prescriptionName: "Retirar objetos metálicos" }],
//       results: [{ name: "Imágenes de pulmones y corazón" }],
//       precautions: [
//         {
//           name: "Protección de plomo",
//           type: "ENUM",
//           precautiontMetadata: { opciones: ["Sí", "No"] },
//         },
//       ],
//     },
//     {
//       description: "Electrocardiograma (ECG)",
//       type: "Cardiología",
//       subtype: "Diagnóstico",
//       prescriptions: [{ prescriptionName: "No aplicar cremas o lociones" }],
//       results: [{ name: "Registro de actividad eléctrica del corazón" }],
//       precautions: [
//         {
//           name: "Frecuencia cardíaca",
//           type: "MIN-MAX",
//           precautiontMetadata: { unidad: "bpm" },
//         },
//       ],
//     },
//     {
//       description: "Ultrasonido abdominal",
//       type: "Imagenología",
//       subtype: "Ultrasonido",
//       prescriptions: [{ prescriptionName: "Ayuno de 6 horas" }],
//       results: [{ name: "Imágenes de órganos abdominales" }],
//       precautions: [
//         {
//           name: "Llenado de vejiga",
//           type: "ENUM",
//           precautiontMetadata: { opciones: ["Sí", "No"] },
//         },
//       ],
//     },
//     {
//       description: "Prueba de alergias",
//       type: "Alergología",
//       subtype: "Diagnóstico",
//       prescriptions: [{ prescriptionName: "Suspender antihistamínicos" }],
//       results: [{ name: "Reacción a alérgenos" }],
//       precautions: [
//         {
//           name: "Concentración de alérgeno",
//           type: "VALUES",
//           precautiontMetadata: { unidad: "µg/mL" },
//         },
//       ],
//     },
//       {
//           description: "Examen de orina",
//           type: "Laboratorio",
//           subtype: "Uroanálisis",
//           prescriptions: [{ prescriptionName: "Recolectar muestra de orina limpia" }],
//           results: [{ name: "Análisis de componentes urinarios" }],
//           precautions: [
//               {
//                   name: "pH de la orina",
//                   type: "MIN-MAX",
//                   precautiontMetadata: { unidad: "pH" },
//               },
//               {
//                   name: "Presencia de glucosa",
//                   type: "ENUM",
//                   precautiontMetadata: { opciones: ["Positivo", "Negativo"] },
//               },
//           ],
//       },
//       {
//           description: "Colonoscopia",
//           type: "Gastroenterología",
//           subtype: "Diagnóstico",
//           prescriptions: [
//               { prescriptionName: "Preparación intestinal" },
//               { prescriptionName: "Ayuno de 24 horas" },
//           ],
//           results: [{ name: "Imágenes del colon" }],
//           precautions: [
//               {
//                   name: "Sedación",
//                   type: "ENUM",
//                   precautiontMetadata: { opciones: ["Sí", "No"] },
//               },
//           ],
//       },
//       {
//           description: "Resonancia Magnética (MRI) cerebral",
//           type: "Imagenología",
//           subtype: "MRI",
//           prescriptions: [{ prescriptionName: "Retirar objetos metálicos" }],
//           results: [{ name: "Imágenes detalladas del cerebro" }],
//           precautions: [
//               {
//                   name: "Claustrofobia",
//                   type: "ENUM",
//                   precautiontMetadata: { opciones: ["Sí", "No"] },
//               },
//           ],
//       },
//       {
//           description: "Prueba de esfuerzo",
//           type: "Cardiología",
//           subtype: "Diagnóstico",
//           prescriptions: [{ prescriptionName: "No consumir cafeína" }],
//           results: [{ name: "Respuesta cardiovascular al ejercicio" }],
//           precautions: [
//               {
//                   name: "Frecuencia cardíaca máxima",
//                   type: "VALUES",
//                   precautiontMetadata: { unidad: "bpm" },
//               },
//           ],
//       },
//       {
//           description: "Examen de piel",
//           type: "Dermatología",
//           subtype: "Diagnóstico",
//           prescriptions: [{ prescriptionName: "No aplicar cremas" }],
//           results: [{ name: "Evaluación de lesiones cutáneas" }],
//           precautions: [
//               {
//                   name: "Tipo de lesión",
//                   type: "ENUM",
//                   precautiontMetadata: { opciones: ["Mancha", "Pápula", "Vesícula"] },
//               },
//           ],
//       },
// ];

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