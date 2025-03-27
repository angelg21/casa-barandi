

import React from 'react';

import { Cita, PersonCita } from '../../../interfaces/Programa';
import CitaForm from '../CitaForm/CitaForm';


const data: PersonCita[] = [
    {
        id: "1",
        name: "Juan Pérez",
        ci: "V-12345678"
    },
    {
        id: "2",
        name: "María Rodríguez",
        ci: "V-87654321"
    },
    {
        id: "3",
        name: "Carlos López",
        ci: "V-56789012"
    },
    {
        id: "4",
        name: "Ana García",
        ci: "V-24681357"
    },
    {
        id: "5",
        name: "Luis Martínez",
        ci: "V-13579246"
    },
    {
        id: "6",
        name: "Sofía Ramírez",
        ci: "V-98765432"
    },
    {
        id: "7",
        name: "Pedro Sánchez",
        ci: "V-76543210"
    },
    {
        id: "8",
        name: "Laura Díaz",
        ci: "V-43210987"
    },
    {
        id: "9",
        name: "Miguel Vargas",
        ci: "V-86420975"
    },
    {
        id: "10",
        name: "Isabella Torres",
        ci: "V-28574196"
    },
    {
        id: "11",
        name: "Ricardo Gómez",
        ci: "V-11223344"
    },
    {
        id: "12",
        name: "Elena Fernández",
        ci: "V-55667788"
    },
    {
        id: "13",
        name: "Javier Ruiz",
        ci: "V-99001122"
    },
    {
        id: "14",
        name: "Carmen Díaz",
        ci: "V-33445566"
    },
    {
        id: "15",
        name: "Roberto Castro",
        ci: "V-77889900"
    },
    {
        id: "16",
        name: "Daniela Herrera",
        ci: "V-12344321"
    },
    {
        id: "17",
        name: "Valentina Sánchez",
        ci: "V-98766789"
    },
    {
        id: "18",
        name: "Alejandro Silva",
        ci: "V-54322345"
    },
    {
        id: "19",
        name: "Gabriela Rodríguez",
        ci: "V-67899876"
    },
    {
        id: "20",
        name: "Martín Gómez",
        ci: "V-45677654"
    },
    {
        id: "21",
        name: "Fernanda Martínez",
        ci: "V-89011098"
    },
    {
        id: "22",
        name: "Diego Ruiz"
    }
];



export interface ModalProps {
    onClose: () => void;
    editData?: Cita;
}

const CitaModal: React.FC<ModalProps> = ({ onClose, editData }) => {


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className='fixed bg-white p-6 rounded-md w-[90vw] h-[90vh] overflow-y-auto'>

                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray">{editData ? "Editar Cita" : "Crear Cita"}</h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <CitaForm
                    onClose={onClose}
                    editValues={editData} 
                    people={data}
                />

            </div>
        </div>
    );
};

export default CitaModal;