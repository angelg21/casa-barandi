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
    BuildingStorefrontIcon,
    HeartIcon
} from '@heroicons/react/24/outline'
import { SidebarMenuItems } from '../SidebarMenuItems/SidebarMenuItems'
import { useState } from 'react';
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
            path: '',
            title: 'Jornadas',
            icon: <UserGroupIcon />,
            subItems: [
                { title: 'Jornadas de salud', path: '/dashboard/jornadas/salud' },
                { title: 'Clínicas jurídicas', path: '/dashboard/jornadas/clinicas-juridicas' },
                { title: 'Viabilidad de proyectos', path: '/dashboard/jornadas/proyectos' }
            ]
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
            path: '/dashboard/aliados',
            title: 'Aliados',
            icon: <HeartIcon />,
            subItems: [
                { title: 'Instituciones', path: '/dashboard/aliados/instituciones' },
                { title: 'Voluntarios', path: '/dashboard/aliados/voluntarios' }
            ]
        },
        {
            path: '/dashboard/beneficiarios',
            title: 'Beneficiarios',
            icon: <UserIcon />,
            subItems: [
                { title: 'Instituciones', path: '/dashboard/beneficiarios/instituciones' },
                { title: 'Grupo familiar', path: '/dashboard/beneficiarios/grupo-familiar' }
            ]
        },
        {
            path: '/dashboard/prestamo-espacios',
            title: 'Prestamos de espacios',
            icon: <BuildingStorefrontIcon />,
            subItems: []
        },
        {
            path: '/dashboard/usuarios',
            title: 'Usuarios',
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
                                    <li role="list" className="space-y-4">
                                        {menuItems.map((item) => (
                                            <ul key={item.title}>
                                                <div onClick={() => {
                                                    if (item.subItems.length === 0) {
                                                        // Redirige directamente si no hay subitems
                                                        sendStatusSidebar(false)
                                                        redirect(item.path)
                                                    } else {
                                                        // Despliega los subitems
                                                        toggleItem(item.path);
                                                    }
                                                }}>
                                                    <SidebarMenuItems
                                                        {...item}
                                                    />
                                                </div>
                                                {/* Renderiza los subitems solo si existen */}
                                                {openItem === item.path && item.subItems.length > 0 && (
                                                    <ul className="pl-14">
                                                        {item.subItems.map((subItem) => (
                                                            <ul onClick={() => sendStatusSidebar(false)} key={subItem.path}  className="mt-1 text-gray-300 hover:text-white">
                                                                <a href={subItem.path}>{subItem.title}</a>
                                                            </ul>
                                                        ))}
                                                    </ul>
                                                )}
                                            </ul>
                                        ))}
                                    </li>
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
                            <li role="list" className="flex flex-1 flex-col gap-y-7">
                                <ul>
                                    <ul role="list" className="space-y-4">
                                        {menuItems.map((item) => (
                                            <ul key={item.path}>
                                                <div onClick={() => {
                                                    if (item.subItems.length === 0) {
                                                        // Redirige a la ruta si no hay subitems
                                                        redirect(item.path)
                                                    } else {
                                                        // Despliega los subitems
                                                        toggleItem(item.path);
                                                    }
                                                }}>
                                                    <SidebarMenuItems
                                                        onClick={() => sendStatusSidebar(false)}
                                                        {...item}
                                                    />
                                                </div>
                                                {/* Renderiza los subitems solo si existen */}
                                                {openItem === item.path && item.subItems.length > 0 && (
                                                    <ul className="pl-14">
                                                        {item.subItems.map((subItem) => (
                                                            <li key={subItem.path} className="mt-1 text-gray-300 hover:text-white">
                                                                <a href={subItem.path}>{subItem.title}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </ul>
                                        ))}
                                    </ul>
                                </ul>
                                <ul className="mt-auto pl-[14px]">
                                    <button 
                                        className='group flex gap-x-3 rounded-md p-2 text-md font-medium leading-6 text-indigo-200 hover:text-red-500'
                                        onClick={() => signOut()}
                                    >
                                        <ArrowLeftStartOnRectangleIcon aria-hidden="true" className="h-6 w-6 shrink-0 hover:text-red-500" />
                                        Cerrar Sesión
                                    </button>
                                </ul>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
