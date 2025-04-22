

import React from 'react';

import { Cita, PersonCita } from '../../../interfaces/Programa';
import CitaForm from '../CitaForm/CitaForm';

const mockData = [
    {
      representative: {
        id: "d1539ac4-1044-4356-be46-c8417294c6ef",
        fullName: "Ana María Rodríguez",
        documents: [
          { documentType: "Cédula", documentNumber: "V12345678" },
          { documentType: "Pasaporte", documentNumber: "P9876543" }
        ]
      },
      representados: []
    },
    {
      representative: {
        id: "f205920d-66e6-4735-806e-a76eca05f743",
        fullName: "Carlos Alberto Pérez",
        documents: [
          { documentType: "Cédula", documentNumber: "V87654321" },
          { documentType: "Gubernamental", documentNumber: "G12456" }
        ]
      },
      representados: [
        {
          id: "12345678-1234-1234-1234-1234567890ab",
          fullName: "Juan Pérez",
          relationship: "Hijo"
        }
      ]
    },
    {
      representative: {
        id: "ce08ab90-368d-40c0-80a0-9923b83126e6",
        fullName: "Julia Contreras",
        documents: [
          { documentType: "Cédula", documentNumber: "V33445566" },
          { documentType: "Pasaporte", documentNumber: "P1258963" }
        ]
      },
      representados: [
        {
          id: "23456789-2345-2345-2345-234567890abc",
          fullName: "Luis Contreras",
          relationship: "Hermano"
        }
      ]
    },
    {
      representative: {
        id: "fc9f7b1d-bbf4-4606-a38d-f7b8603d4e72",
        fullName: "Josefina Castro",
        documents: [
          { documentType: "Cédula", documentNumber: "V12345679" },
          { documentType: "Pasaporte", documentNumber: "P9999999" }
        ]
      },
      representados: []
    },
    {
      representative: {
        id: "cc175021-f397-401a-a89f-da457f91b140",
        fullName: "Sandra López",
        documents: [
          { documentType: "Cédula", documentNumber: "V41414141" },
          { documentType: "Gubernamental", documentNumber: "G474747" }
        ]
      },
      representados: [
        {
          id: "a5f8f9d1-2c8f-4a9e-bcc5-64725d8d515f",
          fullName: "Elena López",
          relationship: "Madre"
        },
        {
          id: "93eb4fb7-5d83-4be6-8978-05f3157468b2",
          fullName: "Carlos López",
          relationship: "Hermano"
        }
      ]
    },
    {
      representative: {
        id: "770f776c-a462-409d-9d5c-b2d43bb4e8a8",
        fullName: "Marco Aurelio",
        documents: [
          { documentType: "Cedula", documentNumber: "V14698031" }
        ]
      },
      representados: []
    },
    {
      representative: {
        id: "5130eb5f-e2bd-4f10-852e-407048f6e4da",
        fullName: "Miguel Vargas",
        documents: [
          { documentType: "Cédula", documentNumber: "V54321678" },
          { documentType: "Gubernamental", documentNumber: "G654321" }
        ]
      },
      representados: [
        {
          id: "abcdef12-34ab-5678-cd90-efgh12345678",
          fullName: "Laura Vargas",
          relationship: "Hermana"
        }
      ]
    },
    {
      representative: {
        id: "3922069c-7c38-4699-9eeb-8ad26db4a706",
        fullName: "Fernando Morales",
        documents: [
          { documentType: "Pasaporte", documentNumber: "P1212121" },
          { documentType: "Cédula", documentNumber: "V11223344" }
        ]
      },
      representados: []
    },
    {
      representative: {
        id: "25107c9b-1092-4a2e-a074-46e749485bfa",
        fullName: "Laura Reyes",
        documents: [
          { documentType: "Cédula", documentNumber: "V7654321" },
          { documentType: "Pasaporte", documentNumber: "P1111111" }
        ]
      },
      representados: [
        {
          id: "bf57b0a4-feca-4f30-8e38-bda2dcb500a3",
          fullName: "Sara Reyes",
          relationship: "Madre"
        }
      ]
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
                    people={mockData}
                />

            </div>
        </div>
    );
};

export default CitaModal;