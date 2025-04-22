import FilteredCitasTable from "@/src/programas/components/Citas/FilteredCitasTable/FilteredCitasTable";
import { Cita } from "@/src/programas/interfaces/Programa";
import { AlertProvider } from "@/src/utils/providers/AlertProvider";

const data: Cita[] = [
    {
      id: "1",
      person: {
        name: "Juan Pérez",
      },
      representative: {
        name: "María Rodríguez",
        ci: "V-87654321",
        related: "Tia"
      },
      dateMade: "2023-10-26",
      dateConfirmation: "",
      confirmed: false,
    },
    {
      id: "2",
      person: {
        name: "Carlos López",
      },
      representative: {
        name: "Ana García",
        ci: "V-24681357",
        related: "Mama"
      },
      dateMade: "2023-10-27",
      dateConfirmation: "2023-10-29",
      confirmed: true,
    },
    {
      id: "3",
      person: {
        name: "Luis Martínez",
        ci: "V-13579246",
      },
      representative: {
        name: "Sofía Ramírez",
        ci: "V-98765432",
        related: "Vecina"
      },
      dateMade: "2023-10-28",
      dateConfirmation: "2023-10-30",
      confirmed: true,
    },
    {
      id: "4",
      person: {
        name: "Pedro Sánchez",
        ci: "V-76543210",
      },
      dateMade: "2023-10-29",
      dateConfirmation: "2023-10-31",
      confirmed: true,
    },
    {
      id: "5",
      person: {
        name: "Miguel Vargas",
        ci: "V-86420975",
      },
      dateMade: "2023-10-30",
      dateConfirmation: "2023-11-01",
      confirmed: true,
    },
    { 
      id: "6",
      person: {
        name: "Ricardo Gómez",
        ci: "V-11223344",
      },
      dateMade: "2023-10-31",
      dateConfirmation: "2023-11-02",
      confirmed: false,
    },
    { 
      id: "7",
      person: {
        name: "Elena Fernández",
        ci: "V-55667788",
      },
      dateMade: "2023-11-01",
      dateConfirmation: "2023-11-03",
      confirmed: false,
    },
    {
      id: "8",
      person: {
        name: "Javier Ruiz",
        ci: "V-99001122",
      },
      dateMade: "2023-11-02",
      dateConfirmation: "2023-11-04",
      confirmed: false,
    },
    {
      id: "9",
      person: {
        name: "Carmen Díaz",
        ci: "V-33445566",
      },
      dateMade: "2023-11-03",
      dateConfirmation: "2023-11-05",
      confirmed: false,
    },
    {
      id: "10",
      person: {
        name: "Roberto Castro",
        ci: "V-77889900",
      },
      dateMade: "2023-11-04",
      dateConfirmation: "2023-11-06",
      confirmed: false,
    },
    {
      id: "11",
      person: {
        name: "Daniela Herrera",
        ci: "V-12344321",
      },
      dateMade: "2023-11-05",
      dateConfirmation: "2023-11-07",
      confirmed: true,
    },
      {
        id: "12",
          person: {
              name: "Valentina Sanchez",
              ci: "V-98766789"
          },
          dateMade: "2023-11-06",
          dateConfirmation: "2023-11-08",
          confirmed: true
      },
      {
        id: "13",
          person: {
              name: "Alejandro Silva",
              ci: "V-54322345"
          },
          dateMade: "2023-11-07",
          dateConfirmation: "2023-11-09",
          confirmed: true
      },
      {
        id: "14",
          person: {
              name: "Gabriela Rodriguez",
              ci: "V-67899876"
          },
          representative: {
              name: "Luisa Perez",
              ci: "V-23455432",
              related: "Tia",
          },
          dateMade: "2023-11-08",
          dateConfirmation: "2023-11-10",
          confirmed: true
      },
      {
        id: "15",
          person: {
              name: "Martin Gomez",
              ci: "V-45677654"
          },
          dateMade: "2023-11-09",
          dateConfirmation: "2023-11-11",
          confirmed: true
      },
      {
        id: "16",
          person: {
              name: "Fernanda Martinez",
              ci: "V-89011098"
          },
          representative: {
              name: "Jorge Diaz",
              ci: "V-01233210",
              related: "Papa"
          },
          dateMade: "2023-11-10",
          dateConfirmation: "2023-11-12",
          confirmed: true
      },
      {
        id: "17",
          person: {
              name: "Diego Ruiz",
              ci: "V-23455432"
          },
          dateMade: "2023-11-11",
          dateConfirmation: "2023-11-13",
          confirmed: false
      }
  ];

export default async function Admisiones() {

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Admisiones</h2>
                {/* <FilteredProgramasTable programas={data} /> */}
                {/* <FilteredCitasTable citas={data} /> */}
            </div>
        </AlertProvider>
    );
}