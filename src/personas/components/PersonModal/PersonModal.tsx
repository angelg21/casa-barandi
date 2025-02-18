import React from 'react';
import PersonasForm from '@/src/personas/components/PersonasForm/PersonasForm';
import { Person, Persona } from '../../interfaces/Persona';
import { Company } from '@/src/aliados/interfaces/AliadosSheet';


const personas: Person[] = [
    {
        ci: "V-12345678",
        name: "Juan Pérez"
    },
    {
        ci: "V-87654321",
        name: "María Rodríguez"
    },
    {
        ci: "V-56789012",
        name: "Carlos López"
    },
    {
        ci: "V-24681357",
        name: "Ana García"
    },
    {
        ci: "V-13579246",
        name: "Luis Martínez"
    },
    {
        ci: "V-98765432",
        name: "Sofía Ramírez"
    },
    {
        ci: "V-76543210",
        name: "Pedro Sánchez"
    },
    {
        ci: "V-43210987",
        name: "Laura Díaz"
    },
    {
        ci: "V-86420975",
        name: "Miguel Vargas"
    },
    {
        ci: "V-28574196",
        name: "Isabella Torres"
    },
    // Puedes agregar más objetos Person aquí
];

const companies: Company[] = [
    {
        id: "1",
        name: "Industrias Unidas C.A."
    },
    {
        id: "2",
        name: "Alimentos La Polar"
    },
    {
        id: "3",
        name: "Telecomunicaciones Movilnet"
    },
    {
        id: "4",
        name: "Banco Nacional de Crédito"
    },
    {
        id: "5",
        name: "Construcciones Sambil"
    },
    {
        id: "6",
        name: "Textiles El Castillo"
    },
    {
        id: "7",
        name: "Transporte Aéreo Laser"
    },
    {
        id: "8",
        name: "Seguros Caracas"
    },
    {
        id: "9",
        name: "Hoteles Eurobuilding"
    },
    {
        id: "10",
        name: "Distribuidora de Licores Diageo"
    },
    {
        id: "11",
        name: "Ferretería EPA"
    },
    {
        id: "12",
        name: "Lácteos Los Andes"
    },
    {
        id: "13",
        name: "Productos Efe"
    },
    {
        id: "14",
        name: "Servicios de Internet CANTV"
    },
    {
        id: "15",
        name: "Tiendas Traki"
    },
];


export interface ModalProps {
    onClose: () => void;
    editData?: Persona;
}

const PersonModal: React.FC<ModalProps> = ({ onClose, editData }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className='fixed bg-white p-6 rounded-md w-[90vw] h-[90vh] overflow-y-auto'>

                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray">{editData ? "Editar Persona" : "Agregar Persona"}</h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <PersonasForm
                    onClose={onClose}
                    editValues={editData}
                    personas={personas}
                    companies={companies}
                />

            </div>
        </div>
    );
};

export default PersonModal;