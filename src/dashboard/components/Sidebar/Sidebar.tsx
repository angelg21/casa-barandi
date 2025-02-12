"use client"
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react'
import {
    XMarkIcon,
    UserGroupIcon,
    UserIcon,
    ArrowLeftStartOnRectangleIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserPlusIcon,
    UsersIcon,
    MegaphoneIcon,
    BriefcaseIcon,
    BuildingLibraryIcon
} from '@heroicons/react/24/outline'
import { SidebarMenuItems } from '../SidebarMenuItems/SidebarMenuItems'
import React, { useState } from 'react';
import { redirect } from "next/navigation";
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface Props {
    sendStatusSidebar: (status: boolean) => void;
    statusSidebar: boolean;
}

export const Sidebar = ({ sendStatusSidebar, statusSidebar }: Props) => {
    const [openItem, setOpenItem] = useState<string | null>(null); // Controla el ítem abierto

    const toggleItem = (item: string) => {
        setOpenItem(prev => (prev === item ? null : item));
    };

    const menuItems = [
        {
            path: '/dashboard/indicadores',
            title: 'Indicadores',
            icon: <PresentationChartBarIcon />,
            subItems: []
        },
        {
            path: '/dashboard/beneficiarios',
            title: 'Beneficiarios',
            icon: <UserPlusIcon />,
            subItems: [
                { title: 'Instituciones', path: '/dashboard/beneficiarios/instituciones' },
                { title: 'Grupo familiar', path: '/dashboard/beneficiarios/grupo-familiar' }
            ]
        },
        {
            path: '/dashboard/aliados',
            title: 'Aliados',
            icon: <UserGroupIcon />,
            subItems: []
        },
        {
            path: '/dashboard/usuarios',
            title: 'Colaboradores',
            icon: <UsersIcon />,
            subItems: []
        },
        {
            path: '',
            title: 'Servicios',
            icon: <MegaphoneIcon />,
            subItems: [
                { title: 'Jornadas de salud', path: '/dashboard/jornadas/salud' },
                { title: 'Clínicas jurídicas', path: '/dashboard/jornadas/clinicas-juridicas' },
                { title: 'Viabilidad de proyectos', path: '/dashboard/jornadas/proyectos' }
            ]
        },
        {
            path: '/dashboard/programas',
            title: 'Programas',
            icon: <BriefcaseIcon />,
            subItems: []
        },
        {
            path: '/dashboard/prestamo-espacios',
            title: 'Prestamos de espacios',
            icon: <BuildingLibraryIcon />,
            subItems: []
        },
        {
            path: '/dashboard/bolsa-ayuda',
            title: 'Bolsa de ayuda',
            icon: <ShoppingBagIcon />,
            subItems: [
                { title: 'Solicitudes', path: '/dashboard/bolsa-ayuda/solicitudes' },
                { title: 'Ofertas', path: '/dashboard/bolsa-ayuda/ofertas' },
                { title: 'Recepción ', path: '/dashboard/bolsa-ayuda/recepcion' },
                { title: 'Entrega', path: '/dashboard/bolsa-ayuda/entrega' }
            ]
        },
        {
            path: '/dashboard/personas',
            title: 'Personas',
            icon: <UserIcon />,
            subItems: []
        }
    ];

    return (
        <>
            <div>
                <Dialog open={statusSidebar} onClose={sendStatusSidebar} className="relative z-50 lg:hidden">
                    <DialogBackdrop className="fixed inset-0 bg-d-fondo transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
                    <div className="fixed inset-0 flex">
                        <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-700 ease-in-out data-[closed]:-translate-x-full">
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-700 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => sendStatusSidebar(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Cerrar sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-cb-green" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cb-green pb-4">
                                <div className="flex-shrink-0 flex items-center">
                                    <Image
                                        width={200}
                                        height={200}
                                        alt='Logo Extension Social UCAB'
                                        src="/casa-barandi-logo-blanco.svg"
                                        className="h-auto w-auto max-w-full max-h-[65px]"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    {/* Único <ul> principal para los items */}
                                    <ul className="space-y-4 list-none">
                                        {menuItems.map((item, index) => (
                                        <React.Fragment key={item.path || `item-${index}`}>
                                            {/* Cada item es un <li> */}
                                            <li className="list-none">
                                            <div
                                                onClick={() => {
                                                if (item.subItems.length === 0) {
                                                    sendStatusSidebar(false);
                                                    redirect(item.path);
                                                } else {
                                                    toggleItem(item.path);
                                                }
                                                }}
                                            >
                                                {/* SidebarMenuItems ya NO devuelve <li> */}
                                                <SidebarMenuItems {...item} />
                                            </div>

                                            {/* Subitems anidados en otro <ul> */}
                                            {openItem === item.path && item.subItems.length > 0 && (
                                                <ul className="pl-14 list-none">
                                                {item.subItems.map((subItem) => (
                                                    <li
                                                    key={subItem.path}
                                                    onClick={() => sendStatusSidebar(false)}
                                                    className="mt-1 text-gray-300 hover:text-white list-none"
                                                    >
                                                    <a href={subItem.path}>{subItem.title}</a>
                                                    </li>
                                                ))}
                                                </ul>
                                            )}
                                            </li>

                                            {/* Separador condicional */}
                                            {(index === 0 || index === 1 || index === 3 || index === 6) && (
                                            <hr className="my-4 bg-gray-600" />
                                            )}
                                        </React.Fragment>
                                        ))}
                                    </ul>

                                    {/* Botón de cierre de sesión */}
                                    <ul className="mt-auto mb-3 px-5">
                                        <button
                                        className="group flex gap-x-3 rounded-md text-md font-medium leading-6 text-indigo-200 hover:text-red-500"
                                        onClick={() => signOut()}
                                        >
                                        <ArrowLeftStartOnRectangleIcon aria-hidden="true" className="h-6 w-6 shrink-0 hover:text-red-500" />  
                                        Cerrar Sesión
                                        </button>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cb-green py-3">
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                src="/casa-barandi-logo-blanco.svg"
                                className="h-auto w-auto max-w-full max-h-[70px]"
                                width={200}
                                height={200}
                                alt="Casa Barandí"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="space-y-4 list-none">
                                {menuItems.map((item, index) => (
                                <li key={item.path} className="list-none">
                                    <div
                                    onClick={() => {
                                        if (item.subItems.length === 0) {
                                        redirect(item.path);
                                        } else {
                                        toggleItem(item.path);
                                        }
                                    }}
                                    >
                                    <SidebarMenuItems
                                        onClick={() => sendStatusSidebar(false)}
                                        {...item}
                                    />
                                    </div>

                                    {openItem === item.path && item.subItems.length > 0 && (
                                    <ul className="pl-14 list-none">
                                        {item.subItems.map((subItem) => (
                                        <li
                                            key={subItem.path}
                                            onClick={() => sendStatusSidebar(false)}
                                            className="mt-1 text-gray-300 hover:text-white list-none"
                                        >
                                            <a href={subItem.path}>{subItem.title}</a>
                                        </li>
                                        ))}
                                    </ul>
                                    )}

                                    {/* Añade un separador después de ciertos elementos */}
                                    {(index === 0 || index === 1 || index === 3 || index === 6) && (
                                    <hr className="my-6 mx-3 bg-gray-500" />
                                    )}
                                </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
