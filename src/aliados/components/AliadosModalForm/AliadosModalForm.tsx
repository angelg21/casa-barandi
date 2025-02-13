import React from 'react';
import { AliadosForm } from '../AliadosForm/AliadosForm';
import { AliadoValues } from '../../interfaces/AliadosSheet';

export interface ModalProps {
    onClose: () => void;
    editValues?: AliadoValues;

}

export const AliadosModalForm: React.FC<ModalProps> = ({onClose, editValues}) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className='fixed bg-white p-6 rounded-md w-[90vw] h-[90vh] overflow-y-auto'>

                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray">{ editValues ? "Editar Aliado" : "Agregar Aliado"}</h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <AliadosForm
                    onClose={onClose}
                    editValues={editValues}
                />

            </div>
        </div>
    );
};

