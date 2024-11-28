import { ButtonComponent } from "@/src/components/Button/Button";

export interface Voluntario {
    id: string;
    name: string;
    ci: string;
    email: string;
    roles: string[];
    image: string;
};

interface VoluntariosTableProps {
    voluntario: Voluntario;
    onClose?: () => void;
}

export const DataModal = ({ voluntario, onClose }: VoluntariosTableProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className="bg-white p-6 rounded-md max-w-lg w-full">
                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray">Datos del Voluntario</h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voluntario.name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Cédula</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voluntario.ci}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Correo</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voluntario.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Rol</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voluntario.roles}</dd>
                        </div>
                    </dl>
                </div>
                <div className="flex justify-end mt-4 gap-5">
                    <ButtonComponent
                        bgColor="bg-d-red"
                        text="Cancelar"
                        width="w-[100px]"
                        fontSize="text-sm"
                        type='button'
                        isDisabled={false}
                        onClick={onClose}
                        hoverColor="#a51c30"
                    />
                </div>
            </div>
        </div>
    )
}
