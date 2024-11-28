"use client"

import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft"
import VoluntariosForm from "@/src/forms/components/aliados/VoluntariosForm/VoluntariosForm"
import { AlertProvider } from "@/src/users/contex/AlertContext"
import { useState } from "react";
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { VoluntariosFilteredTable } from "../VoluntariosFilteredTable/VoluntariosFilteredTable";
import { useRouter } from "next/navigation";

const data = [
    {
        _id: "66c3efae0fc7698e7690cfb5",
        fullName: "Ángel Guevara",
        ci: '28512774',
        email: "guevarangel14@gmail.com",
        roles: ["researcher"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnlufE7PPTAHgcySyXveJ..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb6",
        fullName: "Maria Perez",
        ci: '28512091',
        email: "maria.perez@gmail.com",
        roles: ["admin"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTQHgcySy123J..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb7",
        fullName: "Luis Fernández",
        ci: '28512247',
        email: "luis.fernandez@gmail.com",
        roles: ["researcher"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTRGhyqSDc78J..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb8",
        fullName: "Carla López",
        ci: '28512765',
        email: "carla.lopez@gmail.com",
        roles: ["admin", "researcher"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTQJgyBc7asfJ..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb9",
        fullName: "Jorge Ramírez",
        ci: '28512123',
        email: "jorge.ramirez@gmail.com",
        roles: ["editor"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTyGhxSaS12kJ..."
    }
];


export const Details = () => {
    type Voluntario = {
        _id: string;
        ci: string
        fullName: string;
        email: string;
        roles: string[];
        imageUrl: string;
    };

    const voluntarios = data.map((voluntario: Voluntario) => ({
        id: voluntario._id,
        ci: voluntario.ci,
        name: voluntario.fullName,
        email: voluntario.email,
        roles: voluntario.roles,
        image: voluntario.imageUrl,
    }));

    const [isFormVisible, setIsFormVisible] = useState(false);
    const router = useRouter();
    
    const handleAddVoluntario = () => {
        router.push(`/dashboard/formularios/aliados/voluntarios`); // Al presionar el botón, mostrar el formulario
    };

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="h-calc(100vh) overflow-y-auto px-1">
                <div>
                    <div className='flex flex-col px-6 py-6 sm:px-14 xl:px-16'>
                        <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Voluntarios</h2>
                        <div
                            className='w-full flex justify-end items-end'
                            onClick={() => handleAddVoluntario()}
                        >
                            <ButtonWithIconLeft
                                title="Agregar Voluntario"
                                textColor="text-white"
                                backgroundColor="bg-cb-green"
                                hover="hover:bg-d-green-light"
                                icon=<PlusIcon />
                                iconColor="text-white"
                            />
                        </div>
                        <VoluntariosFilteredTable
                            voluntarios={voluntarios}
                        />
                    </div>
                </div>
            </div>
        </AlertProvider>
    )
}
