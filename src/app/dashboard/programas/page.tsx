
import FilteredProgramasTable from "@/src/programas/components/FilteredProgramasTable/FilteredProgramasTable";
import { Programa } from "@/src/programas/interfaces/Programa";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";


const data: Programa[] = [
    {
        description: "Taller de Programación Web con React",
        dateStart: "2024-03-15",
        timeStart: "10:00",
        timeEnd: "16:00",
        peopleLimit: 30,
        community: 'Los mangos',
        aliados: [
            {
                id: "A1",
                name: "Desarrollos Web Avanzados C.A.",
                type: "Empresa",
                organizacion: "Industrias Unidas C.A.",
                role: "Instructor Principal",
            },
            {
                id: "A2",
                name: "Comunidad React Venezuela",
                type: "Comunidad",
                organizacion: "N/A",
                role: "Apoyo Técnico",
            },
        ],
        colaboradores: {
            id: "C1",
            name: "Ana García",
            type: "Voluntario",
        },
    },
    {
        description: "Curso de Diseño UX/UI",
        dateStart: "2024-04-20",
        timeStart: "09:00",
        timeEnd: "17:00",
        peopleLimit: 25,
        community: "Alta vista",
        aliados: [
            {
                id: "A3",
                name: "Diseño Creativo Digital",
                type: "Empresa",
                organizacion: "Construcciones Sambil",
                role: "Facilitador",
            },
        ],
        colaboradores: {
            id: "C2",
            name: "Luis Martínez",
            type: "Organizador",
        },
    },
    {
        description: "Seminario de Marketing Digital",
        dateStart: "2024-05-10",
        timeStart: "14:00",
        timeEnd: "18:00",
        peopleLimit: 50,
        community: "Los Alacranes",
        aliados: [
            {
                id: "A4",
                name: "Agencia de Marketing Online",
                type: "Empresa",
                organizacion: "Alimentos La Polar",
                role: "Ponente",
            },
            {
                id: "A5",
                name: "Influencers Venezuela",
                type: "Comunidad",
                organizacion: "N/A",
                role: "Panelista",
            },
        ],
        colaboradores: {
            id: "C3",
            name: "Sofía Ramírez",
            type: "Asistente",
        },
    },
    {
        description: "Taller de Fotografía Básica",
        dateStart: "2024-06-05",
        timeStart: "11:00",
        timeEnd: "15:00",
        peopleLimit: 15,
        community: 'Curagua',
        aliados: [
            {
                id: "A6",
                name: "Estudio Fotográfico Luz y Sombra",
                type: "Empresa",
                organizacion: "Textiles El Castillo",
                role: "Instructor",
            },
        ],
        colaboradores: {
            id: "C4",
            name: "Pedro Sánchez",
            type: "Voluntario",
        },
    },
    {
        description: "Curso de Inteligencia Artificial",
        dateStart: "2024-07-20",
        timeStart: "09:00",
        timeEnd: "17:00",
        peopleLimit: 20,
        community: "Villas del Tepuy",
        aliados: [
            {
                id: "A7",
                name: "Instituto de Investigación en IA",
                type: "Institución",
                organizacion: "N/A",
                role: "Investigador Principal",
            },
        ],
        colaboradores: {
            id: "C5",
            name: "Laura Díaz",
            type: "Organizador",
        },
    },
];

export default async function Programas() {

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Programas</h2>
                <FilteredProgramasTable programas={data} />
            </div>
        </AlertProvider>
    );
}