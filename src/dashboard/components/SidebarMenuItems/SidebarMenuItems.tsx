'use client'

import { usePathname } from "next/navigation";
import React from "react";
interface SubItem {
    title: string;
    path: string;
}

interface Props {
    subItems?: SubItem[];
    path: string;
    icon: JSX.Element;
    title: string;
    onClick?: () => void
}

function classNames(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export const SidebarMenuItems = ({ path, icon: Icon, title, onClick, subItems }: Props) => {

    const pathName = usePathname();

    // Función para verificar si el path actual coincide con el path principal o cualquier subruta
    const isActive =
        pathName?.startsWith(path) ||
        subItems?.some((subItem) => pathName?.startsWith(subItem.path));

    const iconClasses = `
        ${isActive ? 'text-cb-white' : 'text-gray-200 group-hover:text-white'} 
        h-6 w-6 shrink-0
    `;
    return (
        <div
            className='relative'
        >
            <button
                onClick={onClick}
                className={classNames(
                    isActive
                        ? 'bg-cb-green text-cb-white before:content-[""] before:absolute before:-left-1 before:top-0 before:bottom-0 before:w-[10px] before:rounded-full before:bg-cb-white'
                        : 'text-gray-200 hover:text-white md:hover:before:content-[""] md:hover:before:absolute md:hover:before:-left-1 md:hover:before:top-0 md:hover:before:bottom-0 md:hover:before:w-[10px] md:hover:before:rounded-full md:hover:before:bg-cb-white',
                    'group flex gap-x-3 rounded-md p-2 text-lg font-medium leading-6  pl-5 transition-colors duration-300 ease-in-out',
                )}
            >
                {React.cloneElement(Icon, { className: `${iconClasses}` })}
                {title}
            </button>
        </div>
    )
}